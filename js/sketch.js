var stars = [],
  numStars = 550;


function setup() {
  createCanvas(windowWidth,windowHeight);
  smooth();
  noStroke();
  for (var i=0; i<numStars; i++) {
    stars.push( new Star("twinkle") ); // fill the array with circles at random positions
  }

  for( var i=0; i<stars.length; i++ ){
        stars[i] = new Star( random( width ), random( height ), 0 );
        //stars[i].vel.set( 0, 0, 0);
    }
}

function update(){
    mouseAttract();               // change acc to make particles accelerate toward the mouse
}  


function draw() {
  background(0);
  for (var i=0; i<numStars; i++) {
    stars[i].show(); // display all the circles
    stars[i].move();
  }
}
 
function Star( type ) {
    this.xPos = random(windowWidth);
    this.yPos = random(windowHeight);
    this.xSpeed = random(0, .01);
    this.ySpeed = 0;
    this.color = color( random(245,255), random(245, 255), random(245, 255), random(150, 180));
    this.size = random(0.05, 4);
    this.type = type;
    this.attract = false;
} 
Star.prototype.show = function(){
  noStroke();
  fill( this.color, this.color[3]);
  ellipse( this.xPos, this.yPos, this.size, this.size);
}

Star.prototype.move = function(){
  this.xPos += this.xSpeed;
  this.yPos += this.ySpeed;

  if ((this.xPos > width) || (this.xPos <0)){
    this.xSpeed *= -0.5;
  }
  if ((this.yPos > height) || (this.yPos <0)){
    this.xSpeed *= -0.5;
  }
}

Star.prototype.randomize = function(){
  this.color = color( random(1,100),random(100, 155), random(100, 255), random(100, 255));
}

Star.prototype.sizeRandom = function(){
  this.size = random(0.5, 20);
}

// Newton's 2nd law: F = M * A
// or A = F / M
Star.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force,this.mass);
  this.acceleration.add(f);
};

Star.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};

// function mouseAttract(){
//     var magnetism;          // magnetism factor - +tve values attract
//         if (( this.attract == true )){     // check if this circle should be attracted or repulsed
//           this.magnetism = 5.0f;      // make particles be attracted to the mouse
//         }
//         else {
//           this.magnetism = -2.0f;    // make particles be repulsed by the mouse
//         }

//         var mouse = new PVector( mouseX, mouseY ); // create mouse pos as a vector
//         mouse.sub( xPos );                              // subtract mouse pos from particle pos
//         // mouse now contains the difference vector between this particle
//         // and the mouse
//         var magnitude = mouse.mag();  // find out how far the particle is from the mouse
//         acc.set( mouse );               // store this as the acceleration vector

//         acc.mult( magnetism / (magnitude * magnitude) );  // scale the attraction/repuse effect using
//                                                           // an inverse square
//     }  // end of mouseAttract()