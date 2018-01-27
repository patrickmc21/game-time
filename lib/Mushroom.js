class Mushroom {
  constructor(x, y) {
    this.x = x || Math.floor(Math.random() * 920)+ 30;
    this.y = y || Math.floor(Math.random() * 460) + 30;
    this.width = 20;
    this.height = 20;
    this.hitCount = 0;
    // this.img = new Image();
    // this.img.src = './images/Mushroom.svg';
  }

  draw(ctx) {
    // ctx.imageSmoothingEnabled = false;
    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (this.hitCount === 0) {
      ctx.fillStyle = 'transparent'
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, (Math.PI / 180) * 180, true);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(this.x + 7, this.y + 3, 2, 0, (Math.PI / 180) * 360, true);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(this.x + 14, this.y + 7, 2, 0, (Math.PI / 180) * 360, true);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = 'brown'
      ctx.fillRect(this.x + this.width/2 - 4, this.y + this.height/2, this.width/3, this.height/2);
    } else if (this.hitCount >=1) {
      ctx.fillStyle = 'transparent'
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.beginPath();
      ctx.fillStyle = 'gray';
      ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, (Math.PI / 180) * 150, true);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(this.x + 7, this.y + 3, 2, 0, (Math.PI / 180) * 360, true);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(this.x + 14, this.y + 7, 2, 0, (Math.PI / 180) * 360, true);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = 'gray'
      ctx.fillRect(this.x + this.width/2 - 4, this.y + this.height/2, this.width/3, this.height/2);
    }
  }

  erase(ctx) {
    ctx.clearRect(this.x - 20, this.y - 20, this.width + 40, this.height + 40)
    return this;
  }
}

module.exports = Mushroom;