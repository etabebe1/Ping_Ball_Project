const INITIAL_VELOCITY = .04;
const VELOCITY_INCREASE = 0.0001;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }

/* STEP #1 */
  //GETTERS and SETTERS are used to Get the propertyValue of css element and Set the value by property on the update()-- function we find bellow.
  get x_axis() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x-axis")
    );
  }
  set x_axis(value) {
    this.ballElement.style.setProperty("--x-axis", value);
  }
  get y_axis() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y-axis")
    );
  }
  set y_axis(value) {
    this.ballElement.style.setProperty("--y-axis", value);
  }

/* STEP #2 */
  //reset function -- used for random and initial start direction determination of the ball
  reset() {
    //Initial point of the ball for both x and y
    this.x_axis = 50;
    this.y_axis = 50;

    //Setting the initial direction for the ball
    this.direction = { x_axis: 0 };
    //Creating a value for X & Y --> which would be inserted to set x_axis --> (value)||y_axis --> (value)  on the above setter value
    while (
      Math.abs(this.direction.x_axis) <= 0.2 ||
      Math.abs(this.direction.x_axis) >= 0.9
    ) {
      // bellow the randomNumberBetween() -->is a function
      const headingDirection = randomNumberBetween(0, 2 * Math.PI);
      this.direction = {
        x_axis: Math.cos(headingDirection),
        y_axis: Math.sin(headingDirection),
      };
    }
    this.velocity = INITIAL_VELOCITY;
    // console.log(this.direction);
  }


  /* STEP #3 */
  //Bellow rectangle() method is used to reflect the ball as it hits the top || bottom side
  rect() {
    //getBoundingClientRect() ==> by default, it is instruction/method of getting property of an element in a class
    return this.ballElement.getBoundingClientRect();
  }

  /* USED TO WORK WITH EACH STEP SIDE BY SIDE */
  update(delta, paddleRectangles) {
    //Updating the velocity and direction of our ball on the reset() --> method
    this.x_axis += this.direction.x_axis * this.velocity* delta;
    this.y_axis += this.direction.y_axis * this.velocity* delta;

    //Updating the VELOCITY by incrementing number
    this.velocity += VELOCITY_INCREASE * delta;

    //Updating the direction of the ball as it bounces on the paddles for x-component && on the wall for y-component
    const rectangle = this.rect();
    if (rectangle.bottom >= window.innerHeight || rectangle.top <= 0) {
      this.direction.y_axis *= -1;
    }
    if (
      paddleRectangles.some((rectangles) => isCollided(rectangles, rectangle))
    ) {
      this.direction.x_axis *= -1;
    }
  }
}

//Here defining randomNumberBetween function we used in the Ball Class ---> reset() method

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

//Here defining isCollided(rectangle, rect) function-- this function passes our rect() -- we created in script document-- update()--function and our ball element

function isCollided(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
