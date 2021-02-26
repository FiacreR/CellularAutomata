const s = ( p ) => {
  p.alive = [];
  p.aliveTemp = [];
  p.fire = [];
  p.fireTemp = [];
  p.maxDistance;
  p.xspacer;
  p.spacer;
  p.yspacer;
  p.xspacer;
  p.rule;
  p.ruleN = 90;
  p.sx;
  p.sy;

  p.setup = function() {
    p.createCanvas(720, 560);
    p.spacer = 8;
    p.xspacer = 
    p.yspacer 
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
    p.alive = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.aliveTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.fire = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.fireTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
  }

  p.reset = function() {
    p.clearScreen();
    //p.insertLife();
  }

  p.clearScreen = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.alive[x][y] = p.int(p.random(1.8));
      }
    }
  }

  p.display = function() {
    for (x = 0; x < (p.width/p.spacer); x += 2) {
        for (y = 0; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] >=1) {
            p.fill(0,p.max(140,250-p.alive[x][y]),0);
            p.hexagon(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer)
          }
        }
      }
      for (x = 1; x < (p.width/p.spacer); x += 2) {
        for (y = 1; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] >=1) {
            p.fill(0,p.max(140,250-p.alive[x][y]),0);
            p.hexagon(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer)
          }
        }
      }
      for (x = 0; x < (p.width/p.spacer); x += 2) {
        for (y = 0; y < (p.height/p.spacer); y += 2) {
          if (p.fire[x][y] >=1) {
            p.fill(p.max(140,250-p.fire[x][y]),130,0);
            p.hexagon(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer)
          }
        }
      }
      for (x = 1; x < (p.width/p.spacer); x += 2) {
        for (y = 1; y < (p.height/p.spacer); y += 2) {
          if (p.fire[x][y] >=1) {
            p.fill(p.max(140,250-p.fire[x][y]),130,0);
            p.hexagon(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer)
          }
        }
      }
  }

  p.hexagon = function(x, y, radius) {
    p.angle = p.TWO_PI / 6;
    p.beginShape();
    for (a = 0; a < p.TWO_PI; a += p.angle) {
      p.sx = x + p.cos(a) * radius;
      p.sy = y + p.sin(a) * radius;
      p.vertex(p.sx, p.sy);
    }
    p.endShape(p.CLOSE);
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
      for (x = 0; x < p.simLength; x+= 1) {
        // A living tree with any neighbour on fire catches fire
          if((p.alive[x][y]>=1)
            &&((p.fire[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.fire[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.fire[x][(y+2+p.simHeight)%p.simHeight]
            +p.fire[x][(y-2+p.simHeight)%p.simHeight]
            +p.fire[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.fire[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])>=(1))) {p.fireTemp[x][y]=p.fireTemp[x][y]+1}
      }
    }
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
       p.fire[x][y] = p.fireTemp[x][y];
        if (p.alive[x][y]>=1) {
          p.alive[x][y] = p.alive[x][y]+1;
          if (p.random(1)<0.00004) {
             p.fire[x][y] = p.fire[x][y]+1;   
          }
       }
       if ((p.alive[x][y]==0)&&(p.random(1)<0.004)) {
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

  p.insertLife = function(lifeformInstance=lifeform,xOffset = p.int(p.height/p.spacer/2), yOffset = p.int(p.width/p.spacer/2)) {
      for (x = 0; x < lifeformInstance.length; x += 1) {
      for (y = 0; y < lifeformInstance[0].length; y += 1) {
        p.alive[xOffset+x-p.int(lifeformInstance.length/2)][yOffset+y-p.int(lifeformInstance[0].length/2)] = lifeformInstance[x][y];
      }
    }
  }
}

myp5 = new p5(s, 'canvas1');

