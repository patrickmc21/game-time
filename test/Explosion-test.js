const { assert } = require('chai');
const Explosion = require('../lib/Explosion.js')

describe('Explosion', function() {

  it('should expand have an x cordinate', function () {
    let explosion = new Explosion(5, 5);

    assert.equal(explosion.x, 5);
  })

  it('should expand have a y cordinate', function () {
    let explosion = new Explosion(5, 5);

    assert.equal(explosion.y, 5);
  })

  it('should expand have a radius', function () {
    let explosion = new Explosion();

    assert.equal(explosion.radius, 4);
  }) 

  it('should have an expand value of 3', function () {
    let explosion = new Explosion();

    assert.equal(explosion.expand, 3);
  }) 

  it('should move and expand', function () {
    let explosion = new Explosion(5, 5);

    assert.equal(explosion.radius, 4);

    explosion.move();

    assert.equal(explosion.radius, 7)
  })

});