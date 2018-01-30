const { assert } = require('chai');
const Bullet = require('../lib/Bullet.js');

describe('Bullet', function () {

  it('should move vertically', function () {
    let bullet = new Bullet(10, 40);

    assert.equal(bullet.y,  40);

    bullet.move();

    assert.equal(bullet.y,  20);
  })
})