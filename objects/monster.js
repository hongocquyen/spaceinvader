function Monster(x, y, level) {
  this.hp = 1;
  this.x = x;
  this.y = y;
  this.r = 15;
  this.level = level;
  this.toDelete = false;
  this.bonus = false;
  var dx = 2;
  var dy = this.r * 2.5;

  this.show = function () {
    fill(255);
    image(monsterImage, this.x, this.y, this.r * 2, this.r * 2);
  };

  this.showDeath = function () {
    image(boomImage, this.x, this.y, this.r * 2, this.r * 2);
  };

  this.move = function () {
    this.x = this.x + dx * level;
  };

  this.die = function () {
    this.toDelete = true;
  };

  this.shiftDown = function () {
    this.y = this.y + dy;
    dx = -dx;
  };
}
