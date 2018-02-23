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

function fileOnly(hook){
  if (hook.result){
    let regex = /^data:.+\/(.+);base64,(.*)$/;
    let matches = hook.result.uri.match(regex);
    let ext = matches[1];
    let data = matches[2];
    let buffer = new Buffer(data, 'base64');

    //buffer turned to image in custom service middleware
    hook.result = {
      data: buffer,
      ext: ext
    }
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
    get: [ fileOnly ],
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
