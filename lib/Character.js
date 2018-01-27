class Character {
  constructor () {
    this.x = 500;
    this.y = 540;
    this.width = 40;
    this.height = 60;
    this.vx = 20;
    this.vy = 30;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'transparent'
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'tan';
    ctx.arc(this.x + 20, this.y + 7 , this.width/3, 0, (Math.PI / 180) * 360, false);
    ctx.fill();
    ctx.closePath();


    ctx.beginPath();
    ctx.fillStyle = 'tan';
    ctx.fillRect(this.x + 5, this.y + 20, this.width - 10, this.height - 30);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x + 5, this.y + 50, this.width - 10, this.height - 50);
    ctx.closePath();


    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x + 5, this.y + 60, this.width - 30, this.height - 40);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x + 25, this.y + 60, this.width - 30, this.height - 40);
    ctx.closePath();

    return this;
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y - 10, this.width, this.height + 30)
    return this;
  }
}

module.exports = Character;