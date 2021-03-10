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

  p.draw = function() {
    p.colorMode(p.RGB);
    p.fill(20,20,20);
    p.rect(-2, -2, p.width+4, p.height+4);
    p.stroke(0,0,0);
    p.colorMode(p.HSB, 1);
    p.display();
    p.applyRule();
  }

  p.init = function() {
    p.alive = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.aliveTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.total = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.omega = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.omegaTminusone = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
   }

  p.display = function() {
    p.alive.map(function(x,indexX) {
      x.map(function(y,indexY){
        if(y>0){
          p.fill(((y-1)/(5*(numberOfStates-1))+0.6)%1,0.95,0.85);
          p.square(indexX*p.spacer, indexY*p.spacer,p.spacer*0.8,p.spacer*0.2);
        }
      })
    })
  }
  p.applyRule = function() {
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