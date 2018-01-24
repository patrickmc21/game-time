class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -10;
    this.height = 10;
    this.width = 10;
  }

  draw(ctx) {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height)
    return this;
  }

  move() {
    this.y += this.vy;
    return this;
  }
}

module.exports = Bullet;