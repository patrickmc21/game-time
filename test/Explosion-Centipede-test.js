const { assert } = require('chai');
const ExplosionCentipede = require('../lib/Explosion-Centipede.js');

describe('Centipede Explosion', function() {

  it('should have an x coordinate', function() {
    let centipedeExplosion = new ExplosionCentipede(10, 40);

    assert.equal(centipedeExplosion.x, 10);
  })

  it('should have a y coordinate', function() {
    let centipedeExplosion = new ExplosionCentipede(10, 40);

    assert.equal(centipedeExplosion.y, 40);
  })

  it('should have a radius', function () {
    let centipedeExplosion = new ExplosionCentipede(10, 40);

    assert.equal(centipedeExplosion.radius, 4);
  })

  it('should expand', function () {
    let centipedeExplosion = new ExplosionCentipede(10, 40);

    assert.equal(centipedeExplosion.radius, 4)
    centipedeExplosion.move()
    assert.equal(centipedeExplosion.radius, 7)
  })
})