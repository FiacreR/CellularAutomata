let alive = [];
let resetalive = [];
let maxDistance;
let spacer;
let rule;
let ruleN = 90;
let slider0, slider1, slider2, slider3, slider4, slider5, slider6, slider7;

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

  slider0 = select('#slider0');
  slider1 = select('#slider1');
  slider2 = select('#slider2');
  slider3 = select('#slider3');
  slider4 = select('#slider4');
  slider5 = select('#slider5');
  slider6 = select('#slider6');
  slider7 = select('#slider7');
}

function draw() {
  if(frameCount % 5 === 0){
    fill(20,20,20);
    rect(-2, -2, width+4, height+4);
    stroke(0,0,0);
    fill(0,150,0);
    rule = calculateRule(ruleN)
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
        if (alive[x][y] ==1) {
          square(x*spacer, y*spacer,8,2);
        }
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
        if((alive[x-1][1]==1)&&(alive[x][1]==1)&&(alive[x+1][1]==1)) {alive[x][0] = int(random(0,1)+slider0.value()/100)}
        if((alive[x-1][1]==1)&&(alive[x][1]==1)&&(alive[x+1][1]==0)) {alive[x][0] = int(random(0,1)+slider1.value()/100)}
        if((alive[x-1][1]==1)&&(alive[x][1]==0)&&(alive[x+1][1]==1)) {alive[x][0] = int(random(0,1)+slider2.value()/100)}
        if((alive[x-1][1]==1)&&(alive[x][1]==0)&&(alive[x+1][1]==0)) {alive[x][0] = int(random(0,1)+slider3.value()/100)}
        if((alive[x-1][1]==0)&&(alive[x][1]==1)&&(alive[x+1][1]==1)) {alive[x][0] = int(random(0,1)+slider4.value()/100)}
        if((alive[x-1][1]==0)&&(alive[x][1]==1)&&(alive[x+1][1]==0)) {alive[x][0] = int(random(0,1)+slider5.value()/100)}
        if((alive[x-1][1]==0)&&(alive[x][1]==0)&&(alive[x+1][1]==1)) {alive[x][0] = int(random(0,1)+slider6.value()/100)}
        if((alive[x-1][1]==0)&&(alive[x][1]==0)&&(alive[x+1][1]==0)) {alive[x][0] = int(random(0,1)+slider7.value()/100)}
    }
    // x = 0  
        if((alive[width/spacer][1]==1)&&(alive[0][1]==1)&&(alive[1][1]==1)) {alive[0][0] = rule[0]}
        if((alive[width/spacer][1]==1)&&(alive[0][1]==1)&&(alive[1][1]==0)) {alive[0][0] = rule[1]}
        if((alive[width/spacer][1]==1)&&(alive[0][1]==0)&&(alive[1][1]==1)) {alive[0][0] = rule[2]}
        if((alive[width/spacer][1]==1)&&(alive[0][1]==0)&&(alive[1][1]==0)) {alive[0][0] = rule[3]}
        if((alive[width/spacer][1]==0)&&(alive[0][1]==1)&&(alive[1][1]==1)) {alive[0][0] = rule[4]}
        if((alive[width/spacer][1]==0)&&(alive[0][1]==1)&&(alive[1][1]==0)) {alive[0][0] = rule[5]}
        if((alive[width/spacer][1]==0)&&(alive[0][1]==0)&&(alive[1][1]==1)) {alive[0][0] = rule[6]}
        if((alive[width/spacer][1]==0)&&(alive[0][1]==0)&&(alive[1][1]==0)) {alive[0][0] = rule[7]}
    // x = width/spacer
        if((alive[width/spacer-1][1]==1)&&(alive[width/spacer][1]==1)&&(alive[0][1]==1)) {alive[width/spacer][0] = rule[0]}
        if((alive[width/spacer-1][1]==1)&&(alive[width/spacer][1]==1)&&(alive[0][1]==0)) {alive[width/spacer][0] = rule[1]}
        if((alive[width/spacer-1][1]==1)&&(alive[width/spacer][1]==0)&&(alive[0][1]==1)) {alive[width/spacer][0] = rule[2]}
        if((alive[width/spacer-1][1]==1)&&(alive[width/spacer][1]==0)&&(alive[0][1]==0)) {alive[width/spacer][0] = rule[3]}
        if((alive[width/spacer-1][1]==0)&&(alive[width/spacer][1]==1)&&(alive[0][1]==1)) {alive[width/spacer][0] = rule[4]}
        if((alive[width/spacer-1][1]==0)&&(alive[width/spacer][1]==1)&&(alive[0][1]==0)) {alive[width/spacer][0] = rule[5]}
        if((alive[width/spacer-1][1]==0)&&(alive[width/spacer][1]==0)&&(alive[0][1]==1)) {alive[width/spacer][0] = rule[6]}
        if((alive[width/spacer-1][1]==0)&&(alive[width/spacer][1]==0)&&(alive[0][1]==0)) {alive[width/spacer][0] = rule[7]}
}
