const { assert } = require('chai');
const Explosion = require('../lib/Explosion.js')

describe('Explosion', function() {

  it('should expand', function () {
    let explosion = new Explosion(5, 5);

    assert.equal(explosion.radius, 4);

    explosion.move();

    assert.equal(explosion.radius, 7)
  })

});