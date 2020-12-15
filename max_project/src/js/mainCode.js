"use strict";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "40px times new roman";
canvas.width = 800;
canvas.height = 500;
const background = new Image(); // image for the background
const bg = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
background.src = " public/images/bg.png";

/* All the audio made for the game */

const gameWinSound = new Audio();
gameWinSound.src = "public/sounds/success.mp3";
const hitAudio = new Audio(); // sound for when the birdfalls
hitAudio.src = "public/sounds/hit.mp3";
const flyAudio = new Audio(); //wings flapping
flyAudio.src = "public/sounds/wing.mp3";
const ringPoint = new Audio(); // sound for points
ringPoint.src = "public/sounds/point.mp3";
const bgMusic = new Audio("public/sounds/song.mp3"); // music
bgMusic.muted = true;
bgMusic.loop = true;

const bangCollision = new Image();
bangCollision.src = "public/images/bang3.png";
const gameOverPic = new Image();
gameOverPic.src = "public/images/gameOver.png";
const pauseImage = new Image();
pauseImage.src = "public/images/pause_pic.png";
const gameOverBg = new Image();
gameOverBg.src = "public/images/maxbg.png";

let pauseB = document.getElementById("pause-btn"); // element  to pause the game
pauseB = false;

let gameTrigger = false; // space button to move the player bird
let birdHeight = 0; //height of the bird in the canvas
let score = 0; // score after each pipe
let frame = 0;
let gameSpeed = 2.5; // speed of the scrolling from the left
//let startingPosition = (canvas.height-90);

// Element needed to get pause screen
document.getElementById("pause-btn").addEventListener("click", function () {
  /*function to pause the game*/ //console.log("test");
  pauseB = !pauseB; // toggle boolean
  console.log(pauseB);
  if (!pauseB) {
    animate(); // we use the animate function to return to the game once the boolean is false
  }
});

// Event listener to make sur we can pause the game easily with a boolean

function pauseScreen() {
  ctx.drawImage(pauseImage, 290, 200, canvas.width / 3, canvas.height / 4);
  ctx.font = "40px times new roman";
  ctx.fillStyle = "black";
  ctx.textBaseline = "middle"; //put the text in the center of the screen
  ctx.textAlign = "center";
  ctx.fillText(
    " Current score is:" + score,
    canvas.width / 2,
    canvas.height / 2 + 80
  );
}

/*        Function to make the background scrollto the left                 */

function backgroundScrolling() {
  // this makes the background scroll
  if (bg.x1 <= -bg.width + gameSpeed) {
    bg.x1 = bg.width;
  } // we add gamespeed to offset the white lines as much as we can
  else {
    bg.x1 -= gameSpeed;
  }
  if (bg.x2 <= -bg.width + gameSpeed) {
    bg.x2 = bg.width;
  } else {
    bg.x2 -= gameSpeed;
  }

  ctx.drawImage(background, bg.x1, bg.y, canvas.width + 1, canvas.height);
  ctx.drawImage(background, bg.x2, bg.y, canvas.width + 1, canvas.height);
}

/* Collision detection for the bird and the pipes */
function testCrashFloor() {
  if (newPlayer.y + newPlayer.height >= canvas.height) {
    console.log(`Floor  hit at x${newPlayer.x} y${newPlayer.y}]`);

    return true;
  }
  return false;
}
function testCrashBottomPipe(onePipe) {
  if (onePipe.x < newPlayer.x) return false;
  if (onePipe.x > newPlayer.x + newPlayer.width) return false;
  if (newPlayer.y + newPlayer.height >= onePipe.bottomCollision) {
    return true;
  }
  return false;
}
function testCrashTopPipe(onePipe) {
  if (onePipe.x < newPlayer.x) return false;
  if (onePipe.x >= newPlayer.x + newPlayer.width) return false;
  if (newPlayer.y <= onePipe.topCollision) {
    return true;
  }

  return false;
}

function testCrash() {
  var birdHit = false;

  if (testCrashFloor()) {
    birdHit = true;
  }

  pipesArray.forEach((element) => {
    // check collision bot
    if (testCrashBottomPipe(element)) {
      birdHit = true;
    }
    // check collision top
    if (testCrashTopPipe(element)) {
      birdHit = true;
    }
  });
  return birdHit;
}

function checkBirdHit() {
  if (testCrash()) {
    newPlayer.birdIsAlive = false;

    hitAudio.play();

    ctx.drawImage(
      bangCollision,
      newPlayer.x,
      newPlayer.y,
      newPlayer.width * 1.45,
      newPlayer.height * 1.3
    );
  }
}

// draw the score on the canvas
function drawScore() {
  ctx.font = "25px times new roman";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 50, 40);
}

function gameOver() {
  ctx.drawImage(gameOverPic, 290, 200, canvas.width / 3, canvas.height / 4); // draw the gameover sign in the middle
  ctx.font = "40px times new roman";
  ctx.textBaseline = "middle"; //put the text in the center of the screen
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.drawImage(gameOverBg, canvas.width / 4, canvas.height / 2 + 80, 500, 49);
  ctx.fillStyle = "white";

  if (newPlayer.won) {
    ctx.fillText(
      "GAGNÉ votre score est " + score,
      canvas.width / 2,
      canvas.height / 2 + 110
    );
  } else {
    ctx.fillText(
      "Perdu ! Votre score est " + score,
      canvas.width / 2,
      canvas.height / 2 + 110
    );
  }
}

/* If game is won(+15points) then this will execute */
function showReward() {
  var unlockReward = document.getElementById("unlockCv"); //final reward/countdown
  /* Declaration of all the images hidden */
  var unlockImages1 = document.getElementById("locked_images1");
  var unlockImages2 = document.getElementById("locked_images2");
  var unlockImages3 = document.getElementById("locked_images3");
  var unlockImages4 = document.getElementById("locked_images4");
  var unlockImages5 = document.getElementById("locked_images5");
  var unlockImages6 = document.getElementById("locked_images6");

  if (score == 3) {
    unlockImages1.style.display = "inline-block";
    pipeSpawn = 180;
    ringPoint.play();
  }
  if (score == 5) {
    unlockImages2.style.display = "inline-block";
    ringPoint.play();
  }
  if (score == 7) {
    pipeSpawn = 130;
    unlockImages3.style.display = "inline-block";
    ringPoint.play();
  }
  if (score == 9) {
    unlockImages4.style.display = "inline-block";
    ringPoint.play();
  }
  if (score == 11) {
    pipeSpawn = 80;
    unlockImages5.style.display = "inline-block";
    ringPoint.play();
  }
  if (score == 13) {
    unlockImages6.style.display = "inline-block";
    ringPoint.play();
  }
  if (score == 30) {
    newPlayer.won = true;
    pipeSpawn = 45;
    window.document.getElementById("winscreen").style.display = "block";
    unlockReward.style.display = "Block";
    gameWinSound.play(); // game winning sound after getting 15
    document.querySelector("h2").innerHTML =
      "Bravo vous avez gagné!!! Cliquez sur le cadenas pour acceder à mon CV";
    playerWon = true;
    pauseScreen();
  }
}
showReward();

//make icons appear after a certain score

/*Main function needed to animate the game  */

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //(x,y, dx, dy)
  //ctx.fillRect(20, startingPosition, 60, 60);
  backgroundScrolling();

  newPlayer.falling();
  newPlayer.draw();
  createPipes();

  if (pauseB) {
    pauseScreen();
    return;
  }
  //testC
  checkBirdHit();
  drawScore();
  showReward();

  frame++;

  birdHeight += 1;
  if (newPlayer.birdIsAlive === false) {
    gameOver();
    return;
  } else requestAnimationFrame(animate);
}
bgMusic.muted = false;
bgMusic.play();
animate();

/*Event listeners for the controls  */
window.addEventListener("keydown", function (e) {
  //check for w enter and arrowUp
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
    case "Space":
    case "Enter":
      gameTrigger = true; //startingPosition-=20;
      flyAudio.play();
      break;
  }
  //unbind space and use space to fly
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});
window.addEventListener("keyup", function (e) {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
    case "Space":
    case "Enter":
      gameTrigger = false; //startingPosition+=20;
      break;
  }
});
