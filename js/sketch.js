var num = 35;
var frames = 90;
var angle;
var sound,
    fft,
    amp,
    ampScale = 50;

function preload() {
  background(255);
    sound = loadSound('audio/bass.mp3');
    // "Keg Baseball" by Centz, thank you freemusicarchive.com http://hope.ly/1J1BvZS

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  smooth();

  sound.play();

  

  // amp = new p5.Amplitude(); // Measures overall volume between 0.0 and 1.0
  amp = new p5.Amplitude(.75); // Adding a number between 0.0 and .999 will smooth the amplitude reading

    fft = new p5.FFT();
    fft = new p5.FFT( .5, 16 ); // Smoothing and length of the resulting array must be a power of two between 16 and 1024

  angle = 0;

}

function draw() {
  background(20);
  stroke(240);
  noFill();



  var level = amp.getLevel() * ampScale; // Get the amplitude level in a 0.0 - 1.0 range then scaling it by ampScale
  var freq = fft.analyze();

  for (var i=0; i<num; i++) {
    var diameter = windowWidth*level/num;
    var size = i*diameter;
    var ring = map(sin(angle+PI/num*i), -1, 1, 1, diameter*.8);
    strokeWeight(ring);
    ellipse(windowWidth/2, windowHeight/2, size, size);
  }

  angle -= PI/frames;
  
}


