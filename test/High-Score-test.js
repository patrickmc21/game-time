const { assert } = require('chai');
const HighScore = require('../lib/High-Score.js');

describe('HighScore', function() {
  
  it('should have a name', function () {
    let highScore = new HighScore('Jared');
    assert.equal(highScore.name, 'Jared');
  })

  it('should have a score', function () {
    let highScore = new HighScore('Jared', 1000);
    assert.equal(highScore.score, 1000);
  })
})