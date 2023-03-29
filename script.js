//Importing Ball-Class form the Ball script and Paddle-Class from the Paddle script
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

//Declaring the Ball, Player-Paddle, and Computer-Paddle in-terms of Ball and Paddle class
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

//Grabbing HTML score element for both Player and Computer
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

//Bellow is a function which updates the animation on the window for every fraction of second (Update Loop), Creating --> Infinite Loop
let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y_axis);

    if (isLose()) handleLose();

    //Grabbing the hue propertyValue and settingPropertyValue
    const hueElement = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty(
      "--hue",
      hueElement + delta * 0.01
    );
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

//Adding an event listener for the player paddle

addEventListener("mousemove", (event) => {
  playerPaddle.position = (event.y/ window.innerHeight)* 100;
});

// Defining the isLose()-function in the above update() -- function || the isLose() --> function checks in if either of the player is lost 
function isLose() {
  const rectangle = ball.rect();
  return rectangle.right >= innerWidth || rectangle.left <= 0;
}

//Here defining the handleLose() function --> this function helps us to reset everything to it's previous status/position. Although, the function will increment our score by 1 on the DOM for the opponent who won.

function handleLose() {
  //incrementing the score of the winner
  const rectangle = ball.rect();
  if (rectangle.right >= window.innerWidth) {
    playerScoreElement.textContent =
      parseFloat(playerScoreElement.textContent) + 1;
  } else if (rectangle.left <= 0) {
    computerScoreElement.textContent =
      parseFloat(computerScoreElement.textContent) + 1;
  }

  ball.reset();
  computerPaddle.reset();
}
