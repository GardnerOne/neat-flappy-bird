let w, h;

const TOTAL = 10;
let birds = [];
let pipes = [];
let frequency = 10;
let bestScore = 0;

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);

  pipes.push(new Pipe());

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  background(30);

  if (frameCount % floor(w / frequency) === 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    for (let j = birds.length - 1; j >= 0; j--) {
      if (pipes[i].hits(birds[j])) {
        birds[j].isDead = true;
      };
    }

    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1);
    }
  }

  for (let i = birds.length - 1; i >= 0; i--) {
    let bird = birds[i];
    if (bird.isDead) {
      birds.splice(i, 1);
    }
    bird.think(pipes);
    bird.show();
    bird.update();
    if (bird.score > bestScore) {
      bestScore = bird.score;
    }
  }

  fill(255);
  textSize(50);
  textAlign(CENTER)
  text(bestScore, width / 2, max(h * 0.1, 60));

  showDebugInfo();
}

function showDebugInfo() {
  let panel_w = 250;
  let panel_h = 450;
  let panel_x = width - panel_w;
  let panel_y = (height / 2) - (panel_h / 2);
  let padding = 5;
  fill(255, 255, 255, 150);
  rect(panel_x, panel_y, panel_w, panel_h);
  fill(50);
  textSize(20);
  textAlign(LEFT);
  text("Birds remaining = " + birds.length, panel_x + padding, panel_y + 25);
}

function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);
}
