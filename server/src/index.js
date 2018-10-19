/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () => {
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port);

  let user = {
    name: 'admin stmary',
    username: 'admin',
    password: process.env.ADMIN_PASSWORD,
    status: 'CONFIRMED',
    role: 'ADMIN',
    mobileNumber: process.env.ADMIN_NUMBER
  }

  app.service('users').find({username: 'admin'})
  .then((result) => {
    if(result.total == 0)
      app.service('users').create(user)
      .then(result => {
        logger.info("created default admin");
      })
      .catch(err => {
        logger.info('admin creation failed ', err);
      })
  });

});

app.seed().then(()=> console.log("seed values added"));
