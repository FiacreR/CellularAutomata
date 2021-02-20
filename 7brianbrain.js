const s = ( p ) => {
  p.alive = [];
  p.aliveTemp = [];
  p.dying = [];
  p.dyingTemp = [];
  p.maxDistance;
  p.spacer;
  p.rule;
  p.ruleN = 90;

  p.setup = function() {
    p.createCanvas(720, 560);
    p.spacer = 10;
    p.init();
    p.reset();
    p.fill(20,20,20);
    p.rect(-2, -2, p.width+4, p.height+4);
    p.frameRate(20);
  }

  p.draw = function() {
    p.fill(20,20,20);
    p.rect(-2, -2, p.width+4, p.height+4);
    p.stroke(0,0,0);
    p.display();
    p.applyRule();
  }

  p.init = function() {
      for (x = 0; x < (p.width/p.spacer); x += 1) {
      p.alive[x] = []; // create nested array
      p.aliveTemp[x] = [];
      p.dying[x] = [];
      p.dyingTemp[x] = [];
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.alive[x][y] = 0;
        p.aliveTemp[x][y] = 0;
        p.dying[x][y] = 0;
        p.dyingTemp[x][y] = 0;
      }
    }
  }

  p.reset = function() {
    p.clearScreen();
  }

  p.clearScreen = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.alive[x][y] = p.int(p.random(1.3));
      }
    }
  }

  p.display = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
        for (y = 0; y < (p.height/p.spacer); y += 1) {
          if (p.alive[x][y] ==1) {
            p.fill(0,150,0);
            p.square(x*p.spacer, y*p.spacer,p.spacer*0.8,p.spacer*0.2);
          }
          if (p.dying[x][y] ==1) {
            p.fill(150,150,0);
            p.square(x*p.spacer, y*p.spacer,p.spacer*0.8,p.spacer*0.2);
          }
        }
      }
  }

  p.applyRule = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.aliveTemp[x][y] = p.alive[x][y];
        p.dyingTemp[x][y] = p.dying[x][y];
      }
    }
    p.simHeight = p.alive[0].length;
    p.simLength = p.alive.length;
    for (y = 0; y < p.simHeight; y += 1) {
      for (x = 0; x < p.simLength; x++) {
        if(p.dying[x][y]==1) {
          p.dyingTemp[x][y]=0;
        }
        if(p.alive[x][y]==1) {
          p.aliveTemp[x][y]=0;
          p.dyingTemp[x][y]=1;
        }
        // Any live cell with two live neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.dying[x][y]==0)
            &&((p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])==(2))) {p.aliveTemp[x][y]=1}
      }
    }
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        // Outside area cell disapear
       p.alive[x][y] = p.aliveTemp[x][y];
       p.dying[x][y] = p.dyingTemp[x][y];
      }
    }
  }

  p.insertLife = function(lifeformInstance=lifeform,xOffset = p.int(p.width/p.spacer/2), yOffset = p.int(p.height/p.spacer/2)) {
      for (x = 0; x < lifeformInstance.length; x += 1) {
      for (y = 0; y < lifeformInstance[0].length; y += 1) {
        p.alive[xOffset+x-p.int(lifeformInstance.length/2)][yOffset+y-p.int(lifeformInstance[0].length/2)] = lifeformInstance[x][y];
      }
    }
  }
}

myp5 = new p5(s, 'canvas1');

