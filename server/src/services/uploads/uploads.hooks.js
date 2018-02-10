const { authenticate } = require('feathers-authentication').hooks;
const dauria = require('dauria');

function transformFileHook(hook){
  if (!hook.data.uri && hook.params.file){
    const file = hook.params.file;
    const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
    hook.data = {uri: uri};
  }
}

function dropFile(hook){
  if (hook.result){
    hook.result = {
      id: hook.result.id,
      size: hook.result.size
    };
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
    create: [ dropFile ],
    update: [ dropFile ],
    patch: [ dropFile ],
    remove: [ dropFile ]
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
