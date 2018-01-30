const { assert } = require('chai');
const Centipede = require('../lib/Centipede.js');

describe('Centipede', function() {

  it('should have a default x cordinate of 500', function() {
    let centipede = new Centipede();
    assert.equal(centipede.x, 500);
  })

  it('should have a y cordinate', function() {
    let centipede = new Centipede(32);
    assert.equal(centipede.y, 32);
  })

  it('should have a radius of 15', function() {
    let centipede = new Centipede();
    assert.equal(centipede.radius, 15);
  })

  it('should have an x velocity of 0', function() {
    let centipede = new Centipede();
    assert.equal(centipede.vx, 0);
  })

  it('should have a y velocity of 6', function() {
    let centipede = new Centipede();
    assert.equal(centipede.vy, 5);
  })

  it('should have a walk speed of 6', function() {
    let centipede = new Centipede();
    assert.equal(centipede.vx, 0);
  })

  it('should have an eye x cordinate', function() {
    let centipede = new Centipede(10, 10);
    assert.equal(centipede.eyeX, 10);
  })

  it('should have an eye y cordinate', function() {
    let centipede = new Centipede(10, 10);
    assert.equal(centipede.eyeY, 5);
  })

  it('should not have a head', function() {
    let centipede = new Centipede();
    assert.equal(centipede.hasHead, false);
  })

})