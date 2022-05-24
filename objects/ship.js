function Ship() {
  this.x = width / 2;
  this.y = height - 60;
  this.r = 40;
  this.xdir = 0;
  this.show = function () {
    noStroke();
    fill(255);

    image(shipImage, this.x - 25, this.y, this.r, this.r);

  };

  this.setDir = function (dir) {
    this.xdir = dir;
  };
  this.move = function () {
    // //uncomment to line 32 to play by arrow
    // if (this.x <= 0) {
    //   if (keyCode === LEFT_ARROW) {
    //     this.xdir = 0;
    //   } else if (keyCode === RIGHT_ARROW) {
    //     this.xdir = 1;
    //   }
    // } else if (this.x >= width) {
    //   if (keyCode === RIGHT_ARROW) {
    //     this.xdir = 0;
    //   } else if (keyCode === LEFT_ARROW) {
    //     this.xdir = -1;
    //   }
    // }
    // this.x += this.xdir * 5;
    if (mouseX < this.r / 2) {
      this.x = this.r / 2;
    } else if (mouseX > width - this.r / 2) {
      this.x = width - this.r / 2;
    } else if (mouseY < this.r / 2) {
      this.y = this.r / 2;
    } else if (mouseY > height - this.r / 2) {
      this.y = height - this.r / 2;
    } else {
      this.x = mouseX;
      this.y = mouseY;
    }
  };

  this.hits = function (Monster) {
    var d = dist(this.x, this.y, Monster.x, Monster.y);
    if (d < this.r - 15 + Monster.r) {
      return true;
    } else return false;
  };


  
}
