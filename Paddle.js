const SPEED = 0.009;

export default class Paddle {
  constructor(paddleElement) {
    this.paddleElement = paddleElement;
    this.reset();
  }

  //Here we use a getter and setter to get() and set() our paddle position of player

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElement).getPropertyValue("--position")
    );
  }
  set position(value) {
    this.paddleElement.style.setProperty("--position", value);
  }
  //creating rect()-- function to pass it to the Ball class in Ball Script
  rect() {
    return this.paddleElement.getBoundingClientRect()
  }

  //Here we update the position of the AI/ computer paddle to follow the y component of the ball ==> Notice; if the ball is above our current position paddle move upward || if the ball is bellow current position paddle move downward
  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }

  //Creating the reset() function when the game is over
  reset() {
    this.position = 50;
  }
}
