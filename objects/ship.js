function Ship() {
  this.x = width / 2;
  this.xdir = 0;
  this.show = function () {
    noStroke();
    fill(255);

    rectMode(CENTER);
    rect(this.x, height - 20, 30, 40);
    rect(this.x, height - 10, 50, 20);
  };

  this.setDir = function (dir) {
    this.xdir = dir;
  };
  this.move = function () {
    if (this.x <= 0) {
      if (keyCode === LEFT_ARROW) {
        this.xdir = 0;
      } else if (keyCode === RIGHT_ARROW) {
        this.xdir = 1;
      }
    } else if (this.x >= width) {
      if (keyCode === RIGHT_ARROW) {
        this.xdir = 0;
      } else if (keyCode === LEFT_ARROW) {
        this.xdir = -1;
      }
    }
    this.x += this.xdir * 5;
  };
}
