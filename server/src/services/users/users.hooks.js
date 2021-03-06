const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner, restrictToRoles } = require('feathers-authentication-hooks');
const { hashPassword } = require('@feathersjs/authentication-local').hooks;

const resgisterHook = require('./hooks/register');
const protectedFields = require('./hooks/protectedFields');


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
    all: [],
    find: [ ...isAdminOrOwner ],//authenticate('jwt') ],
    get: [ ...isAdminOrOwner ],
    create: [ hashPassword(), resgisterHook() ],
    update: [ ...isAdmin, hashPassword() ],
    patch: [ ...isAdminOrOwner, protectedFields(), hashPassword() ],
    remove: [ ...isAdmin ]
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
