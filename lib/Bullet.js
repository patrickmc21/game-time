class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -20;
    this.height = 10;
    this.width = 10;
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = 'transparent'
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();

    ctx.beginPath()
    ctx.fillStyle = '#2C3539';
    ctx.fillRect(this.x, this.y - 4, this.width, this.height - 4);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = '#2C3539'
    ctx.moveTo(this.x + 5, this.y - 10);
    ctx.lineTo(this.x + 10, this.y - 5 );
    ctx.lineTo(this.x, this.y - 5);
    ctx.fill();

    return this;
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height - this.vy)
    return this;
  }

  move() {
    this.y += this.vy;
    return this;
  }
}

module.exports = Bullet;