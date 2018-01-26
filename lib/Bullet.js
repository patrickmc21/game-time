class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -10;
    this.height = 10;
    this.width = 10;
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = 'transparent'
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();

    // ctx.beginPath()
    // ctx.fillStyle = '#2C3539';
    // ctx.fillRect(this.x, this.y - 4, this.width, this.height - 4);
    // ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = '#2C3539'
    ctx.moveTo(this.x, this.y - 4);
    ctx.lineTo(this.x + 5, this.y);
    ctx.lineTo(this.x + 10, this.y - 4);
    ctx.fill();

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