const { assert } = require('chai');
const ExplosionSpider = require('../lib/Explosion-Spider.js');

describe('Spider Explosion', function() {

  it('should have an x coordinate', function() {
    let spiderExplosion = new ExplosionSpider(10, 40);

    assert.equal(spiderExplosion.x, 10);
  })

  it('should have a y coordinate', function() {
    let spiderExplosion = new ExplosionSpider(10, 40);

    assert.equal(spiderExplosion.y, 40);
  })

  it('should have a radius', function () {
    let spiderExplosion = new ExplosionSpider(10, 40);

    assert.equal(spiderExplosion.radius, 4);
  })

  it('should expand', function () {
    let spiderExplosion = new ExplosionSpider(10, 40);

    assert.equal(spiderExplosion.radius, 4)
    spiderExplosion.move()
    assert.equal(spiderExplosion.radius, 7);
  })
})