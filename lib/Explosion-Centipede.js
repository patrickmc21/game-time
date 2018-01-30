const Explosion = require('./Explosion.js');

class ExplosionCentipede extends Explosion{
  constructor (x, y) {
    super(x, y);
    this.lightGreen = '#B5DA45';
    this.darkGreen = 'darkgreen';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.darkGreen;
    ctx.arc(this.x, this.y, this.radius / 2, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = this.lightGreen;
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();

    return this;
  }
}

module.exports = ExplosionCentipede;