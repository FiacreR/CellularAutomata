let distances = [];
let resetdistances = [];
let distance2 = [];
let maxDistance;
let spacer;
let rule;
let ruleN = 90;
let table;

function setup() {
  var canvas = createCanvas(700, 360);
  canvas.parent('canvasForHTML');
  spacer = 10;
  newset();
  reset();
  fill(20,20,20);
  rect(-2, -2, width+4, height+4);
  table = loadTable('glider.csv')
  console.log(table)

  let button = select('#start');
  button.mousePressed(reset);


}

function draw() {
  if(frameCount % 5 === 0){
    fill(20,20,20);
    rect(-2, -2, width+4, height+4);
    stroke(0,0,0);
    fill(0,150,0);
    display();
    applyRule();
  }
}

function newset() {
    for (let x = 0; x <= (width/spacer); x += 1) {
    distances[x] = []; // create nested array
    distance2[x] = []
    resetdistances[x] = [];
    for (let y = 0; y < (height/spacer); y += 1) {
      distances[x][y] = 0;
      resetdistances[x][y] = 0;
      distance2[x][y] = 0;
    }
  }
}

function reset() {
    for (let x = 0; x <= (width/spacer); x += 1) {
    for (let y = 0; y < (height/spacer); y += 1) {
      distances[x][y] = int(table.getString(x, y));
    }
  }
}

function calculateRule(ruleNumber) {
    if (ruleNumber == 1) {rule='00000001'} else {
    rule=ruleNumberToRules(ruleNumber)
    while (rule.length<8) {
      rule = '0' + rule;
    }
  }
  if (ruleNumber == 0) {rule='00000000'}
  rule = [int(rule[0]),int(rule[1]),int(rule[2]),int(rule[3]),int(rule[4]),int(rule[5]),int(rule[6]),int(rule[7])]
  return rule
}

function ruleNumberToRules(val, res = '') {
  if (val >= 2) {
    if (res=='') {res = val % 2  + res} else {res = val % 2  + res}
    return ruleNumberToRules(val = int(val / 2), res);
  }
  if (val == 1){
    res = '1' + res;
    return res;
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
  for (let x = 0; x <= (width/spacer); x += 1) {
    for (let y = 0; y < (height/spacer); y += 1) {
      distance2[x][y] = 0;
    }
  }
  for (let y = (height/spacer); y >= 0; y--) {
    for (let x = 1; x < (width/spacer)-1; x++) {
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
  for (let x = 0; x <= (width/spacer); x += 1) {
    for (let y = 0; y < (height/spacer); y += 1) {
      distances[x][y] = distance2[x][y];
    }
  }
}
