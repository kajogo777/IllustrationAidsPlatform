const mongoose = require('mongoose');

module.exports = function () {
  const app = this;

  conn = `mongodb://db:27017/${process.env.MONGODB_DATABASE}`;
  db = mongoose.connect(conn, {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    auto_reconnect:true,
    reconnectTries: Number.MAX_VALUE,
  });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
