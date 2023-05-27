const configJson = require('./env.json');

module.exports = {
  ...configJson,
  server: {
    ...configJson.server,
    port: process.env.PORT || configJson.server.port,
    env: process.env.ENV || configJson.server.env,
  },
  database: {
    ...configJson.database,
  },
  socket: {
    ...configJson.socket,
  }
};
