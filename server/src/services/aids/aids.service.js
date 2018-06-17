// Initializes the `aids` service on path `/aids`
const createService = require('feathers-mongoose');
const createModel = require('../../models/aids.model');
const hooks = require('./aids.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'aids',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/aids', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('aids');

  service.hooks(hooks);
};
