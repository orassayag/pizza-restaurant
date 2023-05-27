import CONSTANTS from '../config/constants.config';
import Logger from '../providers/logger.provider';
import OrderModel from '../bl/models/order.model';
import UserModel from '../bl/models/user.model';
import STATUS from '../bl/enums/status.enum';
import STAGE from '../bl/enums/stage.enum';
import WORKER from '../bl/enums/worker.enum';
import LocalOrderModel from '../models/localOrder.model';
import LocalWorkerModel from '../models/localWorker.model';
import ObjectsUtils from '../utils/objects.utils';
import TimesUtils from '../utils/times.utils';
import CustomError from '../custom/error.custom';

export default class RestaurantService {
  private static timeouts: { [key: string]: any };
  private static workers: LocalWorkerModel[];

  /**
   * Initiate the service.
   *
   * This function initiates the service. It creates all the workers as soon as the API is up, in order
   * to be ready to start to work.
   * @return {void}
   */
  public static initiate() {
    RestaurantService.timeouts = {};
    RestaurantService.workers = Object.values(STAGE).reduce((acc: LocalWorkerModel[], cur) => {
      const { WORKER_TYPE, WORKERS_COUNT } = CONSTANTS.RESTAURANT.STAGES[cur];
      const workers = Array.from(
        { length: WORKERS_COUNT },
        () => new LocalWorkerModel(WORKER_TYPE as WORKER)
      );
      acc.push(...workers);
      return acc;
    }, []);
  }

  /**
   * Incoming orders.
   *
   * This function gets the data from the socket function that listen to the client, receive
   * a list of orders and the user that created them and prepare all the actions to process
   * the orders.
   * @param data - The data received from the client (Orders and a user).
   * @return {void}
   */
  public static async incomingOrders(data: any): Promise<void> {
    // Since I don't have this local project, I can't perform a transaction operation.
    // But on production we will do a transaction for the 2 created operations.
    // Validate that all of the data exists.
    if (!data || !data.user || !data.orders?.length) {
      throw new CustomError({
        message: `Missing data from the client regarding the orders: !data || !data.user || !data.orders?.length`,
        status: 500,
      });
    }
    try {
      // ToDo: Validate the orders from the client.
      const orders = data.orders.map((order: any) => new LocalOrderModel(order));
      // Check if the user already exists by email - If exists just update the details.
      // If it does not exist - Create it in the database.
      const user = new UserModel({ ...data.user });
      await user.save();
      // Insert the order into the database.
      await OrderModel.insertMany(
        orders.map((order: LocalOrderModel) => {
          return {
            userId: user._id,
            size: order.size,
            toppies: order.toppies,
          };
        })
      );
      // Process the order by stages.
      await this.processNextOrder();
    } catch (error) {
      Logger.error('Error processing order: ', error);
    }
  }

  /**
   * Process the next order.
   *
   * This function fetch the next orders that are pending to be processed,
   * and process them one after another.
   * @return {Promise<void>}
   */
  public static async processNextOrder(): Promise<void> {
    try {
      // Fetch the oldest pending orders.
      const theOrders = await this.getOldestPendingOrders();
      if (!theOrders || !theOrders.length) {
        return;
      }
      // Process the order by stages.
      theOrders.forEach(async (theOrder: any) => {
        await this.processStage(theOrder, STAGE.DOUGH);
      });
    } catch (error) {
      Logger.error('Error processing order:', error);
    }
  }

  /**
   * Process a stage.
   *
   * This function gets an order and a stage and processes the stage. This is a generic
   * function (Almost) to process all the stages instead of duplicating the code for
   * each stage. At the end of the process - Move to the next stage and fetch the next
   * order in line.
   * @param order - The order to process a stage for.
   * @param stage - The stage to process in the order.
   * @return {Promise<void>}
   */
  private static async processStage(order: any, stage: STAGE): Promise<void> {
    try {
      const timeoutKey = order._id;
      const { NAME, PREVIOUS_STAGE, NEXT_STAGE, WORKER_TYPE, WORK_TIME_SECONDS } =
        CONSTANTS.RESTAURANT.STAGES[stage];
      const workerIndex = this.getWorkerIndex(WORKER_TYPE as WORKER);
      // Validate that there is available worker to process the stage.
      if (workerIndex === null || workerIndex === -1) {
        if (this.timeouts[timeoutKey]) {
          clearTimeout(this.timeouts[timeoutKey]);
          delete this.timeouts[timeoutKey];
        }
        // Loop until the next worker will be available.
        const timeout = setTimeout(() => {
          this.processStage(order, stage);
        }, 0);
        this.timeouts[timeoutKey] = timeout;
        return;
      }
      const worker = this.workers[workerIndex];
      Logger.info(
        `Process: Worker ${worker.name} (${worker.type}) working on order Id ${order._id} (${order.userId}) from stage ${PREVIOUS_STAGE} into stage ${NAME}.`
      );
      // Assign a worker to the order.
      this.workers[workerIndex].orderId = order._id;
      await OrderModel.findByIdAndUpdate(order._id, {
        stage,
        previousStage: PREVIOUS_STAGE,
        status: STATUS.PROCESS,
      });
      // Special logic for the topping stage
      if (stage === STAGE.TOPPING) {
        const workerPromises = await this.processTopping(order, stage);
        await Promise.all(workerPromises);
      } else {
        // Default logic for other stages.
        await TimesUtils.delay(WORK_TIME_SECONDS);
      }
      await OrderModel.findByIdAndUpdate(order._id, { stage, status: STATUS.DONE });
      this.workers[workerIndex].orderId = '';
      if (this.timeouts[timeoutKey]) {
        clearTimeout(this.timeouts[timeoutKey]);
        delete this.timeouts[timeoutKey];
      }
      // Process to the next stage - If it's the last stage, finish the order.
      // If not, continue to the next stage.
      if (stage === STAGE.SERVING) {
        await this.finishOrder(order);
      } else {
        await this.processStage(order, NEXT_STAGE as STAGE);
      }
      // Process to the next order (If exists).
      await this.processNextOrder();
    } catch (error) {
      // In case of error, log and update the database accordingly.
      Logger.info(`Error processing order Id ${order._id} on the ${stage} stage`, error);
      await OrderModel.findByIdAndUpdate(order._id, { stage: STAGE.ERROR, status: STATUS.ERROR });
    }
  }

  /**
   * Finish the order.
   *
   * This function gets an order and performs actions to finish the order process (Log the result, update the database).
   * @param order - The order record to process to finish.
   * @return {Promise<void>}
   */
  private static async finishOrder(order: any): Promise<void> {
    const { NAME, PREVIOUS_STAGE } = CONSTANTS.RESTAURANT.STAGES[STAGE.DONE];
    Logger.info(
      `Process: order Id ${order._id} (${order.userId}) from stage ${PREVIOUS_STAGE} into stage ${NAME}.`
    );
    // Update the stage process to be done.
    await OrderModel.findByIdAndUpdate(order._id, {
      stage: STAGE.DONE,
      previousStage: PREVIOUS_STAGE,
      status: STATUS.DONE,
    });
  }

  /**
   * Handle the toppings stage.
   *
   * This function gets a toppings array and a worker time process, in order to perform the topping stage.
   * This is a special logic since in all other work stages, there are no X workers to perform Y operations
   * asynchronicity.
   * @param toppings - The toppings list to process.
   * @param workTimeSeconds - The workTimeProcess is the number calculation time of the workers for the toppings.
   * @return {Promise<void>}
   */
  private static async handleToppings(toppings: any[], workTimeSeconds: number): Promise<void> {
    const { WORK_TIME_SECONDS } = CONSTANTS.RESTAURANT.STAGES.TOPPING;
    // Process the work for each topping.
    for (const _topping of toppings) {
      await TimesUtils.delay(WORK_TIME_SECONDS);
    }
    // Delay for the remaining work time (If there is any).
    const remainingWorkTime = workTimeSeconds - toppings.length * WORK_TIME_SECONDS;
    if (remainingWorkTime > 0) {
      await TimesUtils.delay(remainingWorkTime);
    }
  }

  /**
   * Process topping.
   *
   * This function gets the order and the stage, and calculate the toppings and the number of workers that can
   * handle the topping stage.
   * If return a list of promises to process (A delay like other stages).
   * @return {Promise<any[]>}
   */
  private static async processTopping(order: any, stage: STAGE): Promise<any[]> {
    const { PROCESS_ORDERS_COUNT, WORK_TIME_SECONDS } = CONSTANTS.RESTAURANT.STAGES[stage];
    const toppings = order.toppies;
    // Calculate the number of workers needed for the order according to the topping count.
    const numWorkersNeeded = Math.ceil(toppings.length / PROCESS_ORDERS_COUNT);
    const workerPromises = [];
    // Slice the toppings and create a list of promises based on the toppings count and the workers count.
    for (let i = 0; i < numWorkersNeeded; i += 1) {
      const toppingsSlice = toppings.slice(
        i * PROCESS_ORDERS_COUNT,
        (i + 1) * PROCESS_ORDERS_COUNT
      );
      const workerPromise = await this.handleToppings(toppingsSlice, WORK_TIME_SECONDS);
      workerPromises.push(workerPromise);
    }
    return workerPromises;
  }

  /**
   * Get worker index.
   *
   * This function gets a worker type, and fetches the next available (Without orderId) worker to perform the task.
   * If no such worker, returns null.
   * @return {number | null}
   */
  private static getWorkerIndex(workerType: WORKER): number | null {
    const index = this.workers.findIndex((worker) => worker.type === workerType && !worker.orderId);
    return index !== -1 ? index : null;
  }

  /**
   * Get the oldest pending orders.
   *
   * This function fetches the oldest pending orders to handle them in the process.
   * // ToDo: Needs to declare a limit to fetch.
   * @return {Promise<any[]>}
   */
  private static async getOldestPendingOrders(): Promise<any[]> {
    return OrderModel.find({ stage: STAGE.PENDING }).sort({ createdAt: 1 });
  }

  /**
   * Stream orders to the client.
   *
   * This function fetches the latest N records and streams them to the client via socket.
   * @return {Promise<any[]>}
   */
  public static async streamOrdersToClient(): Promise<any[]> {
    // Fetch the latest N records with the user details.
    const orders = await OrderModel.find({})
      .sort({ createdAt: 1 })
      .limit(CONSTANTS.STREAM.MAX_RECORDS_STREAM)
      .populate({
        path: 'userId',
        select: ['firstName', 'lastName', 'gender', 'imageId'],
      });
    return orders.map((order) => {
      const { firstName, lastName, gender, imageId } = order.userId as any;
      return {
        // Fetch only the data that the client needs.
        ...ObjectsUtils.getObjProperties(order, ['_id', 'size', 'stage']),
        // Complete the missing data for the client.
        processTime: order.stage === STAGE.DONE ? TimesUtils.getProcessTime(order) : null,
        toppiesCount: order.toppies.length,
        stageLevel: CONSTANTS.RESTAURANT.STAGES[order.stage].LEVEL,
        user: {
          firstName,
          lastName,
          gender,
          imageId,
        },
      };
    });
  }
}
