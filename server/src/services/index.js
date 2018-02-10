const users = require('./users/users.service.js');
const aids = require('./aids/aids.service.js');
const uploads = require('./uploads/uploads.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(aids);
  app.configure(uploads);
};
