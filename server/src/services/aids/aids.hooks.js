const { authenticate } = require('feathers-authentication').hooks;
const deduplicateTags = require('./hooks/deduplicateTags');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate('jwt'), deduplicateTags() ],
    update: [ authenticate('jwt'), deduplicateTags() ],
    patch: [ authenticate('jwt'), deduplicateTags() ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
