const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner, restrictToRoles } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;

const isAdminOrOwner = [
  authenticate('jwt'),
  // restrictToOwner({
  //   idField: '_id',
  //   ownerField: '_id'
  // })
  restrictToRoles({
    roles: ['ADMIN'],
    fieldName: 'role',
    idField: '_id',
    ownerField: '_id',
    owner: true
  })
];

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


module.exports = {
  before: {
    all: [ ...isAdmin ],
    find: [ authenticate('jwt') ],
    get: [ ...isAdminOrOwner ],
    create: [ hashPassword() ],
    update: [ ...isAdmin, hashPassword() ],
    patch: [ ...isAdmin, hashPassword() ],
    remove: [ ...isAdminOrOwner ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
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
