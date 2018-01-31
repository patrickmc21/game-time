const Mushroom = require('./Mushroom.js');
const Centipede = require('./Centipede.js');
const Character = require('./Character.js');
const Bullet = require('./Bullet.js');
const Spider = require('./Spider.js');
const ExplosionMushroom = require('./Explosion-Mushroom.js');
const ExplosionCentipede = require('./Explosion-Centipede.js');
const ExplosionSpider = require('./Explosion-Spider.js');
const HighScore = require('./High-Score.js');

const character = new Character();
const canvas = document.getElementById('game');
const ctx =  canvas.getContext('2d');
const bulletsArray = [];
let centipedeArray = [];
let mushroomArray = [];
let spiderArray = [];
let explosionArray = [];
let overrideDefault = false;
let gamePause = false;

const gameBoard = document.querySelector('.game-background');
const startScreen = document.querySelector('.start-screen');
const startButton = document.querySelector('.start-button');
const levelUpScreen = document.querySelector('.level-up');
const gameOverScreen = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart-button');
const levelUpButton = document.querySelector('.new-level-button');
const newHighScoreScreen = document.querySelector('.new-high-score');
const saveHighScoreButton = document.querySelector('.submit-high-score-button');
const showHighScoreStartScreenButton = document.querySelector('.high-score-start-button');
const highScoreScreen = document.querySelector('.high-scores');
const closeHighScoreScreenButton = document.querySelector('.hide-score');

createInitialHighScore();
startButton.focus();

window.addEventListener('keydown', gameControls);
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
levelUpButton.addEventListener('click', startNewLevel);
saveHighScoreButton.addEventListener('click', collectUserInfo);
showHighScoreStartScreenButton.addEventListener('click', showHighScoreScreenFromStart);
closeHighScoreScreenButton.addEventListener('click', closeHighScoreScreen);


function restartGame() {
  gameOverScreen.classList.toggle('hidden');
  resetGameValues();
  populateMushrooms();
  character.draw(ctx);
  activateCentipede();
}

function startGame() {
  startScreen.classList.toggle('hidden');
  gameBoard.classList.toggle('hidden');
  populateMushrooms();
  activateCentipede();
}

function updateGameValues() {
  document.querySelector('.score-value').innerText = character.score
  document.querySelector('.level-value').innerText = character.level;
  document.querySelector('.lives-value').innerText = character.lives;
}

function populateMushrooms() {
  for (let i = 0; i < 12; i++) {
    let mushroom = new Mushroom();

    mushroom.draw(ctx);
    mushroomArray.push(mushroom);
  }
}

function activateCentipede() {
  createCentipedeHead();
  var increment = -30;

  for (let i = 0; i < 9; i++) {
    let centipede = new Centipede(-10 + increment);

    increment -= 30;
    centipede.draw(ctx);
    centipedeArray.push(centipede);
  }
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (character.lives > 0 && gamePause === false ) {
    updateGameValues();
    if (characterCentipedeCollision() === true 
      || characterSpiderCollision() === true) {
      retryLevel();
    } else if (centipedeArray.length === 0) {
      levelUp();
    } else {
      persistGameLoop();
    }
  } else if (character.lives === 0) {
    gameOver();
  }
}

function persistGameLoop () {
  centipedeMushroomCollision();
  generateSpider();
  animateGamePieces();
  collisionDetection();
  requestAnimationFrame(gameLoop);
}

function retryLevel () {
  character.lives--;
  centipedeArray = [];
  spiderArray = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resetCharacterPosition();
  addSingleCentipedes();
  activateCentipede();
}

function resetCharacterPosition () {
  character.x = 480;
  character.gunX = character.x - 7;
  character.gunY = character.y - 10;
  character.draw(ctx);
}

function levelUp () {
  character.level++;
  character.lives++;
  character.score += 50;
  levelUpScreen.classList.toggle('hidden');
  document.querySelector('.level-value-screen').innerText = character.level;
  document.querySelector('.new-level-button-text').innerText = character.level;
}

function gameOver () {
  let oldHighScore = retrieveScoreFromStorage();

  if (oldHighScore.score < character.score) {
    overrideDefault = true;
    document.querySelector('.game-over-high-score').innerText = character.score;
    newHighScoreScreen.classList.toggle('hidden');
  } else {
    gameOverScreen.classList.toggle('hidden');
    document.querySelector('.game-over-score').innerText = character.score;
  }
}

function gameControls(e) {
  if (gamePause === false) {
    moveLeft(e);
    moveRight(e);
    moveUp(e);
    moveDown(e);  
    shoot(e);
    nextLevelCheat(e);
  }
  pauseGame(e);
}

function animateGamePieces() {
  animateSpider();
  animateCentipede();
  animateBullet()
  animateExplosions(ctx);
  character.draw(ctx);
}

function collisionDetection() {
  characterSpiderCollision();
  characterCentipedeCollision();  
  bulletCentipedeCollision();
  bulletMushroomCollision();
  bulletSpiderCollision();
  characterMushroomCollision()
}

function centipedeMushroomCollision() {
  centipedeArray.forEach(segment => {
    mushroomArray.forEach(boomer => {
      if ((boomer.x <= segment.x + segment.radius 
        && boomer.x + boomer.width >= segment.x - segment.radius) 
        && (segment.y + segment.radius >= boomer.y 
        && segment.y - segment.radius <= boomer.y + boomer.height)) {
        segment.erase(ctx);
        segment.y += segment.radius * 2 + segment.radius / 2;
        segment.eyeY += segment.radius * 2 + segment.radius / 2;
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
        createExplosion(new ExplosionCentipede(segment.x, segment.y));
        createHeadForNewCentipede(segmentIndex, segmentArray);
        segment.erase(ctx);
        createNewMushroom(segment);
        segmentArray.splice(segmentIndex, 1);
        character.score++;
      }
    })
  })
} 

function createNewMushroom(segment) {
  if (segment.y > 50) {
    let mushroom = new Mushroom(
      segment.x - segment.radius, 
      segment.y - segment.radius);
    
    mushroom.erase(ctx);
    mushroom.draw(ctx);
    mushroomArray.push(mushroom);
  }  
} 

function createHeadForNewCentipede(segmentIndex, segmentArray) {
  if (segmentIndex < segmentArray.length - 1) {
    segmentArray[segmentIndex + 1].hasHead = true;
  }  
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
        createExplosion(new ExplosionMushroom(
          boomer.x - boomer.width / 2, 
          boomer.y - boomer.height / 2));
        bulletMushroomHitCount(boomer, boomerIndex, boomerArray);
        boomer.erase(ctx);
      } 
    })
  })
}

function bulletMushroomHitCount(boomer, boomerIndex, boomerArray) {
  boomer.hitCount++;
  if (boomer.hitCount > 2) {
    boomerArray.splice(boomerIndex, 1);
    boomer.erase(ctx);
  }
}

function characterMushroomCollision() {
  mushroomArray.forEach((boomer) => {
    if (boomer.x + boomer.width  >= character.x + character.vx
      && boomer.x < character.x + character.vx 
      && boomer.y  < character.y + character.height
      && character.y < boomer.y + boomer.height) {
      character.erase(ctx);
      character.x += character.vx;
    } else if (boomer.x + boomer.width  > character.x + character.width
      && boomer.x <= character.x + character.width
      && boomer.y + boomer.height > character.y
      && character.y + character.height > boomer.y) {
      character.erase(ctx);
      character.x -= character.vx;
    } else if (character.y + character.vy <= boomer.y + boomer.height
      && character.y > boomer.y
      && character.x > boomer.x
      && character.x + character.width < boomer.x + boomer.width) {
      character.erase(ctx);
      character.y -= character.vy;
    }
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
        createExplosion(new ExplosionSpider(spidey.x, spidey.y));
        spidey.erase(ctx);
        spideyArray.pop();
        character.score += 10;
      }
    })
  })
} 

function characterCentipedeCollision() {
  let verify;

  verify = centipedeArray.reduce((boolean, segment) => {
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
  let verify;

  verify = spiderArray.reduce((boolean, spidey) => {
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

function moveUp(e) {
  if (
    e.keyCode == '38' && character.y - character.vy > 400) {
    e.preventDefault();
    character.erase(ctx).moveUp().moveGun()
  }  
}

function moveLeft(e) {
  if (e.keyCode == '37' 
    && character.x + character.vx > 0) {
    e.preventDefault();
    character.erase(ctx).moveLeft().moveGun()
  }  
}

function moveRight(e) {
  if (e.keyCode == '39' 
    && character.x + character.vx + character.width < 1000) {
    e.preventDefault();
    character.erase(ctx).moveRight().moveGun(); 
  }  
}

function moveDown(e) {
  if (e.keyCode == '40' && character.y + character.vy < 600) {
    e.preventDefault();
    character.erase(ctx).moveDown().moveGun();
  } 
}

function shoot(e) {
  if (e.keyCode == '32' && bulletsArray.length < 1) {
    e.preventDefault();
    let bullet = new Bullet(character.gunX, character.gunY);

    bullet.draw(ctx);
    bulletsArray.push(bullet);
  }
}

function pauseGame(e) {
  if (e.keyCode == '80' && overrideDefault === false) {
    e.preventDefault();
    gamePause = !gamePause;
    gameLoop();
  }
}

function nextLevelCheat(e) {
  if (e.keyCode == '49') {
    e.preventDefault();
    centipedeArray = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function animateCentipede() {
  centipedeArray.forEach((segment) => {
    segment.erase(ctx).move().draw(ctx);
  })
}

function generateSpider () {
  let number = Math.floor(Math.random() * 350);
  
  if (number === 15 && spiderArray.length === 0) {
    let spider = new Spider();

    spiderArray.push(spider);
  }
}

function animateSpider() {
  if (spiderArray.length === 1) {
    spiderArray[0].erase(ctx).move().draw(ctx);
  }
}

function animateBullet() {
  bulletsArray.forEach((bullet, index, array) => {
    bullet.erase(ctx).move().draw(ctx);
    if (bullet.y < 5) {
      bullet.erase(ctx);
      array.splice(index, 1)
    }
  })
}

function animateExplosions (ctx) {
  explosionArray.forEach((explosion, index, array) => {
    explosion.erase(ctx).move().draw(ctx);
    if (explosion.radius > 40) {
      explosion.erase(ctx);
      array.splice(index, 1);
    }
  })
}

function createExplosion (type) {
  let boom = type

  boom.draw(ctx);
  explosionArray.push(boom);
}

function addSingleCentipedes() {
  if (character.level > 1) {
    for (let i = 1; i < character.level; i++) {
      let segment = new Centipede( 
        -10,
        (Math.floor(Math.random() * 97) + 3) * 10);

      segment.hasHead = true;
      centipedeArray.push(segment);
    }
  }
}

function startNewLevel() {
  centipedeArray = [];
  createCentipedeHead();
  addSingleCentipedes();
  activateCentipede();
  levelUpScreen.classList.toggle('hidden');
}

function retrieveScoreFromStorage () {
  let retrievedScore = localStorage.getItem(localStorage.key(0));

  let parsedHighScore = JSON.parse(retrievedScore);

  return parsedHighScore;
}

function storeNewHighScore (name, score) {
  let newHighScore = new HighScore(name, score);

  let stringedHighScore = JSON.stringify(newHighScore);

  localStorage.setItem(newHighScore.id, stringedHighScore);
}

function createInitialHighScore() {
  if (localStorage.length === 0) {
    let initialHighScore = new HighScore('initial', character.score);

    let stringedHighScore = JSON.stringify(initialHighScore);

    localStorage.setItem(initialHighScore.id, stringedHighScore);
  }
}

function collectUserInfo () {
  let oldHighScore = retrieveScoreFromStorage();

  localStorage.removeItem(oldHighScore.id);
  let name = document.querySelector('#name').value;

  storeNewHighScore(name, character.score);
  newHighScoreScreen.classList.toggle('hidden');
  startScreen.classList.toggle('hidden');
  gameBoard.classList.toggle('hidden');
}

function closeHighScoreScreen() {
  highScoreScreen.classList.toggle('hidden');
  startScreen.classList.toggle('hidden');
}

function showHighScoreScreenFromStart () {
  startScreen.classList.toggle('hidden');
  let highScore = retrieveScoreFromStorage();

  document.querySelector('.high-score-name').innerText = highScore.name;
  document.querySelector('.high-score-value').innerText = highScore.score;
  highScoreScreen.classList.toggle('hidden');
}

function createCentipedeHead() {
  let segment = new Centipede(-10)

  centipedeArray.push(segment)
  centipedeArray[0].hasHead = true; 
}

function resetGameValues() {
  centipedeArray = [];
  mushroomArray = [];
  character.score = 0;
  character.level = 1;
  character.lives = 3;
}
