let alive = [];
let resetalive = [];
let maxDistance;
let spacer;
let rule;
let offset = 0.3331;
let slider;

function setup() {
  var canvas = createCanvas(700, 360);
  canvas.parent('canvasForHTML');
  spacer = 10;
  newset();
  alive[int(width/spacer/2)-1][0] = 1;
  fill(20,20,20);
  rect(-2, -2, width+4, height+4);


  let button = select('#start');
  button.mousePressed(reset);
  slider = select('#offsetSlider');
}

function draw() {
  if(frameCount % 5 === 0){
    offset = slider.value()/1000;
    fill(20,20,20);
    rect(-2, -2, width+4, height+4);
    stroke(0,0,0);
    fill(0,150,0);
    display();
    moveDown();
    applyRule();
  }
}

function newset() {
    for (let x = 0; x <= (width/spacer); x += 1) {
    alive[x] = []; // create nested array
    resetalive[x] = [];
    for (let y = 0; y < (height/spacer); y += 1) {
      alive[x][y] = 0;
      resetalive[x][y] = 0;
    }
  }
}

function reset() {
    for (let x = 0; x <= (width/spacer); x += 1) {
    for (let y = 0; y < (height/spacer); y += 1) {
      alive[x][y] = 0;
      alive[int(width/spacer/2)-1][0] = 1;
    }
  }
}

function display() {
  for (let x = 0; x < (width/spacer); x += 1) {
      for (let y = 0; y < (height/spacer); y += 1) {
          fill(0,150*alive[x][y],0);
          square(x*spacer, y*spacer,8,2);
      }
    }
}

function moveDown() {
    for (let y = (height/spacer); y >= 0; y--) {
    for (let x = 0; x < (width/spacer); x++) {
      alive[x][y+1] = alive[x][y]
    }
  }
}

function applyRule() {
    for (let x = 1; x < (width/spacer)-1; x++) {
        alive[x][0] = ((alive[x-1][1]+alive[x][1]+alive[x+1][1]) + offset)%1;
    }
    // x = 0  
    alive[0][0] = ((alive[width/spacer][1]+alive[0][1]+alive[1][1])+offset)%1;

    // x = width/spacer
    alive[width/spacer][0]= ((alive[width/spacer-1][1]+alive[width/spacer][1]+alive[0][1])+offset)%1;
}
