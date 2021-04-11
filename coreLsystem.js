const s = ( p ) => {
  p.applyRule = function() {
      p.display();
      if (iteration>maxIteration) {p.stopIterating()}
      stepSize *= scalingNormalisationFactor;
      iteration += 1;
      sentence = sentence.replace(letterToBeReplaced, function(matched){
        return rules[matched];
      });
  }

  p.display = function() {
      p.colorMode(p.RGB);
      p.background(20,20,20);
      p.colorMode(p.HSB, 1);
      p.stroke(0.5, 0.95, 0.85);
      p.strokeWeight(2);
      p.resetMatrix();
      p.translate(p.width/initialXdivider+p.initialStepSize/2, p.height/initialYdivider+p.initialStepSize/2);
      for (i = 0; i < sentence.length; i++) {
          p.letter = sentence[i];
          switch (p.letter) {
            case 'F':
              p.line(0, 0, 0, -stepSize);
              p.translate(0, -stepSize);
              break;
            case 'G':
              p.line(0, 0, 0, -stepSize*1);
              p.translate(0, -stepSize*1);
              break;
            case 'f':
              p.translate(0, -stepSize);
              break;
            case '+':
              p.rotate(p.radians(angleIncrement));
              break;
            case '-':
              p.rotate(p.radians(-angleIncrement));
              break;
            case '[':
              p.push();
              break;
            case ']':
              p.pop();
              break;
          }
      }
  }

  p.stopIterating = function() {
      clearInterval(interval);
  }

  p.setup = function() {
      p.createCanvas(720, 560);
      p.initialStepSize = stepSize;
      p.applyRule();
      interval = setInterval(p.applyRule, 400);
  }
}