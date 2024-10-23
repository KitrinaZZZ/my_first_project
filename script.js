let count = 0;
let n = 20;
let x = [];
let y = [];
let s = [];
let speedX = [];
let speedY = [];
let dayX = 0;
let nightX = 1600;
let t = 0;
let smDayX = 0;
let smDayY = 0;
let smNightX = 0;
let smNightY = 0;
let s1 = 40;
let time = 0; 
let angle = 0;
let transitionProgress = 0;  // Tracks day-night transition progress
let isDayTime = true; 

function setup() {
  let canvas=createCanvas(800, 500);
  background(0);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0);
  //handleDayNightTransition();
  //let skyColor = lerpColor(color(173, 216, 230), color(123, 140, 148), transitionProgress);
  //fill(skyColor);
  //rect(dayX, 0, width*2, height); 
  fill(173, 216, 230);
  rect(dayX, 0, width * 2, height);
  //fill(224,216, 230);
  daybg();
  rectMode(CORNER);
  fill(255, 25, 25);
  ellipse(dayX + width, 50, 50, 50);

  growGrass();
  
  fill(123, 140, 148);

  rect(nightX, 0, width * 2, height);
  fill(242, 191, 70);
  ellipse(nightX + width, 50, 50, 50);
  fill(123, 140, 148);
  ellipse(nightX + width + 20, 50, 50, 50);
  fill(255);
  ellipse(nightX+random(width), random(height), 4, 4);
  fill(255);
  ellipse(nightX+random(width), random(height), 4, 4);
  fill(255);
  ellipse(nightX+random(width), random(height), 4, 4);

  dayX -= 2;
  nightX -= 2;
  if (dayX <= -width * 2) {
    dayX = width * 2;
  }

  if (nightX <= -width * 2) {
    nightX = width * 2;
  }

  noStroke();

  push();

  snDayX = width * noise(frameCount * 0.01);
  smDayY = height * noise(frameCount * 0.005);

  let offsetX = snDayX;
  let offsetY = smDayY;
  if (nightX <= 0) {
    smNightX = lerp(smNightX, mouseX, 0.05);
    smNightY = lerp(smNightY, mouseY, 0.05);
    offsetX = smNightX;
    offsetY = smNightY;
  }

  translate(offsetX - (width / 2 - 80), offsetY - height / 2);
  let lengths = [300, 320, 280, 350, 310, 330];
  for (let i = 0; i < lengths.length; i++) {
    tentacles(width / 3 + i * 20, height / 2, lengths[i]); // Call tentacles at varying x positions with fixed lengths
  }

  if (nightX <= 0) {
    
    fill(95, 205, 114);
    scale(1.2);
    translate(131 - 45, 44 - 25);
  } else {
    fill(255);
    translate(131, 44);
  }
  noStroke();
  beginShape();
  curveVertex(noise(t) * 10 + 120, noise(t + 10) * 10 + 201);
  curveVertex(noise(t) * 10 + 120, noise(t + 10) * 10 + 201);
  curveVertex(noise(t + 20) * 10 + 145, noise(t + 30) * 10 + 198);
  curveVertex(noise(t + 40) * 10 + 181, noise(t + 50) * 10 + 198);
  curveVertex(noise(t + 60) * 10 + 214, noise(t + 70) * 10 + 199);
  curveVertex(noise(t + 80) * 10 + 252, noise(t + 90) * 10 + 200);
  curveVertex(noise(t + 100) * 10 + 250, noise(t + 110) * 10 + 168);
  curveVertex(noise(t + 120) * 10 + 239, noise(t + 130) * 10 + 133);
  curveVertex(noise(t + 140) * 10 + 227, noise(t + 150) * 10 + 98);
  curveVertex(noise(t + 160) * 10 + 208, noise(t + 170) * 10 + 72);
  curveVertex(noise(t + 180) * 10 + 183, noise(t + 190) * 10 + 67);
  curveVertex(noise(t + 200) * 10 + 152, noise(t + 210) * 10 + 83);
  curveVertex(noise(t + 220) * 10 + 132, noise(t + 230) * 10 + 111);
  curveVertex(noise(t + 240) * 10 + 124, noise(t + 250) * 10 + 150);
  curveVertex(noise(t + 260) * 10 + 117, noise(t + 270) * 10 + 173);
  curveVertex(noise(t + 280) * 10 + 118, noise(t + 290) * 10 + 201);
  curveVertex(noise(t + 280) * 10 + 118, noise(t + 290) * 10 + 201);
  endShape();
  t += 0.01;
  pop();
  move();
  for (let i = x.length - 1; i >= 0; i--) {
    drawFace(x[i], y[i], s[i]);
    overlap(x[i], y[i], s[i], i);
  }
}

// Tentacle function with length parameter
function tentacles(x, y, length) {
  noFill();
  stroke(255);
  push();
  translate(x, y);

  for (let i = 0; i < length; i += 10) {
    let j = 10 * sin((frameCount - i) / 50);
   
    fill(255);
    if (nightX <= 0) {
      j = 10 * sin(i / 50);
      noStroke();
      fill(140, 51, 5);
    }
    let s = map(i, 0, length, 10, 1);
    circle(j, i / 4, s);
  }
  pop();
}
function drawGrass(x1, y1, x2, y2) {
noStroke();
  beginShape();
  curveVertex(x1 - 20, y1); 
  curveVertex(x1, y1);
  curveVertex(x2, y2);
  curveVertex(x2 + 20, y1);
  endShape();
}
function drawFace(x, y, s) {
  push();
  translate(x, y);
  rotate(0.5 * sin(frameCount * 0.1));
  fill(255, 150);
  noStroke();
  circle(0, s * 0.2, s);
  circle(0, 0, s / 4);
  pop();
}

function move() {
  for (let i = 0; i < x.length; i++) {
    (x[i] = width * 1* noise(frameCount * speedX[i])),0.01;
    (y[i] = height * 1.5 * noise(frameCount * speedY[i])), 0.01;
  }
}
function growGrass(){
  fill(34, 139, 34);
    for (let i = 0; i < 100; i++) {
    let x1 = random(width);
    let y1 = height;
    let x2 = x1 + random(-30, 30);
    let y2 = random(height - 150, height - 100);
    drawGrass(x1, y1, x2, y2);
  }
}
function handleDayNightTransition() {
  // Update transition progress based on whether it's day or night
  if (isDayTime) {
    transitionProgress += 0.001; // Transition to night
    if (transitionProgress >= 1) {
      transitionProgress = 1;
      isDayTime = false; // Now it's night
    }
  } else {
    transitionProgress +=0.01; // Transition back to day
    if (transitionProgress <= 0) {
      transitionProgress = 0;
      isDayTime = true; // Now it's day again
    }
  }
}
function overlap(xx, yy, ss, index) {
  let offsetX = width / 2;
  let offsetY = height / 2;
  if (nightX <= 0) {
    offsetX = mouseX;
    offsetY = mouseY;
  }
  if (dist(offsetX, offsetY - height / 1.5 / 4, xx, yy) < 65 + ss / 4 / 2) {
    x.splice(index, 1);
    y.splice(index, 1);
    s.splice(index, 1);
    speedX.splice(index, 1);
    speedY.splice(index, 1);
  }
}
function daybg(){
  rectMode(CENTER);
  noStroke();

  time+=0.05;

    for(let x= s1/2;x<width;x+=s1){
    for(let y = s1/2;y < width;y += s1){
      let d = dist(x,y,mouseX,mouseY);
      let s2 = map(d,0,550,100,0.1);
      angle = map(d,0,600,0,2*PI);
      let d1= dist(x,y, width / 2, height / 2);
      let wave = cos(mouseX*0.05-d1*0.05) * 0.5 + 0.5;
      let hueValue = map(wave, 0, 1, 130,240);
      let saturationValue = map(wave, 0, 1, 210, 240); 
      let brightnessValue = 230; 
      fill(hueValue, saturationValue, brightnessValue);
      
      
      push();
      translate(x,y);
      rotate(angle);
      rect(dayX,0,s1,s1);
      pop();
    }
  }
}
function mousePressed() {
  x.push(random(width));
  y.push(random(height));
  s.push(random(30, 100));
  speedX.push(random(0.001, 0.01));
  speedY.push(random(0.001, 0.01));
}