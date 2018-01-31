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

  it('should start with 3 lives', function () {
    let character = new Character();
    assert.equal(character.lives, 3);
  }) 

  it('should start with a score of zero', function () {
    let character = new Character();
    assert.equal(character.score, 0);
  }) 

  it('should start on level 1', function () {
    let character = new Character();
    assert.equal(character.level, 1);
  }) 

  it('should move right', function () {
    let character = new Character();
    assert.equal(character.x, 500);
    character.moveRight();
    assert.equal(character.x, 520);
  }) 

  it.('should move left', function () {
    let character = new Character();
    assert.equal(character.x, 500);
    character.moveLeft();
    assert.equal(character.x, 480);
  }) 

  it.('should move up', function () {
    let character = new Character();
    assert.equal(character.y, 510);
    character.moveUp();
    assert.equal(character.y, 415);
  })  

  it.('should move down', function () {
    let character = new Character();
    assert.equal(character.y, 510);
    character.moveDown();
    assert.equal(character.y, 605);
  })
})