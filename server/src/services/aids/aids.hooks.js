const { authenticate } = require('@feathersjs/authentication').hooks;
const deduplicateTags = require('./hooks/deduplicateTags');
const aggregateTags = require('./hooks/aggregateTags');
const deleteUpload = require('./hooks/deleteUpload');
const searchRegex = require('./hooks/searchRegex');


module.exports = {
  before: {
    all: [],
    find: [ aggregateTags(), searchRegex() ],
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
