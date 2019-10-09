class Bird {
  constructor() {
    this.x = width * 0.20;
    this.y = height / 2;
    this.size = 30;
    this.gravity = 1;
    this.velocity = 0;
    this.terminalVelocity = 20.0;
    this.score = 0;
    this.previousScore = 0;
    this.isDead = false;

    // # Features
    // - bird y
    // - bird y velocity?
    // - clostest pipe x
    // - clostest pipe y top
    // - clostest pipe y bottom
    // - score?
    this.brain = new NeuralNetwork(4, 6, 1);
  }

  show() {
    stroke(255);
    fill(255, 50);
    ellipse(this.x, this.y, this.size);
  }

  think(pipes) {
    // Closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if (d < closestD) {
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];

    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;

    let output = this.brain.predict(inputs);
    if (output[0] > 0.5) {
      this.flap();
    }
  }

  update() {
    stroke(255, 100);
    this.velocity += this.gravity;
    this.y += this.velocity;
    let birdBottom = height - (this.size / 2);
    let birdTop = 0 + (this.size / 2);

    if (this.y > birdBottom) {
      this.y = birdBottom;
      this.velocity = 0;
    } else if (this.y < birdTop) {
      this.y = birdTop;
      this.velocity = 0;
    }
  }

  flap() {
    this.velocity -= sqrt(this.gravity * h) / 1.6;
    this.velocity *= 0.9;
    let maxUp = 3;
    if (this.velocity > maxUp) {
      this.velocity = maxUp;
    }
  }
}
