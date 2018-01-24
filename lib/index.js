const Mushroom = require('./Mushroom.js');
const Centipede = require('./Centipede.js');
const Character = require('./Character.js');
const Bullet = require('./Bullet.js');

const character = new Character();

const canvas = document.getElementById('game');
const ctx =  canvas.getContext('2d');
const centipedeArray = [];
const bulletsArray = [];
const mushroomArray = [];

drawBlock();
character.draw(ctx);
activateCentipede()
animateBullet()


window.addEventListener('keydown', moveCharacter);
window.addEventListener('keydown', shoot);
// canvas.addEventListener('click', drawBlock);
// requestAnimationFrame(activateCentipede);

function drawBlock() {
  for (let i = 0; i < 21; i++) {
    let mushroom = new Mushroom();

    mushroom.draw(ctx);
    mushroomArray.push(mushroom);
  }
}

function activateCentipede() {
   var key = setInterval(function() {
    if (centipedeArray.length < 10) {
      let centipede = new Centipede();

      centipede.draw(ctx);
      centipedeArray.push(centipede);
    }
  }, 65);
  requestAnimationFrame(animateCentipede);
}

function animateCentipede() {
  centipedeArray.forEach(segment => {
    segment.erase(ctx).move().draw(ctx);
  });
  if (centipedeArray.length > 9) {
    clearInterval(1);
  }
  centipedeMushroomCollision();
  bulletCentipedeCollision();
  requestAnimationFrame(animateCentipede);
}

function centipedeMushroomCollision() {
  centipedeArray.forEach(segment => {
    mushroomArray.forEach(boomer => {
      if ((boomer.x <= segment.x + segment.radius 
        && boomer.x + boomer.width >= segment.x - segment.radius) 
        && (segment.y + segment.radius >= boomer.y 
        && segment.y - segment.radius <= boomer.y + boomer.height)) {
        segment.erase(ctx);
        segment.y += segment.radius * 2;
        segment.vx = -segment.vx;
      }
      boomer.draw(ctx);
    })
  })
}

function bulletCentipedeCollision() {
  centipedeArray.forEach((segment, segmentIndex, segmentArray) => {
    bulletsArray.forEach((bullet, bulletIndex, bulletArray)  => {
      if ((bullet.x <= segment.x + segment.radius 
        && bullet.x + bullet.width >= segment.x - segment.radius) 
        && (segment.y + segment.radius >= bullet.y 
        && segment.y - segment.radius <= bullet.y + bullet.height)) {
        bullet.erase(ctx);
        bulletArray.splice(bulletIndex, 1);
        segment.erase(ctx);
        let mushroom = new Mushroom(segment.x - segment.radius, segment.y - segment.radius);
        mushroomArray.push(mushroom);
        segmentArray.splice(segmentIndex, 1);
        console.log(mushroomArray.length)
      }
    })
  })
}  


function moveCharacter(e) {
  if (e.keyCode == '37' && character.x - character.vx > 0) {
    character.erase(ctx);
    character.x -= character.vx;
    character.draw(ctx)
  }
  if (e.keyCode == '39' 
    && character.x + character.vx + character.width < 1000) {
    character.erase(ctx);
    character.x += character.vx;
    character.draw(ctx)
  }
  if (e.keyCode == '38' && character.y - character.vy > 500) {
    character.erase(ctx);
    character.y -= character.vy;
    character.draw(ctx)
  }
  if (e.keyCode == '40' && character.y + character.vy  < 600) {
    character.erase(ctx);
    character.y += character.vy;
    character.draw(ctx)
  } 
}

function shoot(e) {
  if (e.keyCode == '32') {
    let bullet = new Bullet(character.x, character.y - 10);
    
    bullet.draw(ctx);
    bulletsArray.push(bullet);
  }
  if (bulletsArray.length > 8) {
    bulletsArray.shift();
  }
}

function animateBullet() {
  bulletsArray.forEach(bullet => {
    bullet.erase(ctx).move().draw(ctx);
  })
  requestAnimationFrame(animateBullet);
}



