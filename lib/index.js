const Mushroom = require('./Mushroom.js');
const Centipede = require('./Centipede.js');
const Character = require('./Character.js');
const Bullet = require('./Bullet.js');

const character = new Character();

const canvas = document.getElementById('game');
const ctx =  canvas.getContext('2d');
const centipedeArray = [];
const bulletArray = [];

drawBlock();
character.draw(ctx);
activateCentipede()
animateBullet()

window.addEventListener('keydown', moveCharacter)
window.addEventListener('keydown', shoot)
// canvas.addEventListener('click', drawBlock);
// requestAnimationFrame(activateCentipede);

function drawBlock(){
  for(let i = 0; i < 21; i++) {
    let mushroom = new Mushroom();
    mushroom.draw(ctx);
  }
}

function activateCentipede() {
  setInterval(function() {
    if (centipedeArray.length < 10) {
      let centipede = new Centipede();
      centipede.draw(ctx);
      centipedeArray.push(centipede);
    }}, 65)
  
    requestAnimationFrame(animateCentipede);
}

function animateCentipede() {
  centipedeArray.forEach(segment => {
    segment.erase(ctx).move().draw(ctx);
  })
  requestAnimationFrame(animateCentipede);
}

function moveCharacter(e) {
  if(e.keyCode == '37' && character.x - character.vx > 0) {
    character.erase(ctx);
    character.x -= character.vx;
    character.draw(ctx)
  }
  if(e.keyCode == '39' && character.x + character.vx + character.width < 1000) {
    character.erase(ctx);
    character.x += character.vx;
    character.draw(ctx)
  }
  if(e.keyCode == '38' && character.y - character.vy > 500) {
    character.erase(ctx);
    character.y -= character.vy;
    character.draw(ctx)
  }
  if(e.keyCode == '40' && character.y + character.vy  < 600) {
    character.erase(ctx);
    character.y += character.vy;
    character.draw(ctx)
  } 
}

function shoot(e) {
  if (e.keyCode == '32') {
    let bullet = new Bullet(character.x, character.y - 10);
    bullet.draw(ctx);
    // bulletArray.pop();
    bulletArray.push(bullet);
    console.log(bullet.y)
  }
  if (bulletArray.length > 8){
    bulletArray.shift();
  }
}

function animateBullet() {
  bulletArray.forEach(bullet => {
    bullet.erase(ctx).move().draw(ctx);
  })
  requestAnimationFrame(animateBullet);
}



