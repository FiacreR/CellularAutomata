const s = ( p ) => {
  p.alive = [];
  p.resetalive = [];
  p.aliveTemp = [];
  p.spacer;
  p.total = [];
  p.maxState = numberOfStates - 1;
  p.omega = [];
  p.omegaTminusone = [];
  p.capOmega;
  p.iteration = 0;

  p.setup = function() {
    p.createCanvas(720, 560);
    p.spacer = spaceStep;
    p.init();
    p.insertLife();
    p.fill(20,20,20);
    p.rect(-2, -2, p.width+4, p.height+4);
    p.frameRate(1/timeStep);
  }

  p.init = function() {
    p.alive = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.aliveTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.total = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.omega = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.omegaTminusone = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
   }

  p.displayTriangle = function() {
    for (x = 0; x < (p.width/p.spacer); x += 2) {
        for (y = 0; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] >0) {
            p.fill(((p.alive[x][y]-1)/(5*(numberOfStates-1))+0.01)%1,0.95,0.85);
            p.triangle(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer,0)
          }
        }
      }
      for (x = 1; x < (p.width/p.spacer); x += 2) {
        for (y = 1; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] >0) {
            p.fill(((p.alive[x][y]-1)/(5*(numberOfStates-1))+0.01)%1,0.95,0.85);
            p.triangle(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer,0)
          }
        }
      }
    for (x = 1; x < (p.width/p.spacer); x += 2) {
        for (y = 0; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] >0) {
            p.fill(((p.alive[x][y]-1)/(5*(numberOfStates-1))+0.01)%1,0.95,0.85);
            p.triangle(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer,p.TWO_PI/2)
          }
        }
      }
      for (x = 0; x < (p.width/p.spacer); x += 2) {
        for (y = 1; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] >0) {
            p.fill(((p.alive[x][y]-1)/(5*(numberOfStates-1))+0.01)%1,0.95,0.85);
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

  p.displaySquare = function() {
    p.alive.map(function(x,indexX) {
      x.map(function(y,indexY){
        if(y>0){
          p.fill(((y-1)/(5*(numberOfStates-1))+0.6)%1,0.95,0.85);
          p.square(indexX*p.spacer, indexY*p.spacer,p.spacer*0.8,p.spacer*0.2);
        }
      })
    })
  }

  p.displayHexagon = function() {
    for (x = 0; x < (p.width/p.spacer); x += 2) {
        for (y = 0; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y]>0) {
            p.fill(((p.alive[x][y]-1)/(5*(numberOfStates-1))+0.01)%1,0.95,0.85);
            p.hexagon(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer)
          }
        }
      }
      for (x = 1; x < (p.width/p.spacer); x += 2) {
        for (y = 1; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y]>0) {
            p.fill(((p.alive[x][y]-1)/(5*(numberOfStates-1))+0.01)%1,0.95,0.85);
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

  p.applyRuleTriangle = function() {
    p.aliveTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.total = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.simHeight = p.alive[0].length;
    p.simLength = p.alive.length;
    for (y = 1; y < p.simHeight; y += 2) {
      for (x = 0; x < p.simLength; x+= 2) {
          p.total[x][y] = [p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][y],
            p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y+2+p.simHeight)%p.simHeight],
            p.alive[x][(y+1+p.simHeight)%p.simHeight],
            p.alive[x][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y-2+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][(y+2+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][y],
            p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][(y-2+p.simHeight)%p.simHeight]]
            .filter(elements => elements==1).length;
      }
    }
    for (y = 0; y < p.simHeight; y += 2) {
      for (x = 1; x < p.simLength; x+= 2) {
          p.total[x][y] = [p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][y],
            p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y+2+p.simHeight)%p.simHeight],
            p.alive[x][(y+1+p.simHeight)%p.simHeight],
            p.alive[x][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y-2+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][(y+2+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][y],
            p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][(y-2+p.simHeight)%p.simHeight]]
            .filter(elements => elements==1).length;
      }
    }
    for (y = 0; y < p.simHeight; y += 2) {
      for (x = 0; x < p.simLength; x+= 2) {
          p.total[x][y] = [p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][y],
            p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y+2+p.simHeight)%p.simHeight],
            p.alive[x][(y+1+p.simHeight)%p.simHeight],
            p.alive[x][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y-2+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][(y+2+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][y],
            p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][(y-2+p.simHeight)%p.simHeight]]
            .filter(elements => elements==1).length
      }
    }
    for (y = 1; y < p.simHeight; y += 2) {
      for (x = 1; x < p.simLength; x+= 2) {
          p.total[x][y] = [p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][y],
            p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y+2+p.simHeight)%p.simHeight],
            p.alive[x][(y+1+p.simHeight)%p.simHeight],
            p.alive[x][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y-2+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][(y+2+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][y],
            p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][(y-2+p.simHeight)%p.simHeight]]
            .filter(elements => elements==1).length
      }
    }
    for (y = 0; y < p.simHeight; y += 1) {
      for (x = 0; x < p.simLength; x++) {
          if(p.alive[x][y]>1){
            p.aliveTemp[x][y]=(p.alive[x][y]+1)%numberOfStates;
          }
          if(p.alive[x][y]==1){
            for (i=0; i<=12;i++) {if (p.total[x][y]==i) {p.aliveTemp[x][y]=(2-ruleKeep[i])%numberOfStates}}
            }
          if(p.alive[x][y]==0){
            for (i=0; i<=12;i++) {if (p.total[x][y]==i) {p.aliveTemp[x][y]=ruleBirth[i]}}
          }
      }
    }
  }

  p.applyRuleSquare = function() {
    p.aliveTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.total = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.simHeight = p.alive[0].length;
    p.simLength = p.alive.length;
    for (y = 0; y < p.simHeight; y += 1) {
      for (x = 0; x < p.simLength; x++) {
        p.total[x][y]=[p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
                      p.alive[(x-1+p.simLength)%p.simLength][y],
                      p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
                      p.alive[x][(y+1+p.simHeight)%p.simHeight],
                      p.alive[x][(y-1+p.simHeight)%p.simHeight],
                      p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
                      p.alive[(x+1+p.simLength)%p.simLength][y],
                      p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]]
                      .filter(elements => elements==1).length
          if(p.alive[x][y]>1){
            p.aliveTemp[x][y]=(p.alive[x][y]+1)%numberOfStates;
          }
          if(p.alive[x][y]==1){
            for (i=0; i<=8;i++) {if (p.total[x][y]==i) {p.aliveTemp[x][y]=(2-ruleKeep[i])%numberOfStates}}
            }
          if(p.alive[x][y]==0){
            for (i=0; i<=8;i++) {if (p.total[x][y]==i) {p.aliveTemp[x][y]=ruleBirth[i]}}
          }
      }
    }
  }

  p.applyRuleHexagon = function() {
    p.aliveTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.total = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.simHeight = p.alive[0].length;
    p.simLength = p.alive.length;
    for (y = 0; y < p.simHeight; y += 1) {
      for (x = 0; x < p.simLength; x++) {
        p.total[x][y]=[p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight],
            p.alive[x][(y+2+p.simHeight)%p.simHeight],
            p.alive[x][(y-2+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight],
            p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]]
            .filter(elements => elements==1).length
          if(p.alive[x][y]>1){
            p.aliveTemp[x][y]=(p.alive[x][y]+1)%numberOfStates;
          }
          if(p.alive[x][y]==1){
            for (i=0; i<=6;i++) {if (p.total[x][y]==i) {p.aliveTemp[x][y]=(2-ruleKeep[i])%numberOfStates}}
            }
          if(p.alive[x][y]==0){
            for (i=0; i<=6;i++) {if (p.total[x][y]==i) {p.aliveTemp[x][y]=ruleBirth[i]}}
          }
      }
    }
  }

    p.finaliseRule = function() {
    if (memoryFactor==0) {
          p.alive = p.aliveTemp.map(function(arr) {return arr.slice();});
    } else {
          p.iteration += 1;
          p.capOmega = (p.pow(memoryFactor,p.iteration)-1)/(memoryFactor-1);
          for (x = 0; x < (p.width/p.spacer); x += 1) {
            for (y = 0; y < (p.height/p.spacer); y += 1) {
              p.omega[x][y] = memoryFactor*p.omegaTminusone[x][y] + p.aliveTemp[x][y];
              if ((p.omega[x][y]/p.capOmega>0.5)) {
                p.alive[x][y] = 1;
              }
              if ((p.omega[x][y]/p.capOmega<0.5)) {
                p.alive[x][y] = 0;
              }
              p.omegaTminusone[x][y]=p.omega[x][y];
            }
          }
    }
  }

  p.insertLife = function(lifeformInstance=[[0]],xOffset = p.int(p.width/p.spacer/2), yOffset = p.int(p.height/p.spacer/2)) {
  lifeformInstance=lifeform;
  if (lifeformInstance.length==1) {
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