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
  p.a;

  p.setup = function() {
    p.createCanvas(720, 560);
    p.spacer = 10;
    p.xspacer;
    p.yspacer; 
    p.init();
    p.insertLife();
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

  p.display = function() {
    
    for (x = 0; x < (p.width/p.spacer); x += 4) {
        for (y = 0; y < (p.height/p.spacer); y += 4) {
          if (p.alive[x][y] ==1) {
            p.fill(255,160,0);
            p.pentagone(x*p.spacer,y*p.spacer,p.spacer,-90)
          }
        }
      }
    for (x = 1; x < (p.width/p.spacer); x += 4) {
        for (y = 0; y < (p.height/p.spacer); y += 4) {
          if (p.alive[x][y] ==1) {
            p.fill(255,160,0);
            p.pentagone((x+5)*p.spacer,y*p.spacer,p.spacer,180)
          }
        }
      }
      for (x = 2; x < (p.width/p.spacer); x += 4) {
        for (y = 0; y < (p.height/p.spacer); y += 4) {
          if (p.alive[x][y] ==1) {
            p.fill(255,160,0);
            p.pentagone((x+4)*p.spacer,y*p.spacer,p.spacer,0)
          }
        }
      }
      for (x = 3; x < (p.width/p.spacer); x += 4) {
        for (y = 0; y < (p.height/p.spacer); y += 4) {
          if (p.alive[x][y] ==1) {
            p.fill(255,160,0);
            p.pentagone((x+5)*p.spacer,y*p.spacer,p.spacer,90)
          }
        }
      }
    for (x = 0; x < (p.width/p.spacer); x += 4) {
        for (y = 1; y < (p.height/p.spacer); y += 4) {
          if (p.alive[x][y] ==1) {
            p.fill(255,160,0);
            p.pentagone((x+2)*p.spacer,(y+1)*p.spacer,p.spacer,-90)
          }
        }
      }
    for (x = 1; x < (p.width/p.spacer); x += 4) {
        for (y = 1; y < (p.height/p.spacer); y += 4) {
          if (p.alive[x][y] ==1) {
            p.fill(255,160,0);
            p.pentagone((x+7)*p.spacer,(y+1.05)*p.spacer,p.spacer,180)
          }
        }
      }
    for (x = 2; x < (p.width/p.spacer); x += 4) {
        for (y = 1; y < (p.height/p.spacer); y += 4) {
          if (p.alive[x][y] ==1) {
            p.fill(255,160,0);
            p.pentagone((x+6)*p.spacer,(y+1.05)*p.spacer,p.spacer,0)
          }
        }
      }
    for (x = 3; x < (p.width/p.spacer); x += 4) {
        for (y = 1; y < (p.height/p.spacer); y += 4) {
          if (p.alive[x][y] ==1) {
            p.fill(255,160,0);
            p.pentagone((x+7)*p.spacer,(y+1)*p.spacer,p.spacer,90)
          }
        }
      }
  }

  p.pentagone = function(xoff=0,yoff=0,lengthLongSides=10,orientation=0) {
    p.push();
    lengthLongSides=lengthLongSides/0.85;
    p.translate(xoff,yoff);
    p.rotate(p.radians(orientation));
    p.beginShape();
    xpentagone = 0;
    ypentagone = 0;
    p.vertex(xpentagone, ypentagone);
    angle = p.radians(-180);
    xpentagone = xpentagone + p.cos(angle) * lengthLongSides*(p.sqrt(3)-1)/2;
    ypentagone = ypentagone + p.sin(angle) * lengthLongSides*(p.sqrt(3)-1)/2;
    p.vertex(xpentagone, ypentagone);
    angle = p.radians(120);
    xpentagone = xpentagone + p.cos(angle) * lengthLongSides;
    ypentagone = ypentagone + p.sin(angle) * lengthLongSides;
    p.vertex(xpentagone, ypentagone);
    angle = angle - p.radians(90);
    xpentagone = xpentagone + p.cos(angle) * lengthLongSides;
    ypentagone = ypentagone + p.sin(angle) * lengthLongSides;
    p.vertex(xpentagone, ypentagone);
    angle = angle - p.radians(60);
    xpentagone = xpentagone + p.cos(angle) * lengthLongSides;
    ypentagone = ypentagone + p.sin(angle) * lengthLongSides;
    p.vertex(xpentagone, ypentagone);
    angle = angle + p.radians(-90);
    xpentagone = xpentagone + p.cos(angle) * lengthLongSides;
    ypentagone = ypentagone + p.sin(angle) * lengthLongSides;
    p.vertex(xpentagone, ypentagone);
    angle = p.radians(-180);
    xpentagone = xpentagone + p.cos(angle) * lengthLongSides*(p.sqrt(3)-1)/2;
    ypentagone = ypentagone + p.sin(angle) * lengthLongSides*(p.sqrt(3)-1)/2;
    p.vertex(xpentagone, ypentagone);
    p.endShape();
    p.pop();
  }

  p.applyRule = function() {
    p.aliveTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.total = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.simHeight = p.alive[0].length;
    p.simLength = p.alive.length;



    for (x = 0; x < (p.width/p.spacer); x += 4) {
        for (y = 0; y < (p.height/p.spacer); y += 4) {
          p.total[x][y] = (p.alive[(x-7+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
                          +p.alive[(x-6+p.simLength)%p.simLength][(y-3+p.simHeight)%p.simHeight]
                          +p.alive[(x-5+p.simLength)%p.simLength][(y-3+p.simHeight)%p.simHeight]
                          +p.alive[(x-5+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-5+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
                          +p.alive[(x-3+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-2+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==2)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          // Any dead cell with three, four or five living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==6)) {p.aliveTemp[x][y]=1}
        }
      }

    for (x = 1; x < (p.width/p.spacer); x += 4) {
        for (y = 0; y < (p.height/p.spacer); y += 4) {
          p.total[x][y] = (p.alive[(x-3+p.simLength)%p.simLength][(y-3+p.simHeight)%p.simHeight]
                          +p.alive[(x-2+p.simLength)%p.simLength][(y-3+p.simHeight)%p.simHeight]
                          +p.alive[(x+1+p.simLength)%p.simLength][(y-3+p.simHeight)%p.simHeight]
                          +p.alive[(x+1+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+2+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+3+p.simLength)%p.simLength][(y-3+p.simHeight)%p.simHeight]
                          +p.alive[(x+3+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==2)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          // Any dead cell with three, four or five living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==6)) {p.aliveTemp[x][y]=1}
        }
      }

      for (x = 2; x < (p.width/p.spacer); x += 4) {
        for (y = 0; y < (p.height/p.spacer); y += 4) {
          p.total[x][y] = (p.alive[(x-5+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
                          +p.alive[(x-3+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
                          +p.alive[(x-1+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
                          +p.alive[(x+1+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+2+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+2+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==2)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          // Any dead cell with three, four or five living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==6)) {p.aliveTemp[x][y]=1}
        }
      }

      for (x = 3; x < (p.width/p.spacer); x += 4) {
        for (y = 0; y < (p.height/p.spacer); y += 4) {
          p.total[x][y] = (p.alive[(x-2+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-2+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
                          +p.alive[(x-1+p.simLength)%p.simLength][(y-3+p.simHeight)%p.simHeight]
                          +p.alive[(x-1+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+1+p.simLength)%p.simLength][(y-3+p.simHeight)%p.simHeight]
                          +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
                          +p.alive[(x+5+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==2)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          // Any dead cell with three, four or five living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==6)) {p.aliveTemp[x][y]=1}
        }
      }

    for (x = 0; x < (p.width/p.spacer); x += 4) {
        for (y = 1; y < (p.height/p.spacer); y += 4) {
          p.total[x][y] = (p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
                          +p.alive[(x-2+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
                          +p.alive[(x-2+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-3+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-5+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-1+p.simLength)%p.simLength][(y+3+p.simHeight)%p.simHeight]
                          +p.alive[(x-3+p.simLength)%p.simLength][(y+3+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==2)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          // Any dead cell with three, four or five living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==6)) {p.aliveTemp[x][y]=1}
        }
      }

    for (x = 1; x < (p.width/p.spacer); x += 4) {
        for (y = 1; y < (p.height/p.spacer); y += 4) {
          p.total[x][y] = (p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
                          +p.alive[(x+1+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+2+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
                          +p.alive[(x+2+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+3+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+5+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
                          +p.alive[(x+7+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==2)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          // Any dead cell with three, four or five living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==6)) {p.aliveTemp[x][y]=1}
        }
      }

    for (x = 2; x < (p.width/p.spacer); x += 4) {
        for (y = 1; y < (p.height/p.spacer); y += 4) {
          p.total[x][y] = (p.alive[(x-1+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-1+p.simLength)%p.simLength][(y+3+p.simHeight)%p.simHeight]
                          +p.alive[(x+1+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+1+p.simLength)%p.simLength][(y+3+p.simHeight)%p.simHeight]
                          +p.alive[(x+2+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+3+p.simLength)%p.simLength][(y+3+p.simHeight)%p.simHeight]
                          +p.alive[(x+6+p.simLength)%p.simLength][(y+3+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==2)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          // Any dead cell with three, four or five living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==6)) {p.aliveTemp[x][y]=1}
        }
      }

    for (x = 3; x < (p.width/p.spacer); x += 4) {
        for (y = 1; y < (p.height/p.spacer); y += 4) {
          p.total[x][y] = (p.alive[(x-2+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x-1+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+2+p.simLength)%p.simLength][(y+3+p.simHeight)%p.simHeight]
                          +p.alive[(x+3+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
                          +p.alive[(x+5+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
                          +p.alive[(x+5+p.simLength)%p.simLength][(y+p.simHeight)%p.simHeight]
                          +p.alive[(x+5+p.simLength)%p.simLength][(y+3+p.simHeight)%p.simHeight]);
          // Any living cell with two or three living neighbours remains alive
          if((p.alive[x][y]==1)&&(p.total[x][y]==2)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==1)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          // Any dead cell with three, four or five living neighbours becomes alive
          if((p.alive[x][y]==0)&&(p.total[x][y]==3)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==4)) {p.aliveTemp[x][y]=1}
          if((p.alive[x][y]==0)&&(p.total[x][y]==6)) {p.aliveTemp[x][y]=1}
        }
      }
 






  p.alive = p.aliveTemp.map(function(arr) {return arr.slice();});
  }

  p.insertLife = function(lifeformInstance=0,xOffset = p.int(p.width/p.spacer/2), yOffset = p.int(p.height/p.spacer/2)) {
  lifeformInstance=lifeform;
  if (lifeformInstance==0) {
    p.alive = p.alive.map(x => x.map(y => p.int(p.random(1.7))))
  } else {
    for (x = 0; x < lifeformInstance.length; x += 1) {
      for (y = 0; y < lifeformInstance[0].length; y += 1) {
        p.alive[xOffset+x-p.int(lifeformInstance.length/2)][yOffset+y-p.int(lifeformInstance[0].length/2)] = lifeformInstance[x][y];
      }
    }
  }
  }
}
