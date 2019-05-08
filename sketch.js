let w, h;
let bird;
let pipes = [];
let frequency = 20;

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);

  pipes.push(new Pipe());
  bird = new Bird();
}

function draw() {
  background(30);

  bird.show();
  bird.update();

  if (frameCount % floor(w / frequency) === 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].collisionDetection(bird)) {
      console.log("HIT");
    };

    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1);
    }
  }

  fill(255);
  textSize(50);
  textAlign(CENTER)
  text(bird.score, width / 2, max(h * 0.1, 60));
}

function keyPressed() {
  if (key == ' ') {
    bird.flap();
  }
}

function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);
}
