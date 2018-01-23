const Mushroom = require('./Mushroom.js');
const Centipede = require('./Centipede.js')

const canvas = document.getElementById('game');
const ctx =  canvas.getContext('2d');
const centipedeArray = [];

drawBlock();
activateCentipede();
// canvas.addEventListener('click', drawBlock);
// requestAnimationFrame(activateCentipede);

function drawBlock(){
  for(let i = 0; i < 21; i++) {
    let mushroom = new Mushroom();
    mushroom.draw(ctx);
  }
}

function activateCentipede() {
  let centipede = new Centipede();
  centipede.draw(ctx);
  centipedeArray.push(centipede);
  requestAnimationFrame(animateCentipede);
}

function animateCentipede() {
  centipedeArray.forEach(segment => {
    segment.erase(ctx).move().draw(ctx);
  })
  requestAnimationFrame(animateCentipede);
}

