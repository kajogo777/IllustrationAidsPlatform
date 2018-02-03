const users = require('./users/users.service.js');
const aids = require('./aids/aids.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(aids);
};
