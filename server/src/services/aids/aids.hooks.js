const { authenticate } = require('feathers-authentication').hooks;
const deduplicateTags = require('./hooks/deduplicateTags');
const aggregateTags = require('./hooks/aggregateTags');
const deleteUpload = require('./hooks/deleteUpload');


module.exports = {
  before: {
    all: [],
    find: [ aggregateTags() ],
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
    remove: [ deleteUpload() ]
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
