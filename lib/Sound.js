class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }
    
  stop (){
    this.sound.pause();
    return this;
  }

  play(){
    this.sound.play();
    return this;
  }   
}

module.exports = Sound;