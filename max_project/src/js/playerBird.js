"use strict";
const birdy = new Image();
birdy.src = "public/images/birdy.png";
class Player {
  constructor() {
    this.x = 60; // x axis of player
    this.y = 100; //y axis of player
    this.gravity = 0; //velocity of player falling
    this.poids = 1; // weight of player which affects falling
    this.originalWidth = 261; //10 birds divided to one frame
    this.birdAnimation = 1; // start of the animation of the birdy png
    this.originalHeight = 148; //original height of the bird we will have to scale it down in the next line
    this.width = this.originalWidth / 4; //  width of bird scaled to fit the box
    this.height = this.originalHeight / 3; // height of bird scaled as well to fit the box
    this.birdIsAlive = true;
    this.angle = 0;
    this.won = false;
  }

  falling() {
    //  gravity of the bird falling we need a condition to make sure it doesn't fall through the floor
    if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height; // this makes the bird hit the ground and shake
      this.gravity = 0; // this makes it so the bird just stops falling
    } else {
      this.poids = Math.sin(this.angle) * 0.15;
      if (gameTrigger) {
        this.jump();
      }
      this.gravity += this.poids + 0.5;
      this.y += this.gravity;
      this.gravity *= 0.9; // player flappy effect
    }

    if (this.y < 0 + this.height) {
      this.y = this.height;
      //this.gravity=0;
    }
    this.angle += 0.01;
  }
  draw() {
    // drawing the bird
    ctx.fillStyle = "#0000FFDD";

    ctx.drawImage(
      birdy,
      this.birdAnimation * this.originalWidth,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x - 12, //we add or remove to better fit the hitbox
      this.y - 6,
      this.width * 1.45, // to fill the hit box we multiply the height and width

      this.height * 1.3
    ); // draw the image of the bird*/
    // ctx.fillRect(this.x, this.y, this.width, this.height);// rectangle for the hit box
  }
  jump() {
    // making the bird jump with spacebar
    this.poids -= 1.5;
    if (this.birdAnimation >= 9) {
      this.birdAnimation = 1;
    } // this is the loop for the animation of the flappy bird adds 1 frame until 9 then it loops back again

    this.birdAnimation++;
  }
}

const newPlayer = new Player();
