import STAGE from '../bl/enums/stage.enum';
import WORKER from '../bl/enums/worker.enum';

const CONSTANTS = {
  ENVIRONMENTS: {
    LOCAL: 'local',
    DEVELOPMENT: 'dev',
    QA: 'qa',
    PRODUCTION: 'prod',
  },
  RESTAURANT: {
    STAGES: {
      [STAGE.PENDING]: {
        NAME: STAGE.PENDING,
        LEVEL: -2,
        PREVIOUS_STAGE: STAGE.DOUGH,
        NEXT_STAGE: null,
        WORKER_TYPE: null,
        PROCESS_ORDERS_COUNT: -1,
        WORKERS_COUNT: -1,
        WORK_TIME_SECONDS: -1,
      },
      [STAGE.DOUGH]: {
        NAME: STAGE.DOUGH,
        LEVEL: 1,
        PREVIOUS_STAGE: STAGE.PENDING,
        NEXT_STAGE: STAGE.TOPPING,
        WORKER_TYPE: WORKER.DOUGH_CHEF,
        PROCESS_ORDERS_COUNT: 1,
        WORKERS_COUNT: 2,
        WORK_TIME_SECONDS: 7,
      },
      [STAGE.TOPPING]: {
        NAME: STAGE.TOPPING,
        LEVEL: 2,
        PREVIOUS_STAGE: STAGE.DOUGH,
        NEXT_STAGE: STAGE.OVEN,
        WORKER_TYPE: WORKER.TOPPING_CHEF,
        PROCESS_ORDERS_COUNT: 2,
        WORKERS_COUNT: 3,
        WORK_TIME_SECONDS: 4,
      },
      [STAGE.OVEN]: {
        NAME: STAGE.OVEN,
        LEVEL: 3,
        PREVIOUS_STAGE: STAGE.TOPPING,
        NEXT_STAGE: STAGE.SERVING,
        WORKER_TYPE: WORKER.OVEN,
        PROCESS_ORDERS_COUNT: 1,
        WORKERS_COUNT: 1,
        WORK_TIME_SECONDS: 10,
      },
      [STAGE.SERVING]: {
        NAME: STAGE.SERVING,
        LEVEL: 4,
        PREVIOUS_STAGE: STAGE.OVEN,
        NEXT_STAGE: STAGE.DONE,
        WORKER_TYPE: WORKER.WAITER,
        PROCESS_ORDERS_COUNT: 1,
        WORKERS_COUNT: 2,
        WORK_TIME_SECONDS: 5,
      },
      [STAGE.DONE]: {
        NAME: STAGE.DONE,
        LEVEL: -3,
        PREVIOUS_STAGE: STAGE.SERVING,
        NEXT_STAGE: null,
        WORKER_TYPE: null,
        PROCESS_ORDERS_COUNT: -1,
        WORKERS_COUNT: -1,
        WORK_TIME_SECONDS: -1,
      },
      [STAGE.ERROR]: {
        NAME: STAGE.ERROR,
        LEVEL: -1,
        PREVIOUS_STAGE: null,
        NEXT_STAGE: null,
        WORKER_TYPE: null,
        PROCESS_ORDERS_COUNT: -1,
        WORKERS_COUNT: -1,
        WORK_TIME_SECONDS: -1,
      },
    },
  },
  STREAM: {
    INTERVAL_TIME: 500,
    MAX_RECORDS_STREAM: 50,
    MAX_RETRIES: 3,
    RETRY_INTERVAL: 5000, // 5 seconds
  },
  AUTH: {
    HTTP_HEADERS: {
      AUTHORIZATION: 'Authorization',
    },
  },
  EVENTS: {
    SERVER_UP: 'server-up',
  },
  NOT_FOUND: 'Not Found',
};

export default CONSTANTS;
