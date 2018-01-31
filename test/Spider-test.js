const { assert } = require('chai');
const Spider = require('../lib/Spider.js');

describe('Spider', function() {

  it('should have a default x cordinate of -75', function() {
    let spider = new Spider();
    
    assert.equal(spider.x, -75);
  })

  it('should have a default y cordinate of 400', function() {
    let spider = new Spider();
    
    assert.equal(spider.y, 400);
  })

  it('should have a x cordinate that can change', function() {
    let spider = new Spider(303);
    
    assert.equal(spider.x, 303);

    let spider1 = new Spider(100);
    
    assert.equal(spider1.x, 100);
  })

  it('should have a y cordinate that can change', function() {
    let spider = new Spider(303, 500);
    
    assert.equal(spider.y, 500);

    let spider1 = new Spider(100, 450);
    
    assert.equal(spider1.y, 450);
  })

  it('should have a radius of 20', function() {
    let spider = new Spider();
    
    assert.equal(spider.radius, 20);
  })

  it('should have a walk property of 10', function() {
    let spider = new Spider();
    
    assert.equal(spider.walk, 10);
  })

  it('should have an inverse property of 1', function() {
    let spider = new Spider();
    
    assert.equal(spider.inverse, 1);
  })

  it('should have a random x velocity between 1 and 4', function() {
    let spider = new Spider();
    
    assert.isAtLeast(spider.vx, 1);
    assert.isBelow(spider.vx, 4);
  })

  it('should have a random y velocity between 1 and 4', function() {
    let spider = new Spider();
    
    assert.isAtLeast(spider.vy, 1);
    assert.isBelow(spider.vy, 4);
  })
})