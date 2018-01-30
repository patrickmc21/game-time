const Explosion = require('./Explosion.js');

class ExplosionSpider extends Explosion{
  constructor (x, y) {
    super(x, y);
    this.red = '#880000';
    this.brown = '#59362F';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.red;
    ctx.arc(this.x, this.y, this.radius / 2, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = this.brown;
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();

    return this;
  }
}

module.exports = ExplosionSpider;