const s = ( p ) => {
  p.alive = [];
  p.resetalive = [];
  p.aliveTemp = [];
  p.spacer;
  p.total = [];

  p.setup = function() {
    p.createCanvas(720, 560);
    p.spacer = 10;
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
    p.fill(0,150,0);
    p.display();
    p.applyRule();
  }

  p.init = function() {
    p.alive = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.aliveTemp = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
    p.total = Array(p.int(p.width/p.spacer)).fill().map(() => Array(p.int(p.height/p.spacer)).fill(0));
   }

  p.display = function() {
    p.alive.map(function(x,indexX) {
      x.map(function(y,indexY){
        if(y==1){
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
        p.total[x][y] = (p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]);
          if(p.alive[x][y]==1){
            for (i=0; i<=8;i++) {if (p.total[x][y]==i) {p.aliveTemp[x][y]=ruleKeep[i]}}
          }
          if(p.alive[x][y]==0){
            for (i=0; i<=8;i++) {if (p.total[x][y]==i) {p.aliveTemp[x][y]=ruleBirth[i]}}
          }
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