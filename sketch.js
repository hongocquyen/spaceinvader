var ship;
var monsters = [];
var drops = [];
var dropsDown = [];
var mode = 0;
var backgroundSound;
var shootingSound;
var score = 0;
var count = 0;

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);
  ResetAll();
  mode = 0;
  // var button = createButton("reset");
  // button.mousePressed(ResetAll);
}

function draw() {
  clear();

  if (mode == 0) {
    background(51);

    fill(255);
    stroke(100);
    strokeWeight(2);
    textFont(myFont);
    textSize(30);
    text("Press Enter to play", width / 2 - 120, height / 2);
  }

  if (mode == 1) {
    background(backgroundImage);
    stroke(255, 200);
    strokeWeight(2);

    textSize(30);
    fill(255);
    textFont(myFont);
    text("Score : " + score, width - 200, 40);
    //Dead line
    // line(0, height - 60, width, height - 60);
    ship.show();
    ship.move();

    //Check if monsters are at edge
    var edge = false;
    for (var i = 0; i < monsters.length; i++) {
      monsters[i].show();
      monsters[i].move();

      if (monsters[i].x >= width - 30 || monsters[i].x <= 30) edge = true;
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

      for (var j = 0; j < monsters.length; j++) {
        if (drops[i].hits(monsters[j])) {
          monsters[j].hp--;
          drops[i].disapper();
          if (monsters[j].hp == 0) {
            monsters[j].die();
            score += 200;
          }
        }
      }
    }

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

    for (var i = monsters.length - 1; i >= 0; i--) {
      if (monsters[i].y >= height - 60) {
        mode = 3;
      }
    }

    if (monsters.length == 0) {
      mode = 2;
    }

    if (count === 75) {
      console.log(count);

      generateMonsterDrop();
      count = 0;
    }

    count++;
  }

  if (mode == 2) {
    // remove()
    // noCanvas();
    displayContainer(mode);
  }

  if (mode == 3) {
    // remove()
    // noCanvas();
    displayContainer(mode);
  }
}

function displayContainer(mode) {
  if (mode === 2) {
    document.getElementById("winning-container-title").innerHTML = "Player";
    document.getElementById("winning-container-subtitle").innerHTML = "WON";
    document.getElementById("score").innerHTML = "Score: " + score;
  } else if (mode === 3) {
    document.getElementById("winning-container-title").innerHTML = "Player";
    document.getElementById("winning-container-subtitle").innerHTML = "LOSE";
    document.getElementById("score").innerHTML = "Score: " + score;
  }
  const winnerContainer = document.getElementById("winning-container");

  winnerContainer.classList.remove("hide");
  // winnerContainer.style.opacity = 0;
  // setTimeout(() => {
  //   winnerContainer.style.opacity = 1;
  // }, 750);
}

function generateMonsterDrop() {
  j = Math.floor(Math.random() * (monsters.length - 0)) + 0;
  var dropDown = new Drop(monsters[j].x + 10, monsters[j].y);
  dropsDown.push(dropDown);
}

function mouseClicked() {
  var drop = new Drop(ship.x, ship.y - 20);
  drops.push(drop);
  shootingSound.play();
}

// function keyReleased() {
//   if (key != " " && keyCode !== UP_ARROW) {
//     ship.setDir(0);
//   }
// }

function keyPressed() {
  // if (key === " " || keyCode === UP_ARROW) {
  //   var drop = new Drop(ship.x, height - 46);
  //   drops.push(drop);
  //   shootingSound.play();
  // }
  // if (keyCode === RIGHT_ARROW) ship.setDir(1);
  // else if (keyCode === LEFT_ARROW) ship.setDir(-1);
  if (keyCode === ENTER) {
    mode = 1;
  }
}

// function gameOver() {
//   background(51);
//   fill(255);
//   stroke(100);
//   strokeWeight(2);
//   textFont(myFont);
//   textSize(30);
//   text("Game Over", width / 2 - 70, height / 2);
// }

// function victory() {
//   background(51);
//   fill(255);
//   stroke(100);
//   strokeWeight(2);
//   textFont(myFont);
//   textSize(30);
//   text("You win!!", width / 2 - 60, height / 2);
// }

function ResetAll() {
  document.getElementById("winning-container").classList.add("hide");

  // backgroundSound.stop();
  // backgroundSound.play();

  monsters = [];
  drops = [];
  dropsDown = [];

  mode = 1;
  score = 0;
  count = 0;

  ship = new Ship();

  //Level-1
  for (var i = 0; i < 7; i++) {
    monsters[i] = new Monster(i * 40 + 50, 30);
  }
  for (var i = 0; i < 7; i++) {
    monsters[i + 7] = new Monster(i * 40 + 50, 65);
  }
  for (var i = 0; i < 7; i++) {
    monsters[i + 14] = new Monster(i * 40 + 50, 100);
  }
}

function preload() {
  myFont = loadFont("./assets/fonts/nerkoone.ttf");
  monsterImage = loadImage("./assets/image/monster.png");
  shipImage = loadImage("./assets/image/ship.png");
  backgroundImage = loadImage("./assets/image/background.png");
  backgroundSound = loadSound("./assets/sound/backgroundSound.mp3");
  shootingSound = loadSound("./assets/sound/shootingSound.mp3");
}
