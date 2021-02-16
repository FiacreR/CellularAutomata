let distances = [];
let resetdistances = [];
let distance2 = [];
let maxDistance;
let spacer;
let rule;
let ruleN = 90;

function setup() {
  var canvas = createCanvas(700, 360);
  canvas.parent('canvasForHTML');
  spacer = 10;
  init();
  reset();
  fill(20,20,20);
  rect(-2, -2, width+4, height+4);
  let button = select('#start');
  button.mousePressed(clearScreen);
  let gliderButton = select('#glider');
  gliderButton.mousePressed(function() {insertLife(glider);});
  let lightweightButton = select('#lightweight');
  lightweightButton.mousePressed(function() {insertLife(lightweight);});
  let mediumweightButton = select('#mediumweight');
  mediumweightButton.mousePressed(function() {insertLife(mediumweight);});
  let heavyweightButton = select('#heavyweight');
  heavyweightButton.mousePressed(function() {insertLife(heavyweight);});
  frameRate(20);
}

function draw() {
    fill(20,20,20);
    rect(-2, -2, width+4, height+4);
    stroke(0,0,0);
    fill(0,150,0);
    display();
    applyRule();
}

function init() {
    for (let x = -10; x <= (width/spacer)+10; x += 1) {
    distances[x] = []; // create nested array
    distance2[x] = []
    for (let y = -10; y < (height/spacer)+10; y += 1) {
      distances[x][y] = 0;
      distance2[x][y] = 0;
    }
  }
}

function reset() {
  clearScreen();
  insertLife();
}

function clearScreen() {
  for (let x = -10; x < (width/spacer)+10; x += 1) {
    for (let y = -10; y < (height/spacer)+10; y += 1) {
      distances[x][y] = 0;
    }
  }
}

function display() {
  for (let x = 0; x < (width/spacer); x += 1) {
      for (let y = 0; y < (height/spacer); y += 1) {
        if (distances[x][y] ==1) {
          square(x*spacer, y*spacer,8,2);
        }
      }
    }
}

function applyRule() {
  for (let x = -10; x <= (width/spacer)+10; x += 1) {
    for (let y = -10; y < (height/spacer)+10; y += 1) {
      distance2[x][y] = distances[x][y];
    }
  }
  for (let y = -9; y < (height/spacer)+9; y += 1) {
    for (let x = -9; x < (width/spacer)+9; x++) {
      // Outside area cell disapear
        if((x<-5)||(x>(width/spacer+5))||(y<-5)||(y>(height/spacer+5))) {distance2[x][y]=0}
      // Any live cell with fewer than two live neighbours dies, as if by underpopulation
        if((distances[x][y]==1)
          &&((distances[x-1][y+1]
          +distances[x-1][y]
          +distances[x-1][y-1]
          +distances[x][y+1]
          +distances[x][y-1]
          +distances[x+1][y+1]
          +distances[x+1][y]
          +distances[x+1][y-1])<(2))) {distance2[x][y]=0}
      // Any live cell with two or three live neighbours lives on to the next generation
        if((distances[x][y]==1)
          &&((distances[x-1][y+1]
          +distances[x-1][y]
          +distances[x-1][y-1]
          +distances[x][y+1]
          +distances[x][y-1]
          +distances[x+1][y+1]
          +distances[x+1][y]
          +distances[x+1][y-1])==(2||3))) {distance2[x][y]=1}
      // Any live cell with more than three live neighbours dies, as if by overpopulation
        if((distances[x][y]==1)
          &&((distances[x-1][y+1]
          +distances[x-1][y]
          +distances[x-1][y-1]
          +distances[x][y+1]
          +distances[x][y-1]
          +distances[x+1][y+1]
          +distances[x+1][y]
          +distances[x+1][y-1])>(3))) {distance2[x][y]=0}
      // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
        if((distances[x][y]==0)
          &&((distances[x-1][y+1]
          +distances[x-1][y]
          +distances[x-1][y-1]
          +distances[x][y+1]
          +distances[x][y-1]
          +distances[x+1][y+1]
          +distances[x+1][y]
          +distances[x+1][y-1])==(3))) {distance2[x][y]=1}
    }
  }
  for (let x = -10; x <= (width/spacer)+10; x += 1) {
    for (let y = -10; y < (height/spacer)+10; y += 1) {
      distances[x][y] = distance2[x][y];
    }
  }
}

function insertLife(lifeformInstance=glider,xOffset = int(width/spacer/2), yOffset = int(height/spacer/2)) {
    for (let x = 0; x < lifeformInstance.length; x += 1) {
    for (let y = 0; y < lifeformInstance[0].length; y += 1) {
      distances[xOffset+x][yOffset+y] = lifeformInstance[x][y];
    }
  }
}
