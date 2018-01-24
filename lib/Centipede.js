class Centipede {
  constructor() {
    this.x = 500;
    this.y = 10;
    this.radius = 10;
    this.vx = 5;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();
    ctx.save();
    return this
  }

  move() {
    this.x += this.vx;
    if (this.x + this.vx > 990 || this.x + this.vx < 10) {
      this.y += 20;
      this.vx = -this.vx;
    }
    return this
  }

  erase(ctx) {
    ctx.clearRect(this.x - this.radius, this.y - this.radius, 20, 20);
    return this
  }
}

module.exports = Centipede;