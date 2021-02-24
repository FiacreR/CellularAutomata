const s = ( p ) => {
  p.distances = [];
  p.resetdistances = [];
  p.distance2 = [];
  p.maxDistance;
  p.spacer;
  p.rule;
  p.ruleN = 90;
  p.omega = [];
  p.omegaTminusone = [];
  p.capOmega;
  p.iteration = 0;

  p.setup = function() {
    p.createCanvas(720, 560);
    p.spacer = 5;
    p.init();
    p.reset();
    p.fill(20,20,20);
    p.rect(-2, -2, p.width+4, p.height+4);
    p.frameRate(2);
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
      for (x = 0; x < (p.width/p.spacer); x += 1) {
      p.distances[x] = []; // create nested array
      p.distance2[x] = []
      p.omega[x] = [];
      p.omegaTminusone[x] = [];
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.distances[x][y] = 0;
        p.distance2[x][y] = 0;
        p.omega[x][y] = 0;
        p.omegaTminusone[x][y] = 0;
      }
    }
  }

  p.reset = function() {
    p.clearScreen();
    p.insertLife();
  }

  p.clearScreen = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.distances[x][y] = 0;
      }
    }
  }

  p.display = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
        for (y = 0; y < (p.height/p.spacer); y += 1) {
          if (p.distances[x][y] ==1) {
            p.square(x*p.spacer, y*p.spacer,p.spacer*0.8,p.spacer*0.2);
          }
        }
      }
  }

  p.applyRule = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.distance2[x][y] = 0;//p.distances[x][y];
      }
    }
    p.simHeight = p.distances[0].length;
    p.simLength = p.distances.length;
    for (y = 0; y < p.simHeight; y += 1) {
      for (x = 0; x < p.simLength; x++) {
        // Cell alive if the number of neighbours is odd
          if(((p.distances[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.distances[(x-1+p.simLength)%p.simLength][y]
            +p.distances[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.distances[x][(y+1+p.simHeight)%p.simHeight]
            +p.distances[x][(y-1+p.simHeight)%p.simHeight]
            +p.distances[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.distances[(x+1+p.simLength)%p.simLength][y]
            +p.distances[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])==(1||3||5||7))) {p.distance2[x][y]=1}
        // Cell dead if the number of neighbours is even
          if(((p.distances[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.distances[(x-1+p.simLength)%p.simLength][y]
            +p.distances[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.distances[x][(y+1+p.simHeight)%p.simHeight]
            +p.distances[x][(y-1+p.simHeight)%p.simHeight]
            +p.distances[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.distances[(x+1+p.simLength)%p.simLength][y]
            +p.distances[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])==(0||2||4||6||8))) {p.distance2[x][y]=0}
      }
    }
    p.iteration += 1;
    p.capOmega = (p.pow(alpha,p.iteration)-1)/(alpha-1);
    console.log(p.capOmega)

    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.omega[x][y] = alpha*p.omegaTminusone[x][y] + p.distance2[x][y];
        if ((p.omega[x][y]/p.capOmega>0.5)) {
          p.distances[x][y] = 1;
        }
        if ((p.omega[x][y]/p.capOmega<0.5)) {
          p.distances[x][y] = 0;
        }
        p.omegaTminusone[x][y]=p.omega[x][y];
        //console.log(p.distances[x][y])
      }
    }
  }

  p.insertLife = function(lifeformInstance=lifeform,xOffset = p.int(p.width/p.spacer/2), yOffset = p.int(p.height/p.spacer/2)) {
      for (x = 0; x < lifeformInstance.length; x += 1) {
      for (y = 0; y < lifeformInstance[0].length; y += 1) {
        p.distances[xOffset+x-p.int(lifeformInstance.length/2)][yOffset+y-p.int(lifeformInstance[0].length/2)] = lifeformInstance[x][y];
        p.omega[xOffset+x-p.int(lifeformInstance.length/2)][yOffset+y-p.int(lifeformInstance[0].length/2)] = lifeformInstance[x][y];
      }
    }
  }
}

let lifeform = [[0,0,0],
                [0,1,0],
                [0,0,0]];
let alpha = 0.50007;
myp5 = new p5(s, 'canvas1');

