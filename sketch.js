const maxLevel = 5;

var ship;
var monsters = [];
var drops = [];
var dropsDown = [];
var bonusArray = [];
var monsterImage = [];
var mode = 0;
// mode: 0, waiting screen
//       1, star playing
//       2, victory
//       3, defeat

var shootingSound;
var boomImage;
var powerUpImg;

var score = 0;
var count = 0;
var level = 1;
var shootingDelay = 75;
var nextLevel = false;
var powerUp = false;

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);
  ResetAll();
  mode = 0;
}

function draw() {
  clear();

  if (mode == 0) {
    background(backgroundImage);

    fill(255);
    stroke(100);
    strokeWeight(2);

    textFont(myFontPrimary);
    textSize(64);
    text("Space Invaders", width / 2 - 190, height / 4);

    textFont(myFont);
    textSize(30);
    text("Press Enter to play", width / 2 - 120, height / 2);

    textFont(myFont);
    textSize(25);
    text(
      "How to play: use Mouse to move around, shoot with Left mouse\n Avoid contact with monsters and their projectiles !!",
      width / 2 - 300,
      height / 4 + height / 2
    );
  }

  if (mode == 1) {
    background(backgroundImage);
    stroke(255, 200);
    strokeWeight(2);

    textSize(30);
    fill(255);
    textFont(myFont);
    text("Score : " + score, width - 200, 40);
    text("Level: " + level, 100, 40);

    ship.show();
    ship.move();

    //Check if monsters are at edge
    var edge = false;
    for (var i = 0; i < monsters.length; i++) {
      monsters[i].show();
      monsters[i].move();

      if (
        monsters[i].x >= width - monsters[i].r ||
        monsters[i].x <= monsters[i].r
      )
        edge = true;

      if (monsters[i].y >= height - monsters[i].r)
        monsters[i].y = monsters[i].r;
    }

    if (edge) {
      for (var i = 0; i < monsters.length; i++) {
        monsters[i].shiftDown();
      }
    }

    //Check if drops hit monsters then delete drop and monster
    for (var i = 0; i < drops.length; i++) {
      drops[i].show();
      drops[i].move();


      if (drops[i].y < 0){
        drops[i].disapper();
      }
      for (var j = 0; j < monsters.length; j++) {
        if (drops[i].hits(monsters[j])) {
          monsters[j].hp--;
          drops[i].disapper();
          if (monsters[j].hp == 0) {
            monsters[j].die();
            monsters[j].showDeath();
            score += 200;

            // check if monster contains powerup, as randomly assigned
            if (monsters[j].bonus) {
              var new_bonus = new Powerup(monsters[j].x, monsters[j].y);
              bonusArray.push(new_bonus);
            }
          }
        }
      }
    }
    // check if powerup hits spaceship, activate power up and delete it
    for (var i = 0; i < bonusArray.length; i++) {
      bonusArray[i].show();
      bonusArray[i].move();
      if (bonusArray[i].hits(ship)) {
        powerUp = true;
        bonusArray[i].disapper();
      }
    }
    //Display powerUp
    if (powerUp) {
      textFont(myFont);
      fill(255);
      textSize(30);
      text("PowerUp", width / 2 - 40, 40);
    }

    //Monsters shoot
    for (var i = 0; i < dropsDown.length; i++) {
      dropsDown[i].showDown();
      dropsDown[i].moveDown();

      if (dropsDown[i].y > windowHeight) {
        dropsDown[i].disapper();
      }
      if (dropsDown[i].hitShip(ship)) {
        mode = 3;
      }
    }

    //Check Ship hits monster - lose
    for (var j = 0; j < monsters.length; j++) {
      if (ship.hits(monsters[j])) {
        mode = 3;
      }
    }

    //Delete drop
    for (var i = drops.length - 1; i >= 0; i--) {
      if (drops[i].toDelete) {
        drops.splice(i, 1);
      }
    }

    //Delete drop
    for (var i = bonusArray.length - 1; i >= 0; i--) {
      if (bonusArray[i].toDelete) {
        bonusArray.splice(i, 1);
      }
    }

    //Delete dropDown
    for (var i = dropsDown.length - 1; i >= 0; i--) {
      if (dropsDown[i].toDelete) {
        dropsDown.splice(i, 1);
      }
    }

    //Delete monster
    for (var i = monsters.length - 1; i >= 0; i--) {
      if (monsters[i].toDelete) {
        monsters.splice(i, 1);
      }
    }

    //If there is no more monster left - win
    if (monsters.length == 0) {
      mode = 2;
    }

    if (count === shootingDelay) {
      console.log(shootingDelay);

      generateMonsterDrop();
      count = 0;
    }

    count++;
  }

  //If Win
  if (mode == 2) {
    displayContainer(mode);
  }
  //If Lose
  if (mode == 3) {
    displayContainer(mode);
  }
}

function generateMonsterByLevel(level) {
  for (var i = 0; i < 7; i++) {
    monsters[i] = new Monster(i * 40 + 50, 30, level);
  }
  for (var i = 0; i < 7; i++) {
    monsters[i + 7] = new Monster(i * 40 + 50, 65, level);
  }
  for (var i = 0; i < 7; i++) {
    monsters[i + 14] = new Monster(i * 40 + 50, 100, level);
  }

  shootingDelay = (maxLevel - level + 1) * 15;
}
function displayContainer(mode) {
  //WON
  if (mode === 2) {
    if (level === maxLevel) {
      document.getElementById("winning-container-title").innerHTML = "Player";
      document.getElementById("winning-container-subtitle").innerHTML =
        "VICTORY !!";
      document.getElementById("score").innerHTML = "Score: " + score;
      document.getElementById("winner-img").src = "assets/image/ship.png";

      document.getElementById("btn").innerHTML = "Play again";

      nextLevel = false;
    } else {
      document.getElementById("winning-container-title").innerHTML =
        "Level : " + level;
      document.getElementById("winning-container-subtitle").innerHTML =
        "VICTORY !!";
      document.getElementById("score").innerHTML = "Score: " + score;
      document.getElementById("winner-img").src = "assets/image/ship.png";

      document.getElementById("btn").innerHTML = "Next Level";
      nextLevel = true;
    }
  }
  // LOSE
  else if (mode === 3) {
    document.getElementById("winning-container-title").innerHTML = "Player";
    document.getElementById("winning-container-subtitle").innerHTML =
      "DEFEAT :(";
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("winner-img").src =
      "assets/image/monster" + level + ".png";

    document.getElementById("btn").innerHTML = "Play again";

    nextLevel = false;
  }
  const winnerContainer = document.getElementById("winning-container");

  winnerContainer.classList.remove("hide");
}

//Generate monsters - random monster to shoot
function generateMonsterDrop() {
  j = Math.floor(Math.random() * (monsters.length - 0)) + 0;
  var dropDown = new Drop(monsters[j].x + 10, monsters[j].y);
  dropsDown.push(dropDown);
}

//If mouse clicked
function mouseClicked() {
  //Create drop
  var drop = new Drop(ship.x, ship.y - 20);
  if (powerUp) {
    var dropBonus1 = new Drop(ship.x - 7, ship.y - 15);
    var dropBonus2 = new Drop(ship.x + 7, ship.y - 15);
    drops.push(dropBonus1);
    drops.push(dropBonus2);
  }
  drops.push(drop);
  shootingSound.play();
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
  }
}

function ResetAll() {
  document.getElementById("winning-container").classList.add("hide");

  // backgroundSound.stop();
  // backgroundSound.play();

  monsters = [];
  drops = [];
  dropsDown = [];
  bonusArray = [];

  if (nextLevel) {
    level++;
  } else {
    level = 1;
    shootingDelay = 75;
    nextLevel = false;
    score = 0;
  }
  powerUp = false;
  mode = 1;
  count = 0;

  ship = new Ship();

  // Generate Monster
  generateMonsterByLevel(level);

  for (var i = 0; i < Math.floor(Math.random() * (7 - 3) + 3); i++) {
    j = Math.floor(Math.random() * (monsters.length - 0) + 0);
    monsters[j].bonus = true;
  }
}

function preload() {
  myFont = loadFont("./assets/fonts/nerkoone.ttf");
  myFontPrimary = loadFont("./assets/fonts/languar.ttf");

  monsterImage.push(loadImage("./assets/image/monster1.png"));
  monsterImage.push(loadImage("./assets/image/monster2.png"));
  monsterImage.push(loadImage("./assets/image/monster3.png"));
  monsterImage.push(loadImage("./assets/image/monster4.png"));
  monsterImage.push(loadImage("./assets/image/monster5.png"));

  shipImage = loadImage("./assets/image/ship.png");
  backgroundImage = loadImage("./assets/image/background.png");

  shootingSound = loadSound("./assets/sound/shootingSound.mp3");
  boomImage = loadImage("./assets/image/boom.png");
  powerUpImg = loadImage("./assets/image/powerup.png");
}
