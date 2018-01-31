const { assert } = require('chai');
const Mushroom = require('../lib/Mushroom.js');
const Centipede = require('../lib/Centipede.js');
const Character = require('../lib/Character.js');
const Bullet = require('../lib/Bullet.js');
const Spider = require('../lib/Spider.js');
const ExplosionMushroom = require('../lib/Explosion-Mushroom.js')
const ExplosionCentipede = require('../lib/Explosion-Centipede.js')
const ExplosionSpider = require('../lib/Explosion-Spider.js')
const HighScore = require('../lib/HighScore.js')

// drawBlock

describe('draw block', function() {
  it('should fill the mushroom array', function() {
    function drawBlock() {
      for (let i = 0; i < 12; i++) {
      let mushroom = new Mushroom();

      mushroomArray.push(mushroom);
  }
}
    let mushroomArray = [];

    assert.equal(mushroomArray.length, 0);

    drawBlock();

    assert.equal(mushroomArray.length, 12);
  })
})

// activateCentipede
let centipedeArray = [];

function activateCentipede() {
  var increment = -30;

  for (let i = 0; i < 9; i++) {
    let centipede = new Centipede(300 + increment);

    increment -= 30;
    centipedeArray.push(centipede);
  }
}

describe('activate Centipede', function () {
  it('should fill the centipede array', function() {
    assert.equal(centipedeArray.length, 0);
    activateCentipede();
    assert.equal(centipedeArray.length, 9)
  });

  it('should create a centipede array with y coordinates decrementing by 30', function () {
    assert.equal(centipedeArray.length, 9);
    assert.equal(centipedeArray[0].y, 270)
    assert.equal(centipedeArray[8].y, 30);
  })

});

// retryLevel
let lives = 3;
let spiderArray = [1,2,3];

function retryLevel () {
  lives--;
  centipedeArray = [];
  spiderArray = [];
}

describe('retry level', function () {

  it('should decrement lives', function() {
    assert.equal(lives, 3);
    retryLevel()
    assert.equal(lives, 2);
  })

  it('should clear the centipede array', function () {
    activateCentipede();
    assert.isAbove(centipedeArray.length, 0, 'The centipede has segments');
    retryLevel();
    assert.equal(centipedeArray.length, 0);
  });

  it('should clear the spider array', function() {
    for (let i = 0; i < 4; i++) {
      let newSpider = new Spider();
      spiderArray.push(newSpider)
    }
    
    assert.isAbove(spiderArray.length, 0, 'The spider array has spiders');
    retryLevel();
    assert.equal(spiderArray.length, 0);
  })

})

//resetCharacterPosition
let character = new Character();

function resetCharacterPosition () {
  character.x = 480;
  character.gunX = character.x - 7;
  character.gunY = character.y - 10;
}

describe('reset character position function', function(){
  it('should move the character to a set position', function() {
    assert.equal(character.x, 500);
    assert.equal(character.gunX, 493);
    resetCharacterPosition();
    assert.equal(character.x, 480);
    assert.equal(character.gunX, 473);

  })
})

//levelUp

let level = 1;
let score = 0;

function levelUp () {
  level++;
  lives++;
  score += 50;
}

describe('level up function', function() {
  it('should increment level', function() {
    assert.equal(level, 1);
    levelUp();
    assert.equal(level, 2);
  })

  it('should increment lives', function () {
    assert.equal(lives, 1);
    levelUp();
    assert.equal(lives, 2)
  })

  it('should increment score', function() {
    assert.equal(score, 100);
    levelUp()
    assert.equal(score, 150);
  })
})

//COLLISION DETECTION

//Centipede Mushroom Collision

let mushroomArray = [];

function centipedeMushroomCollision() {
  centipedeArray.forEach(segment => {
    mushroomArray.forEach(boomer => {
      if ((boomer.x <= segment.x + segment.radius 
        && boomer.x + boomer.width >= segment.x - segment.radius) 
        && (segment.y + segment.radius >= boomer.y 
        && segment.y - segment.radius <= boomer.y + boomer.height)) {
        segment.y += segment.radius * 2 + segment.radius / 2;
        segment.eyeY += segment.radius * 2 + segment.radius / 2;
        segment.vx = -segment.vx;
        segment.eyeX += segment.vx;
      }
    })
  })
}

describe('centipede mushroom collision', function() {
  it('should change the x velocity of a centipede and y coordinate', function() {
    centipedeArray.push(new Centipede(400, 400));
    mushroomArray.push(new Mushroom(400,400))
    centipedeArray[0].vx = 5;
    assert.equal(centipedeArray[0].y, 400)
    assert.equal(centipedeArray[0].vx, 5);
    centipedeMushroomCollision();
    assert.equal(centipedeArray[0].y, 437.5)
    assert.equal(centipedeArray[0].vx, -5);

  })
})

// bullet centipide collision

let bulletsArray = [];
let explosionArray = [];

function bulletCentipedeCollision() {
  centipedeArray.forEach((segment, segmentIndex, segmentArray) => {
    bulletsArray.forEach((bullet, bulletIndex, bulletArray)  => {
      if ((bullet.x <= segment.x + segment.radius 
        && bullet.x + bullet.width >= segment.x - segment.radius) 
        && (segment.y + segment.radius >= bullet.y 
        && segment.y - segment.radius <= bullet.y + bullet.height)) {
        bulletArray.splice(bulletIndex, 1);
        createExplosion(new ExplosionCentipede(segment.x, segment.y));
        createHeadForNewCentipede(segmentIndex, segmentArray);
        createNewMushroom(segment);
        segmentArray.splice(segmentIndex, 1);
        score++;
      }
    })
  })
} 

describe('bullet centipede collision', function() {
  it('should splice the bullet out of the bullet array', function() {
    bulletsArray.push(new Bullet(400, 435))
    assert.equal(bulletsArray.length, 1);
    bulletCentipedeCollision();
    assert.equal(bulletsArray.length, 0);    
  })

  it('should create a new explosion', function() {
    explosionArray = [];
    centipedeArray.push(new Centipede(437, 400))
    bulletsArray.push(new Bullet(400, 435))
    assert.equal(explosionArray.length, 0);
    bulletCentipedeCollision()
    assert.equal(explosionArray.length, 1);
  })

  it('create a mushroom', function() {
    mushroomArray = [];
    assert.equal(mushroomArray.length, 0);
    centipedeArray.push(new Centipede(437, 400))
    bulletsArray.push(new Bullet(400, 435))
    bulletCentipedeCollision();
    assert.equal(mushroomArray.length, 1);
  })

  it('should remove the centipede segment', function() {
    centipedeArray.push(new Centipede(437, 400))
    assert.equal(centipedeArray.length, 1);
    bulletsArray.push(new Bullet(400, 435))
    bulletCentipedeCollision();
    assert.equal(centipedeArray.length, 0);
  })

  it('should increment score by one', function() {
    score = 0;
    assert.equal(score, 0);
    centipedeArray.push(new Centipede(437, 400))
    bulletsArray.push(new Bullet(400, 435))
    bulletCentipedeCollision();
    assert.equal(score, 1);
  })


})

// bullet mushroom collision

function bulletMushroomCollision() {
  mushroomArray.forEach((boomer, boomerIndex, boomerArray) => {
    bulletsArray.forEach((bullet, bulletIndex, bulletArray)  => {
      if ((bullet.x <= boomer.x + boomer.width 
        && bullet.x + bullet.width >= boomer.x) 
        && (boomer.y + boomer.height >= bullet.y 
        && boomer.y <= bullet.y + bullet.height)) {
        bulletArray.splice(bulletIndex, 1);
        createExplosion(new ExplosionMushroom(boomer.x - boomer.width / 2, boomer.y - boomer.height / 2));
        bulletMushroomHitCount(boomer, boomerIndex, boomerArray);
      } 
    })
  })
}

describe('bullet mushroom collision', function() {
  it('should remove the bullet from the array', function() {
    let bullet = new Bullet(400,400)
    mushroomArray.push(new Mushroom(400,400))
    bulletsArray.push(bullet);
    assert.equal(bulletsArray.length, 1)
    bulletMushroomCollision();
    assert.equal(bulletsArray.length, 0);
  });

  it('should create a new explosion', function() {
    explosionArray = [];
    let bullet = new Bullet(400,400)
    bulletsArray.push(bullet);
    assert.equal(explosionArray.length, 0);
    bulletMushroomCollision();
    assert.equal(explosionArray.length, 1);
  })

  it('should increase hit count of mushroom', function() {
    let bullet = new Bullet(400,400)
    mushroomArray[mushroomArray.length -1].hitCount = 0;
    bulletsArray.push(bullet);
    assert.equal(mushroomArray[mushroomArray.length -1].hitCount, 0)
    bulletMushroomCollision();
    assert.equal(mushroomArray[mushroomArray.length -1].hitCount, 1)
  })
});

  // character mushroom collision

  function characterMushroomCollision() {
  mushroomArray.forEach((boomer) => {
    if (boomer.x + boomer.width  >= character.x + character.vx
      && boomer.x < character.x + character.vx 
      && boomer.y  < character.y + character.height
      && character.y < boomer.y + boomer.height) {
      character.x += character.vx;
    } else if (boomer.x + boomer.width  > character.x + character.width
      && boomer.x <= character.x + character.width
      && boomer.y + boomer.height > character.y
      && character.y + character.height > boomer.y) {
      character.x -= character.vx;
    } else if (character.y + character.vy <= boomer.y + boomer.height
      && character.y > boomer.y
      && character.x > boomer.x
      && character.x + character.width < boomer.x + boomer.width) {
      character.y -= character.vy;
    }
  })
} 

describe('character mushroom collision', function() {
  it('should prevent the character from moving into the mushroom from the right', function() {
    mushroomArray.push(new Mushroom(485, 515));
    assert.equal(character.x, 480)
    characterMushroomCollision();
    assert.equal(character.x, 500);
  })

  it('should prevent the character from moving into the mushroom from the left', function() {
    mushroomArray.push(new Mushroom(520, 515));
    assert.equal(character.x, 500)
    characterMushroomCollision();
    assert.equal(character.x, 480);
  })

  it.skip('should prevent the character from moving into the mushroom from the bottom', function() {
    mushroomArray.push(new Mushroom(510, 490));
    assert.equal(character.y, 510)
    console.log(character.x)
    characterMushroomCollision();
    console.log(character.x)
    assert.equal(character.y, 410);
  })
})

// bullet spider collision

function bulletSpiderCollision() {
  spiderArray.forEach((spidey, spideyIndex, spideyArray) => {
    bulletsArray.forEach((bullet, bulletIndex, bulletArray)  => {
      if ((bullet.x <= spidey.x + spidey.radius 
        && bullet.x + bullet.width >= spidey.x - spidey.radius) 
        && (spidey.y + spidey.radius >= bullet.y 
        && spidey.y - spidey.radius <= bullet.y + bullet.height)) {
        bulletArray.splice(bulletIndex, 1);
        createExplosion(new ExplosionSpider(spidey.x, spidey.y));
        spideyArray.pop();
        score += 10;
      }
    })
  })
} 

describe('bullet spider collision', function() {

  it('should remove the bullet from the bullet array', function () {
    bulletsArray.push(new Bullet(400,400));
    spiderArray.push(new Spider(400,395));
    assert.equal(bulletsArray.length, 1);
    bulletSpiderCollision();
    assert.equal(bulletsArray.length, 0);
  })

  it('should create a new explosion', function() {
    explosionArray = []
    bulletsArray.push(new Bullet(400,400));
    spiderArray.push(new Spider(400,395));
    assert.equal(explosionArray.length, 0);
    bulletSpiderCollision();
    assert.equal(explosionArray.length, 1);
  })

  it('should remove the spider from the spiderArray', function() {
    bulletsArray.push(new Bullet(400,400));
    spiderArray.push(new Spider(400,395));
    assert.equal(spiderArray.length, 1);
    bulletSpiderCollision();
    assert.equal(spiderArray.length, 0);
  })

  it('should increment the score by 10', function() {
    score = 0;
    bulletsArray.push(new Bullet(400,400));
    spiderArray.push(new Spider(400,395));
    assert.equal(score, 0);
    bulletSpiderCollision();
    assert.equal(score, 10);
  })
})



// character centipede collision

function characterCentipedeCollision() {
  let verify = centipedeArray.reduce((boolean, segment) => {
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

describe('character Centipede collision', function() {
  it('should return true if their is a collision', function() {
    centipedeArray.push(new Centipede(510,480));
    assert.equal(character.x, 480);
    assert.equal(character.y, 510);
    assert.equal(centipedeArray[0].x, 480);
    assert.equal(centipedeArray[0].y, 510);
    let verifyCollision = characterCentipedeCollision();
    assert.equal(verifyCollision, true);
  })

  it('should return false if their is no collision', function() {
    centipedeArray = [];
    centipedeArray.push(new Centipede(600,600));
    assert.equal(character.x, 480);
    assert.equal(character.y, 510);
    assert.equal(centipedeArray[0].x, 600);
    assert.equal(centipedeArray[0].y, 600);
    let verifyCollision = characterCentipedeCollision();
    assert.equal(verifyCollision, false);
  })
})


// character spider collision

function characterSpiderCollision() {
  let verify = spiderArray.reduce((boolean, spidey) => {
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


//END COLLISION DETECTION;

// GAME CONTROLS

let gamePause = false;
let overrideDefault = false;

//move up
function moveUp(keycode) {
  if (keycode == '38' && character.y - character.vy > 400 && gamePause === false) {
    character.y -= character.vy;
    character.move()
  }  
}

describe('move character up', function() {
  it('should move the character up 95px', function() {
    character.y = 500;
    assert.equal(character.y, 500);
    moveUp(38);
    assert.equal(character.y, 405);
  })
  it('should not move the character higher than 400px', function() {
    character.y = 450;
    assert.equal(character.y, 450);
    moveUp(38);
    assert.equal(character.y, 450);
  })
})

//move left
function moveLeft(keycode) {
  if (keycode == '37' 
    && character.x + character.vx > 0 && gamePause === false) {
    character.x -= character.vx;
    character.move()
  }  
}

describe('move character left', function() {
  it('should move the character left by 20px', function() {
    character.x = 300;
    assert.equal(character.x, 300);
    moveLeft(37);
    assert.equal(character.x, 280);
  })
  it('should not move the character off the screen', function() {
    character.x = 10;
    character.vx = -20;
    assert.equal(character.x, 10);
    moveLeft(37);
    assert.equal(character.x, 10);
  })
})

//move right
function moveRight(keycode) {
  if (keycode == '39' 
    && character.x + character.vx + character.width < 1000 && gamePause === false) {
    character.x += character.vx;
    character.move()
  }  
}

describe('move character right', function() {
  it('should move the character right by 20px', function() {
    character.x = 300;
    character.vx = 20;
    assert.equal(character.x, 300);
    moveRight(39);
    assert.equal(character.x, 320);
  })
  it('should should not move the character off the screen', function() {
    character.x = 990;
    assert.equal(character.x, 990);
    moveRight(39);
    assert.equal(character.x, 990);
  })
})

//move down
function moveDown(keycode) {
  if (keycode == '40' && character.y + character.vy < 600 && gamePause === false) {
    character.y += character.vy;
    character.move()
  } 
}

describe('move character down', function() {
  it('should move the character down by 95px', function() {
    character.y = 400;
    assert.equal(character.y, 400);
    moveDown(40);
    assert.equal(character.y, 495);
  })
  it('should not move the character below the screen', function() {
    character.y = 510;
    assert.equal(character.y, 510);
    moveDown(40);
    assert.equal(character.y, 510);
  })
})

//pause game
function pauseGame(keycode) {
  if (keycode == '80' && overrideDefault === false) {
    gamePause = !gamePause;
  }
}

describe('pause game control', function() {
  it('should change the boolean of gamePause variable', function() {
    assert.equal(gamePause, false);
    pauseGame(80);
    assert.equal(gamePause, true);
    pauseGame(80);
    assert.equal(gamePause, false);
  })
})

//next level cheat
function nextLevelCheat(keycode) {
  if (keycode == '49') {
    centipedeArray = [];
  }
}

describe('next level cheat', function() {
  it('should clear the centipede array', function() {
    centipedeArray = [];
    activateCentipede();
    assert.equal(centipedeArray.length, 9);
    nextLevelCheat(49);
    assert.equal(centipedeArray.length, 0);
  })
})

//shoot
function shoot(keycode) {
  if (keycode == '32' && bulletsArray.length < 1 && gamePause === false) {
    let bullet = new Bullet(character.gunX, character.gunY);

    bulletsArray.push(bullet);
  }
}

describe('shoot function', function(){
  it('should create a new bullet in the bullet array', function() {
    bulletsArray = [];
    assert.equal(gamePause, false);
    assert.equal(bulletsArray.length, 0);
    shoot(32);
    assert.equal(bulletsArray.length, 1);
  })
})



//END CONTROLS

//generate spider
function generateSpider () {
  let number = Math.floor(Math.random() * 350);
  if (number === 15 && spiderArray.length === 0) {
    let spider = new Spider();
    spiderArray.push(spider);
  }
}

describe('generate spider', function(){
  it('should create a new spider', function() {
    assert.equal(spiderArray.length, 0);
    for(let i = 0; i < 4000; i++) {
    generateSpider();
    }
    assert.equal(spiderArray.length, 1);
  })
})

// create explosion
function createExplosion (type) {
  let boom = type

  explosionArray.push(boom);
}

describe('create explosion', function() {
  it('should create a new explosion', function() {
    explosionArray = [];
    assert.equal(explosionArray.length, 0);
    createExplosion(new ExplosionSpider(400,400))
    assert.equal(explosionArray.length, 1);
  })
})

//add a single centipede segment
function addSingleCentipedes() {
  if (level > 1) {
    for (let i = 1; i < level; i++) {
      let segment = new Centipede( -10, (Math.floor(Math.random() * 97) + 3) * 10);

      segment.hasHead = true;
      centipedeArray.push(segment);
    }
  }
}

describe('add single centipede', function() {
  it('should add a centipede segment to centipedeArray', function(){
    level = 2
    centipedeArray = [];
    assert.equal(centipedeArray.length, 0);
    addSingleCentipedes();
    assert.equal(centipedeArray.length, 1);
  })

  it('the segment should be a head segment', function(){
    level = 2
    centipedeArray = [];
    addSingleCentipedes();
    assert.equal(centipedeArray[0].hasHead, true);
  })

  it('should not run on level 1' , function(){
    level = 1
    centipedeArray = [];
    assert.equal(centipedeArray.length, 0)
    addSingleCentipedes();
    assert.equal(centipedeArray.length, 0);
    level++;
    assert.equal(centipedeArray.length, 0)
    addSingleCentipedes();
    assert.equal(centipedeArray.length, 1);
  })
})

//create single centipede head
function createCentipedeHead() {
  let segment = new Centipede(-10)

  centipedeArray.push(segment)
  centipedeArray[0].hasHead = true; 
}

describe('create centipede head', function() {
  it('should create a new segment in centipedeArray', function() {
    centipedeArray = [];
    assert.equal(centipedeArray.length, 0)
    createCentipedeHead();
    assert.equal(centipedeArray.length, 1);
  })

  it('should create a segment with a head', function() {
    centipedeArray = [];
    assert.equal(centipedeArray.length, 0)
    createCentipedeHead();
    assert.equal(centipedeArray[0].hasHead, true);
  })
})

//reset game values
function resetGameValues() {
  centipedeArray = [];
  mushroomArray = [];
  score = 0;
  level = 1;
  lives = 3;
}

describe('resetGameValues', function() {
  it('should reset the centipedeArray', function() {
    centipedeArray = [];
    activateCentipede();
    assert.equal(centipedeArray.length, 9);
    resetGameValues();
    assert.equal(centipedeArray.length, 0);
  })

  it('should reset the mushroomArray', function() {
    mushroomArray = [];
    mushroomArray.push(new Mushroom(400, 400))
    assert.equal(mushroomArray.length, 1);
    resetGameValues();
    assert.equal(mushroomArray.length, 0);
  })

  it('should reset the score', function() {
    score = 5;
    assert.equal(score, 5);
    resetGameValues();
    assert.equal(score, 0);
  })

  it('should reset the level', function() {
    level = 5;
    assert.equal(level, 5);
    resetGameValues();
    assert.equal(level, 1);
  })

  it('should reset the lives', function() {
    lives = 0;
    assert.equal(lives, 0);
    resetGameValues();
    assert.equal(lives, 3);
  })
})

//create new mushroom
function createNewMushroom(segment) {
  if (segment.y > 50) {
    let mushroom = new Mushroom(segment.x - segment.radius, segment.y - segment.radius);

    
    mushroomArray.push(mushroom);
  }  
} 

describe('create new mushroom', function() {
  it('should add a new mushroom to mushroomArray', function() {
    mushroomArray = [];
    assert.equal(mushroomArray.length, 0)
    createNewMushroom(new Centipede(400,400));
    assert.equal(mushroomArray.length, 1)
  })
})

// create head for new centipede
function createHeadForNewCentipede(segmentIndex, segmentArray) {
  if (segmentIndex < segmentArray.length - 1) {
    segmentArray[segmentIndex + 1].hasHead = true;
  }  
}

describe('create head for new centipede', function() {
  it('should add the head to the segment after the position getting hit', function() {
    centipedeArray = [];
    activateCentipede();
    assert.equal(centipedeArray.length, 9);
    assert.equal(centipedeArray[5].hasHead, false);
    createHeadForNewCentipede(4, centipedeArray);
    assert.equal(centipedeArray[5].hasHead, true)
  })
})

// bullet mushroom hit count
function bulletMushroomHitCount(boomer, boomerIndex, boomerArray) {
  boomer.hitCount++;
  if (boomer.hitCount > 2) {
    boomerArray.splice(boomerIndex, 1);
  }
}

describe('bullet mushroom hit count', function() {
  it('should increase the hit count of a mushroom', function() {
    mushroomArray = [];
    mushroomArray.push(new Mushroom(400,400));
    assert.equal(mushroomArray[0].hitCount, 0);
    bulletMushroomHitCount(mushroomArray[0], 0, mushroomArray);
    assert.equal(mushroomArray[0].hitCount, 1);
  })

  it('should remove the mushroom from mushroomArray if hitCount is 3', function() {
    mushroomArray = [];
    mushroomArray.push(new Mushroom(400,400));
    assert.equal(mushroomArray[0].hitCount, 0);
    bulletMushroomHitCount(mushroomArray[0], 0, mushroomArray);
    assert.equal(mushroomArray[0].hitCount, 1);
    bulletMushroomHitCount(mushroomArray[0], 0, mushroomArray);
    assert.equal(mushroomArray[0].hitCount, 2);
    bulletMushroomHitCount(mushroomArray[0], 0, mushroomArray);
    assert.equal(mushroomArray.length, 0)
  })
})