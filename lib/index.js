const Mushroom = require('./Mushroom.js');


const canvas = document.getElementById('game');
const ctx =  canvas.getContext('2d');


canvas.addEventListener('click', drawBlock);


function drawBlock(){
  for(let i = 0; i < 21; i++) {
    let mushroom = new Mushroom();
    mushroom.draw(ctx);
  }
}