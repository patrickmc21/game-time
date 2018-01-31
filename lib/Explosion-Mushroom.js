const Explosion = require('./Explosion.js');

class ExplosionMushroom extends Explosion {
  constructor (x, y) {
    super(x, y);
    this.red = 'rgba(255, 0, 0, 0.5)';
    this.yellow = 'rgba(255,255,0, 0.5)';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.red;
    ctx.arc(this.x, this.y, this.radius / 2, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = this.yellow;
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();

    return this;
  }
}

module.exports = ExplosionMushroom;