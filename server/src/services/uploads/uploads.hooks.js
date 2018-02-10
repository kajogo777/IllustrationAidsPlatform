const { authenticate } = require('feathers-authentication').hooks;
const dauria = require('dauria');

function transformFileHook(context){
  if (!context.data.uri && context.params.file){
      const file = context.params.file;
      const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
      context.data = {uri: uri};
  }
}

module.exports = {
  before: {
    all: [ ],//authenticate('jwt') ],
    find: [],
    get: [],
    create: [ transformFileHook ],
    update: [],
    patch: [],
    remove: []
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
