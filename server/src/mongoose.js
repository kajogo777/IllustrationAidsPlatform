const mongoose = require('mongoose');

module.exports = function () {
  const app = this;

  conn = `mongodb://db:27017/${process.env.MONGODB_DATABASE}`;
  db = mongoose.connect(conn, {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    useMongoClient: true
  });

  mongoose.Promise = global.Promise;

  db.on('error', (err) => {
  	console.log(err);
  });

  app.set('mongooseClient', mongoose);
};
