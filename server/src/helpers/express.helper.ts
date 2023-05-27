import debugFactory from 'debug';
import * as http from 'http';
import CustomError from '../custom/error.custom';

export default class ExpressHelper {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Validate the server port.
   *
   * Validate that the port supplied to the server is valid.
   * @param {string | number} port - The server port.
   * @returns {number}
   */
  static validatePort(port: string | number): number {
    const portNumber = +port;
    if (isNaN(portNumber)) {
      return portNumber;
    }
    if (portNumber >= 0) {
      return portNumber;
    }
    return 0;
  }

  /**
   * Listen to the server.
   *
   * Listen to the server on debugging.
   * @param {http.Server} server - The server object.
   * @returns {() => void}
   */
  static onListening(server: http.Server): () => void {
    const debug = debugFactory('tutorial:server');
    const addr = server.address();
    let bind = '';
    if (addr) {
      bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    }
    return () => {
      debug(`Listening on ${bind}`);
    };
  }

  /**
   * On error on the server.
   *
   * Handle any errors on the server.
   * @param {string | number} port - The server port.
   * @returns {(error: NodeJS.ErrnoException) => void}
   */
  static onError(port: string | number): (error: NodeJS.ErrnoException) => void {
    return (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
      // Handle specific listen errors with friendly messages.
      switch (error.code) {
        case 'EACCES':
          console.error(`Port ${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`Port ${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    };
  }
}
