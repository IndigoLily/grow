function circle() {
  this.pos = createVector( random(width), random(height) );
  this.isWhite = (Math.random() < .5);
  this.diameter = 1/random(1,2);
}

circle.prototype.draw = function() {
  this.diameter *= 1.01;
  noStroke();
  fill( this.isWhite ? 255 : 0 );
  ellipse( this.pos.x, this.pos.y, this.diameter, this.diameter );
}

var circles = [];

function setup() {
  createCanvas( windowWidth, windowHeight );
}

function draw() {
  if( frameCount % 6 === 0 ) {
    circles.push( new circle() );
  }
  var flags = [];
  
  // Draw circles
  for( let i = 0; i < circles.length; i++ ) {
    circles[i].draw();
    
    // Flag circles for removal
    if( circles[i].diameter / 2 > max( width, height ) ) {
      flags.push(i);
    }
  }
  
  // Remove circles
  for( let i = flags.length - 1; i >= 0; i-- ) {
    circles.splice(i,1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}

// Create circle object that grows until a certain diameter and then is removed
