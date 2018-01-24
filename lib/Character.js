class Character {
  constructor () {
    this.x = 500;
    this.y = 570;
    this.width = 20;
    this.height = 30;
    this.vx = 20;
    this.vy = 30;
  }
  draw(ctx) {
    ctx.fillStyle = 'coral'
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height)
    return this;
  }
}

module.exports = Character;