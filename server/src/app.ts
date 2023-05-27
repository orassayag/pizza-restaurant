import express from 'express';
import http from 'http';
import ENV from '../config/env';
import ExpressHelper from './helpers/express.helper';
import SocketIOProvider from './providers/socketio.provider';
import MongoDBProvider from './providers/mongodb.provider';
import LoggerProvider from './providers/logger.provider';
import RestaurantService from './services/restaurant.service';

// Set the server.
const app = express();
// Get the server's port.
const port = ExpressHelper.validatePort(ENV.server.port);
const url = `http://localhost:${port}`;
// For error handling, we need to externalise this.
process.env.NODE_ENV = ENV.server.env;
// Create the server.
const server = http.createServer(app);
// Initiate the Restaurant service.
RestaurantService.initiate();
server.listen(port, async () => {
  LoggerProvider.info(`Web server initiated successfully: ${url}`);
  // Initiate the MongoDB provider.
  await MongoDBProvider.initiate();
  // Initiate the SocketIO provider.
  await SocketIOProvider.initiate(server);
});
server.on('error', ExpressHelper.onError(port));
server.on('listening', ExpressHelper.onListening(server));
