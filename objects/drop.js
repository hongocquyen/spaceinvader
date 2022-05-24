function Drop(x, y) {
  this.x = x;
  this.y = y;
  this.r = 2.5;
  this.toDelete = false;
  this.show = function () {
    noStroke();
    fill(255, 150);
    ellipse(this.x, this.y, this.r * 2, this.r * 4);
  };
  this.showDown = function () {
    noStroke();
    fill(0, 0, 255, 150);
    ellipse(this.x, this.y, this.r * 2, this.r * 4);
  };

  this.move = function () {
    this.y = this.y - 5;
  };

  this.moveDown = function () {
    this.y += 7;
  };

  this.hits = function (Monster) {
    var d = dist(this.x, this.y, Monster.x, Monster.y);
    if (d < this.r + Monster.r - 15) {
      return true;
    } else return false;
  };

  this.hitShip = function (Ship) {
    var d = dist(this.x, this.y, Ship.x, Ship.y);
    if (d < this.r + Ship.r - 15) {
      return true;
    } else return false;
  };

  this.disapper = function () {
    this.toDelete = true;
  };
}
