const mongoose = require('mongoose');

module.exports = function () {
  const app = this;

  conn = `mongodb://db:27017/${process.env.MONGODB_DATABASE}`;
  // db = mongoose.connect(conn, {
  //   user: process.env.MONGODB_USERNAME,
  //   pass: process.env.MONGODB_PASSWORD,
  //   auto_reconnect:true,
  //   reconnectTries: Number.MAX_VALUE,
  // });
  var connectWithRetry = function() {
    return mongoose.connect(conn, {
            user: process.env.MONGODB_USERNAME,
            pass: process.env.MONGODB_PASSWORD,
            auto_reconnect:true,
            reconnectTries: Number.MAX_VALUE,
          }, function(err) {
            if (err) {
              console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
              setTimeout(connectWithRetry, 1000);
            }
          });
  };
  connectWithRetry();

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
