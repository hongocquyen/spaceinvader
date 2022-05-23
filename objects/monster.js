function Monster(x, y) {
  this.hp = 1;
  this.x = x;
  this.y = y;
  this.r = 15;
  this.toDelete = false;
  var dx = 1;
  var dy = 40;

  this.show = function () {
    fill(255);
    // ellipse(this.x, this.y, this.r * 2, this.r * 2);

    image(monsterImage, this.x, this.y, this.r * 2, this.r * 2);
  };

  this.move = function () {
    this.x = this.x + dx;
  };

  this.die = function () {
    this.toDelete = true;
  };

  this.shiftDown = function () {
    this.y = this.y + dy;
    dx = -dx;
  };
}
