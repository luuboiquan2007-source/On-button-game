let catImg;
let catY;
let catVelocity;
let gravity = 0.8;
let jumpPower = -18;
let groundY = 300;
let obstacleX;
let obstacleSpeed = 10;
let score = 0;
let gameState = "start";
let jumpSound, gameOverSound;

function preload() {
  catImg = loadImage("Pixel_Cat.webp"); 
  jumpSound = loadSound("wood_plank_flicks.ogg");
  gameOverSound = loadSound("clang_and_wobble.ogg");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
}

function draw() {
  background(200);

  // ground
  fill(100, 200, 100);
  rect(0, groundY + 40, width, height - groundY);

  if (gameState === "start") {
    fill(0);
    textSize(60);
    textAlign(CENTER);
    text("🐱 Jumping Cat 🐱", width / 2, height / 2 - 100);
    textSize(40);
    text("Press SPACE or CLICK to Start", width / 2, height / 2 -40);
  }

  else if (gameState === "play") {
    updatePlayer();
    updateObjects();
    checkCollision();

    // cat
    image(catImg, 60, catY - 10, 80, 80);

    // obstacle
    fill(0);
    rect(obstacleX, groundY, 60, 60);

    // score
    fill(0);
    textSize(30);
    textAlign(RIGHT, TOP);
    text("Score: " + score, width - 20, 20);
  }

  else if (gameState === "gameOver") {
    fill(0);
    textSize(60);
    textAlign(CENTER);
    text("!! Game Over !!", width / 2, height / 2 - 100);
    textSize(40);
    text("Final Score: " + score, width / 2, height / 2 - 40);
    text("Press SPACE or CLICK to Restart", width / 2, height / 2 + 40);
  }
}

function updatePlayer() {
  catY += catVelocity;
  catVelocity += gravity;

  if (catY > groundY) {
    catY = groundY;
    catVelocity = 0;
  }
}

function updateObjects() {
  obstacleX -= obstacleSpeed;

  if (obstacleX < -60) {
    obstacleX = width + random(200, 400);
    score += 1;
  }
}

function checkCollision() {
  // simple box collision
  if (obstacleX < 100 && obstacleX + 60 > 60 && catY + 40 > groundY) {
    gameState = "gameOver";
  }
}

function handleInput() {
  if (gameState === "start") {
    gameState = "play";
  } 
  else if (gameState === "play" && catY === groundY) {
    catVelocity = jumpPower; 
    jumpSound.play();
  } 
  else if (gameState === "gameOver") {
    resetGame(); 
    gameState = "start";
    gameOverSound.play();
    
  }
}

function keyPressed() {
  if (key === " " || keyCode === ENTER) {
    handleInput();
  }
}

function mousePressed() {
  handleInput();
}

function resetGame() {
  catY = groundY;
  catVelocity = 0;
  obstacleX = width;
  score = 0;
}
