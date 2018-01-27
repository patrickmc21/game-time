class Spider {
  constructor (){
    this.x = -75;
    this.y = 400;
    this.radius = 20;
    this.vy = Math.floor(Math.random() * 4) + 1 ;
    this.vx = Math.floor(Math.random() * 4 ) + 1;
    this.inverse = 1;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.vx > 1100 || this.x + this.vx < -100) {
      this.vx = -this.vx;
    }
    if (this.y + this.radius > 700 || this.y + this.radius < 300) {
      this.vy = -this.vy;
    }

    if (this.x % 5 === 0) {
      this.inverse = -this.inverse;
    }

    if (this.x % 100 === 0) {
      this.vx = (Math.floor(Math.random() * 3) + 2) * this.inverse;
    }

    if (this.y % 75 === 0) {
      this.vy = (Math.floor(Math.random() * 3)) * this.inverse;
    }

    return this
  }

  erase(ctx) {
    ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius *  2,this.radius * 2 + 5);
    return this
  }
}

module.exports = Spider;
