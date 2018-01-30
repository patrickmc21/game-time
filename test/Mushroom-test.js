const { assert } = require('chai');
const Mushroom = require('../lib/Mushroom.js')

describe('Mushroom', function() {

  it('should have a x cordinate', function () {
    let mushroom = new Mushroom(30);
    assert.equal(mushroom.x, 30);
  })

  it('should have a y cordinate', function () {
    let mushroom = new Mushroom(30, 400);
    assert.equal(mushroom.y, 400);
  })

  it('should have a default height of 30', function () {
    let mushroom = new Mushroom();
    assert.equal(mushroom.height, 30);
  })

  it('should have a default width of 30', function () {
    let mushroom = new Mushroom();
    assert.equal(mushroom.width, 30);
  })

  it('the random x cordinate should be above 40 and below 950', function () {
    let mushroom = new Mushroom();
    assert.isAbove(mushroom.x, 40);
    assert.isBelow(mushroom.x, 950);
  })

  it('should have a default hit count of 0', function () {
    let mushroom = new Mushroom();
    assert.equal(mushroom.hitCount, 0);
  })

});