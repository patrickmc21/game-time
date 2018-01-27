const Mushroom = require('./Mushroom.js');
const Centipede = require('./Centipede.js');
const Character = require('./Character.js');
const Bullet = require('./Bullet.js');

const character = new Character();

const canvas = document.getElementById('game');
const ctx =  canvas.getContext('2d');
var centipedeArray = [];
const bulletsArray = [];
const mushroomArray = [];

const gameBoard = document.querySelector('.game-background');
const startScreen = document.querySelector('.start-screen');
const startButton = document.querySelector('.start-button');

drawBlock();
character.draw(ctx);
let segment = new Centipede(-10)
centipedeArray.push(segment)
centipedeArray[0].hasHead = true;
gameBoard.classList.toggle('hidden');

startButton.addEventListener('click', startGame);

window.addEventListener('keydown', moveCharacter);
window.addEventListener('keydown', shoot);

function startGame() {
  startScreen.classList.toggle('hidden');
  gameBoard.classList.toggle('hidden');
  activateCentipede();
}

function drawBlock() {
  for (let i = 0; i < 21; i++) {
    let mushroom = new Mushroom();

    mushroom.draw(ctx);
    mushroomArray.push(mushroom);
  }
}

function activateCentipede() {
  var increment = -20;
  for ( let i = 0 ; i < 9; i++) {
      let centipede = new Centipede(-10 + increment);

      increment -= 20;
      centipede.draw(ctx);
      centipedeArray.push(centipede);
    }
  requestAnimationFrame(animateCentipede);
}

function animateCentipede() {
  if (characterCentipedeCollision() === true || centipedeArray.length === 0 && bulletsArray.length > 0) {
    centipedeArray = [];
    ctx.clearRect(0,0, canvas.width, canvas.height);
    character.x = 480;
    character.draw(ctx);
    let segment = new Centipede(-10)
    centipedeArray.push(segment)
    centipedeArray[0].hasHead = true;
    activateCentipede();
  } else {
    centipedeArray.forEach((segment, index, array) => {
      segment.erase(ctx).move().draw(ctx);
    });
    animateBullet()
    characterCentipedeCollision();
    centipedeMushroomCollision();
    bulletCentipedeCollision();
    bulletMushroomCollision();
    requestAnimationFrame(animateCentipede);
  }
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
        segment.eyeY += segment.radius * 2;
        segment.vx = -segment.vx;
        segment.eyeX += segment.vx;
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
        if (segmentIndex < segmentArray.length - 1) {
          segmentArray[segmentIndex + 1].hasHead = true;
        }
        segment.erase(ctx);
        segmentArray.splice(segmentIndex, 1);
        let mushroom = new Mushroom(segment.x - segment.radius, segment.y - segment.radius);
        mushroom.erase(ctx);
        mushroom.draw(ctx);
        mushroomArray.push(mushroom);
      }
    })
  })
}  

function bulletMushroomCollision() {
  mushroomArray.forEach((boomer, boomerIndex, boomerArray) => {
    bulletsArray.forEach((bullet, bulletIndex, bulletArray)  => {
      if ((bullet.x <= boomer.x + boomer.width 
        && bullet.x + bullet.width >= boomer.x) 
        && (boomer.y + boomer.height >= bullet.y 
        && boomer.y <= bullet.y + bullet.height)) {
        bullet.erase(ctx);
        bulletArray.splice(bulletIndex, 1);
        boomer.erase(ctx);
        boomer.hitCount++;
        if (boomer.hitCount > 2) {
          boomerArray.splice(boomerIndex, 1);
          boomer.erase(ctx);
        }
      }
    })
  }) 
}

function characterCentipedeCollision() {
  let verify = centipedeArray.reduce((boolean, segment, segmentIndex, segmentArray) => {
      if ((character.x <= segment.x + segment.radius 
        && character.x + character.width >= segment.x - segment.radius) 
        && (segment.y + segment.radius >= character.y 
        && segment.y - segment.radius <= character.y + character.height)) {
      boolean = true;
      }
      return boolean;
  }, false)
  return verify;
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
  if (e.keyCode == '32' && bulletsArray.length < 1) {
    let bullet = new Bullet(character.x - 5, character.y + 10);
    
    bullet.draw(ctx);
    bulletsArray.push(bullet);
  }
}

function animateBullet() {
  bulletsArray.forEach((bullet, index, array) => {
    bullet.erase(ctx).move().draw(ctx);
    if (bullet.y < 5) {
      bullet.erase(ctx);
      array.splice(index, 1)
    }
  });
}

