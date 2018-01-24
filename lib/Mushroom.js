class Mushroom {
  constructor(x, y) {
    this.x = x || Math.floor(Math.random() * 980);
    this.y = y || Math.floor(Math.random() * 580);
    this.width = 20;
    this.height = 20;
  }

  draw(ctx) {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

module.exports = Mushroom;