const { assert } = require('chai');
const ExplosionMushroom = require('../lib/Explosion-Mushroom.js');

describe('Mushroom Explosion', function() {

  it('should have an x coordinate', function() {
    let mushroomExplosion = new ExplosionMushroom(10, 40);

    assert.equal(mushroomExplosion.x, 10);
  })

  it('should have a y coordinate', function() {
    let mushroomExplosion = new ExplosionMushroom(10, 40);

    assert.equal(mushroomExplosion.y, 40);
  })

  it('should have a radius', function () {
    let mushroomExplosion = new ExplosionMushroom(10, 40);

    assert.equal(mushroomExplosion.radius, 4);
  })

  it('should expand', function () {
    let mushroomExplosion = new ExplosionMushroom(10, 40);

    assert.equal(mushroomExplosion.radius, 4)
    mushroomExplosion.move()
    assert.equal(mushroomExplosion.radius, 7)
  })
})