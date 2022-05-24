function Powerup(x,y) {
    this.x = x;
    this.y = y;
    this.r = 15;
    this.toDelete = false;
    this.move = function() {
        this.y += 4;
    }
    this.show = function() {
        image(powerUpImg, this.x, this.y, this.r*2,this.r*2);
    }
    this.hits = function(Ship) {
        var d = dist(this.x, this.y, Ship.x, Ship.y);
        if (d < this.r + Ship.r) {
          return true;
        } else return false;
    }

    this.disapper = function() {
        this.toDelete = true;
    }
}