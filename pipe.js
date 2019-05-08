class Pipe {

  constructor() {
    this.gap = 70;
    this.width = 50;
    this.height = h / 2;
    this.top = 0;
    this.bottom = 0;
    this.x = width;
    this.y = 0;
    this.vel = 8;
    this.gap = 100;

    let padding = 20;
    this.min = -this.height + this.gap + padding;
    this.max = this.height - this.gap - padding;
    this.offset = random(this.min, this.max);

    this.isColliding = false;
    this.isPassed = false;
  }

  show() {
    noStroke();
    if (this.isColliding) {
      fill(255, 20, 50);
    } else if (this.isPassed) {
      fill(50, 255, 20);
    } else {
      fill(150);
    }

    let x1 = this.x;
    let x2 = this.x;
    let y1 = this.y;
    this.bottom = h - this.height + this.gap - this.offset;
    let w = this.width;
    this.top = this.height - this.gap - this.offset;
    let h2 = this.height + this.gap + this.offset;

    rect(x1, y1, w, this.top);
    rect(x2, this.bottom, w, h2);
  }

  update() {
    this.x -= this.vel;
  }

  collisionDetection(bird) {
    let isAboveBottom = bird.y - (bird.size / 2) < this.top;
    let isBelowTop = bird.y + (bird.size / 2) > this.bottom;
    let isAfterLeft = bird.x + (bird.size / 2) > this.x;
    let isBeforeRight = bird.x - (bird.size / 2) < this.x + this.width;

    let isContact = !this.isColliding && isAfterLeft && isBeforeRight && (isAboveBottom || isBelowTop);
    let hasScored = !isBeforeRight && !this.isPassed && !this.isColliding;
    if (isContact) {
      this.isColliding = true;
      bird.score -= 1;
      return true;
    } else if (hasScored) {
      this.isPassed = true;
      bird.score += 1;
    }
    return false;
  }
}
