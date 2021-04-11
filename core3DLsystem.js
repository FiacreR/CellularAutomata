    function addGround() {
      const geometry0 = new THREE.CylinderGeometry(4,3,1,50);
      const material0 = new THREE.MeshLambertMaterial( { color: 0x59A610 } );
      const ground = new THREE.Mesh( geometry0, material0 );
      ground.position.set(0,-maxIteration*stepSize/2,0)
      group.add( ground );
    }

    function makeNewSegment(color, x, y, z, h, diameter = 0.2) {
      color6 = new THREE.Color("hsl(0, 100%, 50%)");
      color6.setHSL(colorOffset,0.62,0.66)
      var material = new THREE.MeshLambertMaterial({color: color6});
      var geometry = new THREE.CylinderGeometry(diameter, diameter, stepSize, 20);
      geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, stepSize/2, 0 ) );
      var cylinder = new THREE.Mesh(geometry, material);
      var axis = new THREE.Vector3(0, 1, 0);
      cylinder.quaternion.setFromUnitVectors(axis, h.clone().normalize());
      cylinder.position.x = x;
      cylinder.position.y = y;
      cylinder.position.z = z;
      group.add(cylinder);
      return group;
    }

    function makeNewCube(color, x, y, z, h) {
      var material = new THREE.MeshLambertMaterial({color: 0x008000});
      var geometry = new THREE.BoxGeometry(stepSize,stepSize,stepSize);
      geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
      var cube = new THREE.Mesh(geometry, material);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      group.add(cube);
      return cube;
    }

    function applyRule() {
      iteration += 1;
      sentence = sentence.replace(letterToBeReplaced, function(matched){
        return rules[matched];
      });
    }

    function display (shape = "cylinder") {
      let position = new THREE.Vector3( x, y, z );
      let heading = new THREE.Matrix3();
      heading.set(
        0, 1, 0,
        1, 0, 0,
        0, 0, -1
        );
      let savedPosition = new THREE.Vector3( 0, 0, 0 );
      let savedHeading = new THREE.Matrix3();
      let savedCharacteristics = [];

      for (i = 0; i < sentence.length; i++) {
        letter = sentence[i];
        switch (letter) {
          case 'F':
          headingVector = new THREE.Vector3(
            heading.elements[0],
            heading.elements[1],
            heading.elements[2]
            );
          if (shape == "cylinder") {
            makeNewSegment(0x44aa88,  position.x, position.y, position.z,headingVector,diameter)
          } else if (shape == "cube") {
            makeNewCube(0x44aa88,  position.x, position.y, position.z)
          }
          position.addScaledVector(headingVector, stepSize);           
          break;
          case 'f':
          headingVector = new THREE.Vector3(
            heading.elements[0],
            heading.elements[1],
            heading.elements[2]
            );
          position.addScaledVector(headingVector, stepSize);           
          break;
          case '+':
          alpha = -angleIncrement/180*Math.PI;
          var rotationMatrixU = new THREE.Matrix3();
          rotationMatrixU.set(
            Math.cos(alpha), Math.sin(alpha), 0,
            -Math.sin(alpha), Math.cos(alpha), 0,
            0, 0, 1);
          heading.multiply(rotationMatrixU);
          break;
          case '-':
          alpha =  angleIncrement/180*Math.PI;
          var rotationMatrixU = new THREE.Matrix3();
          rotationMatrixU.set(
            Math.cos(alpha), Math.sin(alpha), 0,
            -Math.sin(alpha), Math.cos(alpha), 0,
            0, 0, 1);
          heading.multiply(rotationMatrixU);
          break;
          case '&':
          alpha = -angleIncrement/180*Math.PI;
          var rotationMatrixL = new THREE.Matrix3();
          rotationMatrixL.set(
            Math.cos(alpha), 0, -Math.sin(alpha),
            0, 1, 0,
            Math.sin(alpha), 0, Math.cos(alpha));
          heading.multiply(rotationMatrixL);
          break;
          case '∧':
          alpha =  angleIncrement/180*Math.PI;
          var rotationMatrixL = new THREE.Matrix3();
          rotationMatrixL.set(
            Math.cos(alpha), 0, -Math.sin(alpha),
            0, 1, 0,
            Math.sin(alpha), 0, Math.cos(alpha));
          heading.multiply(rotationMatrixL);
          break;
          case '\\':
          alpha = -angleIncrement/180*Math.PI;
          var rotationMatrixH = new THREE.Matrix3();
          rotationMatrixH.set(
            1, 0, 0,
            0, Math.cos(alpha), -Math.sin(alpha),
            0, Math.sin(alpha), Math.cos(alpha));
          heading.multiply(rotationMatrixH);
          break;
          case '/':
          alpha =  angleIncrement/180*Math.PI;
          var rotationMatrixH = new THREE.Matrix3();
          rotationMatrixH.set(
            1, 0, 0,
            0, Math.cos(alpha), -Math.sin(alpha),
            0, Math.sin(alpha), Math.cos(alpha));
          heading.multiply(rotationMatrixH);
          break;
          case '|':
          alpha =  Math.PI;
          var rotationMatrixU = new THREE.Matrix3();
          rotationMatrixU.set(
            Math.cos(alpha), Math.sin(alpha), 0,
            -Math.sin(alpha), Math.cos(alpha), 0,
            0, 0, 1);
          heading.multiply(rotationMatrixU);
          break;
          case '[':
            var characteristics = {
                position : position.clone(),
                heading : heading.clone(),
                diameter : diameter,
                colorOffset : colorOffset
            };
            savedCharacteristics.push(characteristics);
          break;
          case ']':
            var characteristics = savedCharacteristics.pop();
              position = characteristics["position"];
              heading = characteristics["heading"];
              diameter = characteristics["diameter"];
              colorOffset = characteristics["colorOffset"];
          break;
          case '!':
            diameter = diameter/1.5;      
          break;
          case '’':
            colorOffset += 0.35/maxIteration;
          break;
        }
      }
        console.log(heading)
    }

    function animate() {
      requestAnimationFrame( animate );
      group.rotation.y += 0.005;
      renderer.render( scene, camera );
    }