const assert = require('assert');
const app = require('../../src/app');

describe('\'reservations\' service', () => {
  it('registered the service', () => {
    const service = app.service('reservations');

    assert.ok(service, 'Registered the service');
  });
});
