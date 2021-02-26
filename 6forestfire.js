const s = ( p ) => {
  p.fire = [];
  p.fireTemp = [];
  p.alive = [];
  p.maxDistance;
  p.spacer;
  p.rule;
  p.ruleN = 90;

  p.setup = function() {
    p.createCanvas(720, 560);
    p.spacer = 8;
    p.init();
    p.reset();
    p.fill(20,20,20);
    p.rect(-2, -2, p.width+4, p.height+4);
    p.frameRate(200);
  }

  p.draw = function() {
      p.fill(20,20,20);
      p.rect(-2, -2, p.width+4, p.height+4);
      p.stroke(0,0,0);
      p.display();
      p.applyRule();
  }

  p.init = function() {
    p.alive = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.fire = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.fireTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
  }

  p.reset = function() {
    p.clearScreen();
  }

  p.clearScreen = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.alive[x][y] = p.int(p.random(1.8));
      }
    }
  }

  p.display = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
        for (y = 0; y < (p.height/p.spacer); y += 1) {
          if (p.alive[x][y] >=1) {
            p.fill(0,p.max(140,250-p.alive[x][y]),0);
            p.square(x*p.spacer, y*p.spacer,p.spacer*0.8);
          }
          if (p.fire[x][y] >=1) {
            p.fill(p.max(140,250-p.fire[x][y]),130,0);
            p.square(x*p.spacer, y*p.spacer,p.spacer*0.8);
          }
        }
      }
  }

  p.applyRule = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.fireTemp[x][y] = p.fire[x][y];
      }
    }
    p.simHeight = p.fire[0].length;
    p.simLength = p.fire.length;
    for (y = 0; y < p.simHeight; y += 1) {
      for (x = 0; x < p.simLength; x++) {
        // A living tree with any neighbour on fire catches fire
          if((p.alive[x][y]>=1)
            &&((p.fire[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.fire[(x-1+p.simLength)%p.simLength][y]
            +p.fire[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.fire[x][(y+1+p.simHeight)%p.simHeight]
            +p.fire[x][(y-1+p.simHeight)%p.simHeight]
            +p.fire[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.fire[(x+1+p.simLength)%p.simLength][y]
            +p.fire[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])>=(1))) {
            console.log("yes")
            p.fireTemp[x][y]=p.fireTemp[x][y]+1}
     }
    }
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        // Outside area cell disapear
       p.fire[x][y] = p.fireTemp[x][y];
       if (p.alive[x][y]>=1) {
          p.alive[x][y] = p.alive[x][y]+1;
          if (p.random(1)<0.00002) {
             p.fire[x][y] = p.fire[x][y]+1;   
          }
       }
       if ((p.alive[x][y]==0)&&(p.random(1)<0.002)) {
          p.alive[x][y] = 1;
       }
       if (p.fire[x][y]>=2) {
        p.fire[x][y] = 0;
        p.alive[x][y] = 0;
       }
        if (p.fire[x][y]==1) {
          p.fire[x][y]=p.fire[x][y]+1;
        }
      }
    }
  }

}

myp5 = new p5(s, 'canvas1');

