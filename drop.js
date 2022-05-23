function Drop(x,y) {

  this.x = x;
  this.y = y;
  this.r = 2.5;
  this.toDelete = false;
  this.show = function () {
    
    noStroke();
    fill(255,150);
    ellipse(this.x, this.y, this.r*2, this.r*4);
  }

  this.move = function () {
    this.y = this.y - 5;
  }

  this.hits = function (Monster) {
    var d = dist(this.x, this.y, Monster.x, Monster.y);
    if (d < this.r + Monster.r) {
      return true;
    }
    else return false;
  }

  this.disapper = function () {
    this.toDelete = true;
  }

}