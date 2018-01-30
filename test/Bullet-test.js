const { assert } = require('chai');
const Bullet = require('../lib/Bullet.js');

describe('Bullet', function () {

  it('should have an x coordinate', function () {
    let bullet = new Bullet(10, 40);

    assert.equal(bullet.x, 10);
  })

  it('should have an y coordinate', function () {
    let bullet = new Bullet(10, 40);

    assert.equal(bullet.y, 40);
  })

  it('should have a height of 10 by default', function () {
    let bullet = new Bullet(10, 40);

    assert.equal(bullet.height, 10);
  })

  it('should have a width of 10 by default', function () {
    let bullet = new Bullet(10, 40);

    assert.equal(bullet.width, 10);
  })

  it('should have a y velocity of -20 by default', function () {
    let bullet = new Bullet(10, 40);

    assert.equal(bullet.vy, -20);
  })

  it('should move vertically', function () {
    let bullet = new Bullet(10, 40);

    assert.equal(bullet.y,  40);

    bullet.move();

    assert.equal(bullet.y,  20);
  })
})