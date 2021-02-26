const s = ( p ) => {
  p.alive = [];
  p.aliveTemp = [];
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
    p.spacer = 10;
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
  }

  p.reset = function() {
    p.clearScreen();
        p.insertLife();
  }

  p.clearScreen = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.alive[x][y] = 0;//p.int(p.random(1.01));
      }
    }
  }

  p.display = function() {
    for (x = 0; x < (p.width/p.spacer); x += 2) {
        for (y = 0; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] ==1) {
            p.fill(60,100,200);
            p.hexagon(x*p.spacer*3/2,y*p.spacer*p.sqrt(3)/2,p.spacer)
          }
        }
      }
      for (x = 1; x < (p.width/p.spacer); x += 2) {
        for (y = 1; y < (p.height/p.spacer); y += 2) {
          if (p.alive[x][y] ==1) {
            p.fill(60,100,200);
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
        p.aliveTemp[x][y] = 0;//p.alive[x][y];
      }
    }
    p.simHeight = p.alive[0].length;
    p.simLength = p.alive.length;
    for (y = 0; y < p.simHeight; y += 1) {
      for (x = 0; x < p.simLength; x+= 1) {
        // Any dead cell with two living neighbours becomes alive
          if((p.alive[x][y]==0)
            &&((p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+2+p.simHeight)%p.simHeight]
            +p.alive[x][(y-2+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])==(2))) {p.aliveTemp[x][y]=1}
        // Any living cell with three living neighbours stays alive
          if((p.alive[x][y]==1)
            &&((p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+2+p.simHeight)%p.simHeight]
            +p.alive[x][(y-2+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])==(3))) {p.aliveTemp[x][y]=1}
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

let spaceship = [[0,0,0,0,0,0,1,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,1,0,0,0,1],
                [0,0,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,1,0,0,0,1],
                [0,0,0,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,1,0,0,0,0]]

let lifeform = spaceship;
let on = 1;
myp5 = new p5(s, 'canvas1');

function turnon(lifein=spaceship) {
  lifeform=lifein;
  myp5.remove();
  myp5 = new p5(s, 'canvas1');
}
