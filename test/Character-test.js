const { assert } = require('chai');
const Character = require('../lib/Character.js');

describe('Character', function() {

  it('should have a x cordinate of 500', function () {
    let character = new Character();
    assert.equal(character.x, 500);
  })

  it('should have a y cordinate of 510', function () {
    let character = new Character();
    assert.equal(character.y, 510);
  })

  it('should have a width of 40', function () {
    let character = new Character();
    assert.equal(character.width, 40);
  })

  it('should have a height of 60', function () {
    let character = new Character();
    assert.equal(character.height, 60);
  })

  it('should have a y velocity of 95', function () {
    let character = new Character();
    assert.equal(character.vy, 95);
  })

  it('should have a x velocity of 20', function () {
    let character = new Character();
    assert.equal(character.vx, 20);
  }) 
})