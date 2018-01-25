class Centipede {
  constructor() {
    this.x = 500;
    this.y = 10;
    this.radius = 10;
    this.vx = 5;
    this.walk = 3;
    this.eyeX = this.x + this.vx;
    this.eyeY = this.y - 5;
    this.hasHead = false;
  }

  drawHead(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(this.eyeX, this.eyeY, this.radius/4, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();
    ctx.save();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(this.x + this.walk, this.y + 10, this.radius/2, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();
    ctx.save();

    if (this.hasHead === true) {
      this.drawHead(ctx);
    }


    return this
  }

  move() {
    this.x += this.vx;
    this.eyeX = this.x + this.vx;
    if (this.x + this.vx > 990 || this.x + this.vx < 10) {
      this.y += 20;
      this.eyeY += 20;
      this.vx = -this.vx;
    }
    if (this.y + this.radius > 600) {
      this.y = 520;
      this.eyeY = 515;
    }
    return this
  }

  erase(ctx) {
    ctx.clearRect(this.x - this.radius, this.y - this.radius, 20, 25);
    return this
  }
}

module.exports = Centipede;