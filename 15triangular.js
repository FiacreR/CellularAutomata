const s = ( p ) => {
  p.alive = [];
  p.aliveTemp = [];
  p.maxDistance;
  p.xspacer;
  p.spacer;
  p.yspacer;
  p.xspacer;
  p.sx;
  p.sy;
  p.total = [];

  p.setup = function() {
    p.createCanvas(720, 560);
    p.spacer = 10;
    p.xspacer;
    p.yspacer; 
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
    p.total = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
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
    for (x = 0; x < (p.width/p.spacer); x += 2) {
        for (y = 0; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] ==1) {
            p.fill(200,70,70);
            p.triangle(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer,0)
          }
        }
      }
      for (x = 1; x < (p.width/p.spacer); x += 2) {
        for (y = 1; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] ==1) {
            p.fill(200,70,70);
            p.triangle(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer,0)
          }
        }
      }
    for (x = 1; x < (p.width/p.spacer); x += 2) {
        for (y = 0; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] ==1) {
            p.fill(200,70,70);
            p.triangle(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer,p.TWO_PI/2)
          }
        }
      }
      for (x = 0; x < (p.width/p.spacer); x += 2) {
        for (y = 1; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] ==1) {
            p.fill(200,70,70);
            p.triangle(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer,p.TWO_PI/2)
          }
        }
      }
  }

  p.triangle = function(x, y, radius,offset=0) {
    p.angle = p.TWO_PI / 3;
    if(!(offset==0)) {
      p.push();
      p.translate(5,0);
    }
    p.beginShape();
    for (a = 0; a < p.TWO_PI; a += p.angle) {
      p.sx = x  + p.cos(a+ offset) * radius;
      p.sy = y  + p.sin(a+ offset) * radius;
      p.vertex(p.sx, p.sy);
    }
    p.endShape(p.CLOSE);
    if(!(offset==0)) {
      p.pop();
    }
  }

  p.applyRule = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.aliveTemp[x][y] = 0;//p.alive[x][y];
        p.total[x][y] = 0;
      }
    }
    p.simHeight = p.alive[0].length;
    p.simLength = p.alive.length;
    for (y = 1; y < p.simHeight; y += 2) {
      for (x = 0; x < p.simLength; x+= 2) {
          p.total[x][y] = (p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+2+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-2+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+2+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-2+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==5)) {p.aliveTemp[x][y]=1}
          // Any dead cell with two living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
      }
    }
    for (y = 0; y < p.simHeight; y += 2) {
      for (x = 1; x < p.simLength; x+= 2) {
          p.total[x][y] = (p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+2+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-2+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+2+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-2+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==5)) {p.aliveTemp[x][y]=1}
          // Any dead cell with two living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
      }
    }
    for (y = 0; y < p.simHeight; y += 2) {
      for (x = 0; x < p.simLength; x+= 2) {
          p.total[x][y] = (p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+2+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-2+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][(y+2+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-2+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==5)) {p.aliveTemp[x][y]=1}
          // Any dead cell with two living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
      }
    }
    for (y = 1; y < p.simHeight; y += 2) {
      for (x = 1; x < p.simLength; x+= 2) {
          p.total[x][y] = (p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+2+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-2+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][(y+2+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-2+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==5)) {p.aliveTemp[x][y]=1}
          // Any dead cell with two living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
      }
    }
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        // Outside area cell disapear
       p.alive[x][y] = p.aliveTemp[x][y];
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

lifeform = [[0,0,0,0,0,1],
            [0,0,0,1,1,1],
            [0,0,0,1,1,1],
            [0,0,0,0,0,1],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]]

myp5 = new p5(s, 'canvas1');

