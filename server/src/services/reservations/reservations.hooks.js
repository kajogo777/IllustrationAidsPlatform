const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');

const isAdmin = [
  authenticate('jwt'),
  restrictToRoles({
    roles: ['ADMIN'],
    fieldName: 'role',
    idField: '_id',
    ownerField: '_id',
    owner: false
  })
];

const updateAid = require('./hooks/updateAid');
const reserve = require('./hooks/reserve');
const reserveCheck = require('./hooks/reserveCheck');
const reservationsUpdate = require('./hooks/reservationsUpdate');


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ reservationsUpdate() ],
    get: [],
    create: [ reserveCheck(), reserve() ],
    update: [ ...isAdmin ],
    patch: [ ...isAdmin ],
    remove: [ ...isAdmin ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ updateAid() ],
    update: [ updateAid() ],
    patch: [ updateAid() ],
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
