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

let isNight = false;
let dayColor, nightColor;
let transitionValue = 0;
let bgTime = 0;

function setup() {
  let canvas=createCanvas(800, 500);
  background(0);
  dayColor = color(173, 216, 230);
  nightColor = color(123, 140, 148);
  
  canvas.id("p5-canvas");

}

function draw() {
  let cc = lerpColor(dayColor, nightColor,transitionValue);
  
  background(cc);

  // 白天黑天切换时间间隔
  if (millis() - bgTime > 10000) {
    isNight = !isNight;
    bgTime = millis();
  }
  daybg();
  rectMode(CORNER);
  // 太阳、月亮
  if (isNight) {
    fill(242, 191, 70);
    ellipse(50, 50, 50, 50);
    fill(cc);
    ellipse(50 + 20, 50, 50, 50);
  } else {
    fill(255, 25, 25);
    ellipse(50, 50, 50, 50);
  }
  growGrass();

  
  noStroke();

  push();

  smDayX = width * noise(frameCount * 0.01);
  smDayY = height * noise(frameCount * 0.005);

  let offsetX = smDayX;
  let offsetY = smDayY;
  if (isNight) {
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

  if (isNight) {
    
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
    if (isNight) {
    transitionValue += 0.005;
  } else {
    transitionValue -= 0.005;
  }
  transitionValue = constrain(transitionValue, 0, 1);

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
    if (isNight) {
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

function overlap(xx, yy, ss, index) {
  let offsetX = width / 2;
  let offsetY = height / 2;
  if (isNight) {
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
      let dayhueValue = map(wave, 0, 1, 173,200);
      let daysaturationValue = map(wave, 0, 1, 210, 240); 
      let daybrightnessValue = map(wave, 0, 1, 230, 240); 
        let nighthueValue = map(wave, 0, 1, 123,180);
      let nightsaturationValue = map(wave, 0, 1, 140, 160); 
      let nightbrightnessValue = map(wave, 0, 1, 148, 180);
    dayColor1 = color(dayhueValue, daysaturationValue, daybrightnessValue);
  nightColor1 = color(nighthueValue, nightsaturationValue, nightbrightnessValue);
      let cc1 = lerpColor(dayColor1, nightColor1,transitionValue);
      //fill(hueValue, saturationValue, brightnessValue);
      fill(cc1);
      
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
