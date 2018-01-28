const Mushroom = require('./Mushroom.js');
const Centipede = require('./Centipede.js');
const Character = require('./Character.js');
const Bullet = require('./Bullet.js');
const Spider = require('./Spider.js');

const character = new Character();

const canvas = document.getElementById('game');
const ctx =  canvas.getContext('2d');
// ctx.imageSmoothingEnabled = false;

var centipedeArray = [];
const bulletsArray = [];
let mushroomArray = [];
let spiderArray = [];
let gamePause = false;

let score = 0;
let level = 1;
let lives = 1;


const gameBoard = document.querySelector('.game-background');
const startScreen = document.querySelector('.start-screen');
const startButton = document.querySelector('.start-button');
startButton.focus();
const gameScore = document.querySelector('.score-value');
const gameLevel = document.querySelector('.level-value');
const gameLives = document.querySelector('.lives-value');
const levelUpScreen = document.querySelector('.level-up');
const gameLevelScreen = document.querySelector('.level-value-screen');
const gameOverScreen = document.querySelector('.game-over');
const gameOverScore = document.querySelector('.game-over-score');
const restartButton = document.querySelector('.restart-button');

drawBlock();
character.draw(ctx);
// let spider = new Spider();
// console.log(spider)
let segment = new Centipede(-10)
centipedeArray.push(segment)
centipedeArray[0].hasHead = true;

startButton.addEventListener('click', startGame);

window.addEventListener('keydown', moveCharacter);
window.addEventListener('keydown', shoot);
restartButton.addEventListener('click', restartGame)

function restartGame() {
  gameOverScreen.classList.toggle('hidden');
  centipedeArray = [];
  mushroomArray = [];
  score = 0;
  level = 1;
  lives = 3;
  drawBlock();
  character.draw(ctx);
  let segment = new Centipede(-10)
  centipedeArray.push(segment)
  centipedeArray[0].hasHead = true;
  activateCentipede();
}

function startGame() {
  startScreen.classList.toggle('hidden');
  gameBoard.classList.toggle('hidden');
  activateCentipede();
}

function updateGameValues() {
  gameScore.innerText = score;
  gameLevel.innerText = level;
  gameLives.innerText = lives;
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
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (lives > 0 && gamePause === false ) {
    updateGameValues();
    if (characterCentipedeCollision() === true || characterSpiderCollision() === true) {
      centipedeArray = [];
      spiderArray = [];
      ctx.clearRect(0,0, canvas.width, canvas.height);
      character.x = 480;
      character.draw(ctx);
      let segment = new Centipede(-10)
      centipedeArray.push(segment)
      centipedeArray[0].hasHead = true;
      lives--;
      
      activateCentipede();
    } else if (centipedeArray.length === 0){
      // alert('NOt yet!')
      level++;
      levelUpScreen.classList.toggle('hidden');
      gameLevelScreen.innerText = level;
      // activateCentipede();
    } else {
      centipedeArray.forEach((segment, index, array) => {
        segment.erase(ctx).move().draw(ctx);
      });

      let number = Math.floor(Math.random() * 250);
      if (number === 15 && spiderArray.length === 0) {
        let spider = new Spider();
        spiderArray.push(spider);
      }

      if (spiderArray.length === 1){
        spiderArray[0].erase(ctx).move().draw(ctx);
      }

      animateBullet()
      characterSpiderCollision();
      characterCentipedeCollision();
      centipedeMushroomCollision();
      bulletCentipedeCollision();
      bulletMushroomCollision();
      bulletSpiderCollision();
      character.draw(ctx)
      
      requestAnimationFrame(gameLoop);
    }
  }
  else if (lives === 0) {
    gameOverScreen.classList.toggle('hidden');
    gameOverScore.innerText = score;
    restartButton.focus();
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
        score++;
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

function bulletSpiderCollision() {
  spiderArray.forEach((spidey, spideyIndex, spideyArray) => {
    bulletsArray.forEach((bullet, bulletIndex, bulletArray)  => {
      if ((bullet.x <= spidey.x + spidey.radius 
        && bullet.x + bullet.width >= spidey.x - spidey.radius) 
        && (spidey.y + spidey.radius >= bullet.y 
        && spidey.y - spidey.radius <= bullet.y + bullet.height)) {
        bullet.erase(ctx);
        bulletArray.splice(bulletIndex, 1);
        
        spidey.erase(ctx);
        spideyArray.pop();

        score += 10;
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

function characterSpiderCollision() {
  let verify = spiderArray.reduce((boolean, spidey, spideyIndex, spideyArray) => {
      if ((character.x <= spidey.x + spidey.radius 
        && character.x + character.width >= spidey.x - spidey.radius) 
        && (spidey.y + spidey.radius >= character.y 
        && spidey.y - spidey.radius <= character.y + character.height)) {
      boolean = true;
      }
      return boolean;
  }, false)
  return verify;
} 

function moveCharacter(e) {
  // e.preventDefault();
    if (e.keyCode == '37' && character.x - character.vx > 0 && gamePause === false) {
      character.erase(ctx);
      character.x -= character.vx;
    }
    if (e.keyCode == '39' 
      && character.x + character.vx + character.width < 1000 && gamePause === false) {
      character.erase(ctx);
      character.x += character.vx;
    }
    if (e.keyCode == '38' && character.y - character.vy > 500 && gamePause === false) {
      character.erase(ctx);
      character.y -= character.vy;
    }
    if (e.keyCode == '40' && character.y + character.vy  < 600 && gamePause === false) {
      character.erase(ctx);
      character.y += character.vy;
    } 
    if (e.keyCode == '80') {
      gamePause = !gamePause;
      gameLoop();
    }
}

function shoot(e) {
  if (e.keyCode == '32' && bulletsArray.length < 1 && gamePause === false) {
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

