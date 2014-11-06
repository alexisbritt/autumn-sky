
 
 
/*
    This is a basic particle system.  The particles move around and are
    either attracted to or repelled from the mouse.
     
    Particle System
    Particles:
      Member variables
        - position
        - velocity
        - acceleration
         
      Methods:
        - constructor
        - update()
        - draw()
     
*/
 var pArray;                // declare p - p is null!

 
function setup()
{
    size( 500, 500 );      // set screen size
    noStroke();            // don't draw any strokes around shapes
    smooth();              // turn on anti-aliasing
     
 
    pArray = new Particle[10000];    // set up my array of Particles with 50 elements
     
    // loop through the Particle array (pArray) and instantiate new particles
    // for each element and set each one with a random velocity
    for( var i=0; i<pArray.length; i++ )
    {
        pArray[i] = new Particle( random( width ), random( height ), 0 );
        pArray[i].vel.set( random(-1, 1), random(-1, 1), 0 );
    }
     
}
 
/**
This is a processing function.  It gets called automatically 25 times a second. 
You can make it update faster by setting frameRate( n ) in setup (where n is a number
of frames per second)
*/
function draw()   
{
    background( 0 );        // set background to black, erase old drawing
     
    for ( var i=0;i<pArray.length;i++ )
    {
        pArray[i].update();             // update the particle
        pArray[i].draw();               // draw the particle
    }
     

}
 
/**
This is a processing function.  It gets called automatically whenever the user releases
a mouse button
*/
function mouseIsReleased()
{
    println( "Mouse released!" );
    for ( var i=0;i<pArray.length;i++ )          // loop through all particles, and for each one...
    {
        pArray[i].attract = !pArray[i].attract;  // ...use NOT (!) to flip true to false and vice versa
        // eg: !true == false
        // so, if attract == true then !attract == false (note the exclamation mark)
  }
}
 
/**
This is a processing function - it gets called automatically
whenever the use released a key on the keyboard
*/
function touchEnded()
{
    if ( key == ' ' )    // check which key was pressed - note the single quotes ''
    {
        exit();          // quit the program
    }
}
 
 
/**
This is out particle class - it first defines member variables, thena constructor, and then
it defines methods.
*/
var Particle
{
 
    // member variables
    PVector pos;    // pos.x pos.y pos.z
    PVector vel;    // vel.x vel.y vel.z
    PVector acc;    // acc.x acc.y acc.z
     
    boolean attract;    // true is particles should move toward the mouse, false otherwise
     
    /**
    Constructor method - used with new, as in
    Particle p = new Particle( x, y, z );
    */
    Particle( var x, var y, var z )
    {
        // instantiate the vectors so we don't get null pointer exceptions
        pos = new PVector(x, y, z);   // set the position based on parameters
        vel = new PVector();
        acc = new PVector();
        attract = true;               
    } 
     
    /**
    update() - call once each frame to update the position of the particle
    */
    function update()
    {
        mouseAttract();               // change acc to make particles accelerate toward the mouse
        vel.add( acc );               // apply acceleration to velocity
        pos.add( vel );               // add velocity to positon (move particle)
        vel.mult( 0.98f );            // apply friction (otherwise particles end up moving too fast)
        bounce();                     // bounce off edges of screen
        acc.set( 0, 0, 0 );           // reset acceleration - we calculate is fresh each loop
    }  // end of Particle.update()
     
    /**
    draw() - call once each frame to draw the particle on the screen
    */
    function draw()
    {
        colorMode( HSB, 1.0f, 1.0f, 1.0f );  // use an HSB colour model
        fill( vel.mag(), 1.0f, 1.0f );       // set the particle colour based upon its speed
        colorMode( RGB, 255, 255, 255 );     // return to the default colour model
        ellipse( pos.x, pos.y, 3, 3 );       // draw the particle
    }  // end of Particle.draw()
     
     
    /**
    bounce() - calculate bounces if the particle hits a screen edge
     
    */
    function bounce()
    {
         
        if ( pos.x < 0 || pos.x > width )  // check particle position - is it off the screen in x?
        {
            vel.x *= -1.0f;                // reverse x velocity
        }
         
        if ( pos.y < 0 || pos.y > height )  // check particle position - is it off the screen in x?
        {
            vel.y *= -1.0f;                  // reverse y velocity
        }
    }  // end of bounce()
     
    /**
    mouseAttract()
    Move particles towards or away from the mouse
    by doing some basic vector math to determine the
    relationship between the particle and the mouse
    and based on that, calcuating an appropriate acceleration to
    move the particle either away from or to the mouse
    */
    function mouseAttract()
    {
        var magnetism;          // magnetism factor - +tve values attract
         
        if ( attract == true )     // check if this particle should be attracted or repulsed
        {
            magnetism = 1.0f;      // make particles be attracted to the mouse
        }
        else
        {
            magnetism = -1.0f;    // make particles be repulsed by the mouse
        }
         
        PVector mouse = new PVector( mouseX, mouseY ); // create mouse pos as a vector
        mouse.sub( pos );                              // subtract mouse pos from particle pos
        // mouse now contains the difference vector between this particle
        // and the mouse
        float magnitude = mouse.mag();  // find out how far the particle is from the mouse
        acc.set( mouse );               // store this as the acceleration vector
         
        acc.mult( magnetism / (magnitude * magnitude) );  // scale the attraction/repuse effect using
                                                          // an inverse square
    }  // end of mouseAttract()
     
}  // end of particle class
