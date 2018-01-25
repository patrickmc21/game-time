class Mushroom {
  constructor(x, y) {
    this.x = x || Math.floor(Math.random() * 920)+ 30;
    this.y = y || Math.floor(Math.random() * 460) + 30;
    this.width = 20;
    this.height = 20;
    this.hitCount = 0;

  }

  draw(ctx) {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height)
    return this;
  }
}

module.exports = Mushroom;