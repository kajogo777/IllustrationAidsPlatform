const assert = require('assert');
const app = require('../../src/app');

describe('\'aids\' service', () => {
  it('registered the service', () => {
    const service = app.service('aids');

    assert.ok(service, 'Registered the service');
  });
});
