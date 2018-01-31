class HighScore {
  constructor (name, score) {
    this.id = Date.now();
    this.name = name;
    this.score = score;
  }
}

module.exports = HighScore;