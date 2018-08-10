/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);

const seedPromise = app.seed();
const removeReservationsPromise = app.service('reservations').remove(id=null);

Promise.all([
  seedPromise,
  removeReservationsPromise
])
.then(() => {
  const usersPromise = app.service('users').find();
  const aidsPromise = app.service('aids').find();

  Promise.all([
    usersPromise,
    aidsPromise
  ])
  .then((values) => {
    users = values[0].data;
    aids  = values[1].data;

    let faker = require('faker');

    for(let i = 0; i < 6; i++){
      user = faker.random.arrayElement(users);
      aid  = aids[i];
      status = faker.random.arrayElement(['PENDING', 'CHECKED OUT', 'RETURNED', 'OVERDUE']);

      let date_reserved = faker.date.past();
      let pickup_date = faker.date.past(1, date_reserved);

      pickup_date.setDate(pickup_date.getDate() + (5+(7-pickup_date.getDay())) % 7);

      app.service('reservations').create({
        human_id: aid.human_id,
        aid_id: aid._id,
        username: user.username,
        user_id: user._id,
        pickup_date: pickup_date,
        date_reserved: date_reserved,
        status: status
      });
      console.log("info: after: reservaions - Method: create\n");
    }
  })
  .catch(err => console.log(err));

  logger.info('Seed values created');
})
.catch(err => {
  logger.info('seed values creation failed ', err);
});
