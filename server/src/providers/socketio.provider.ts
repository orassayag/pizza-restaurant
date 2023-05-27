import { Server, Socket } from 'socket.io';
import http from 'http';
import Logger from './logger.provider';
import CustomError from '../custom/error.custom';
import ENV from '../../config/env';
import RestaurantService from '../services/restaurant.service';
import CONSTANTS from '../config/constants.config';

// ToDo: Implement retries logic.

export default class SocketService {
  private static io: Server | undefined;
  private static updateInterval: NodeJS.Timeout | null = null;
  private static newOrdersArrived = false;
  private static connectedSockets: Set<string> = new Set();

  /**
   * Initiate.
   *
   * This function gets a server object and initiates the socket service, with all the event listeners.
   * @param server - The server object to create the socket from.
   * @return {void}
   */
  public static async initiate(server: http.Server): Promise<void> {
    try {
      this.io = new Server(server, {
        cors: {
          origin: ENV.socket.cors_url,
        },
      });
      // ToDo: Separate to functions like in the client.
      // Handle an incoming connection from the client.
      this.io.on('connection', async (socket: Socket) => {
        Logger.info('Client connected: ', socket.id);
        this.connectedSockets.add(socket.id);
        if (this.connectedSockets.size) {
          // If a previous socket exists - Remove it.
          if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
          }
          // Stream the orders to the client.
          await this.streamToClient(socket);
        }
        // Handle incoming orders from the client.
        socket.on('incomingOrders', async (orders) => {
          Logger.info('Received orders: ', orders);
          // Process the orders by the restaurant service.
          await RestaurantService.incomingOrders(orders);
          this.newOrdersArrived = true;
          if (!this.updateInterval && this.connectedSockets.size > 0) {
            // Stream the orders to the client.
            this.streamToClient(socket);
          }
        });
        // Handle a disconnection from the client.
        socket.on('disconnect', () => {
          Logger.info('Client disconnected: ', socket.id);
          this.connectedSockets.delete(socket.id);
          // Stop the streaming interval if no other clients exist to listen.
          if (!this.connectedSockets.size && this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
          }
        });
      });
      Logger.info('SocketIO provider initiated successfully');
    } catch (err) {
      // Handle any case of error from the socket.
      throw new CustomError({
        message: `Error on socket io provider: ${err}`,
        status: 500,
      });
    }
  }

  /**
   * Stream to client.
   *
   * This function gets a socket object and stream the data each N
   * time to latest orders from the database.
   * @param socket - The socket object to stream the orders status to the client.
   * @return {void}
   */
  private static async streamToClient(socket: Socket): Promise<void> {
    if (!this.updateInterval) {
      // If no interval exists, create a new one and store it.
      this.updateInterval = setInterval(async () => {
        // Fetch the latest data from the database and stream it to the client.
        const orders = await RestaurantService.streamOrdersToClient();
        socket.emit('ordersStatus', orders);
        // Kill the interval if there are no orders anymore.
        if (!orders.length && !this.newOrdersArrived) {
          clearInterval(this.updateInterval!);
          this.updateInterval = null;
        }
        this.newOrdersArrived = false;
      }, CONSTANTS.STREAM.INTERVAL_TIME);
    }
  }
}
