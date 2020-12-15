"use strict"
const pipesArray = [];

const bPipe = new Image();
bPipe.src = "public/images/botPipe.png";
const tPipe = new Image();
tPipe.src = "public/images/topPipe.png";

;
var icons = new Image();
icons.src = "public/images/bang3.png";
var pipeSpawn = 200;

class Pipes {
  constructor() { 
    this.topPipe = (Math.random() * canvas.height) / 3 + 15; // top of the screen
    this.bottomPipe += 15;
    this.topCollision=  250-this.topPipe;// collision for the top pipe 
    this.bottomPipe = (Math.random() * canvas.height) / 3 + 15; // bottom of the screen
    this.bottomPipe -= 15;
    this.bottomCollision= canvas.height - this.bottomPipe;

    this.x = canvas.width;
    this.width = 93;
    this.height = 250;
    this.keepScore = false; // we use this to augment the score in the update method
  }
  draw() {
    
    
     ctx.drawImage(tPipe, this.x, -this.topPipe, this.width, this.height);// drawing the top pipe

     ctx.drawImage(          //drawing the bottom pipe
       bPipe,
       this.x,
       canvas.height - this.bottomPipe,
       this.width,
       this.height
     );
    /* ctx.fillStyle="#ff000099";
     ctx.fillRect(this.x, -this.topPipe, this.width, this.height);
     ctx.fillRect(this.x, canvas.height - this.bottomPipe, this.width, this.height);*/

  }

  update() {
    this.x -= gameSpeed;
    this.draw();
    if (!this.keepScore && this.x < newPlayer.x) {
      // this tells the score at the end with the conditions to pass the pipes which adds on
      score++;
      this.keepScore = true;
    }
  }
}
function createPipes() {
  if (frame % pipeSpawn === 0) {
    pipesArray.push(new Pipes()); // this adds a new pipe to the array with the constructor every 80 frames
  }
  for (let i = 0; i < pipesArray.length; i++) {
    pipesArray[i].update(); // for loop to make a new pipe in the array
  }
  if (pipesArray.length > 100) {
    pipesArray.pop(pipesArray[0]);//if the pipes reaches 100 then the last pipe will be taken out
  }
}
