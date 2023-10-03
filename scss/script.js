const colors = ["#2f3136", "#2a2b30", "#7d8187", "#1e1f23", "#5f6a89"];
const backgroundColor = "#FFC0CB";

const width = window.innerWidth;
const height = window.innerHeight;
const totalFrames = 1000;
let frameCount = 0;
let recording = false;
let recordingStarted = false;
let frameDelta = 0;
let m;
let b;
let particles = [];

let c01 = (g) => {
  return constrain(g, 0, 1);
};

let ease = (p) => {
  p = c01(p);
  return 3 * p * p - 2 * p * p * p;
};

function easeInQuint(x) {
  return x * x * x * x * x;
}

function easeOutQuart(x) {
  return 1 - pow(1 - x, 4);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
}

function setup() {
  canvas = createCanvas(width, height);
  noiseSeed(20);
  let bg = color(backgroundColor);
  background(bg);
  // 设置6秒的延时后执行changeEffect函数
  setTimeout(changeEffect, 6000);
}

function changeEffect() {
  backgroundColor = "#FFFFFF";  // 例如，改为白色背景
  noLoop();  // 停止draw函数的持续执行
}jquery.js



function draw() {
  frameCount += 3;
  frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;

  colorMode(RGB);
  blendMode(BLEND);

  background(backgroundColor);

  let w = 20;
  let h = 100;
  let space = 30;
  let dots = 7;
  let r = 100;

  //translate((-w * space) / 2, (-h * space) / 2);
  translate(
    window.innerWidth / 2,
    window.innerHeight / 2
  );

  blendMode(ADD);

  let count = 20;

  for (let i = 0; i < count; i++) {
    //  for (let j = 0; j < h; j++) {
    let angle = (2 * PI * i) / count;

    for (let l = 0; l < dots; l++) {
      push();

      let x = sin(angle) * sin(frameDelta) * r * (l + frameDelta);
      let y = cos(angle + frameDelta) * (sin(frameDelta + (l + frameDelta)) * r);

      translate(x, y);

      scale(2);
      //scale(sin(frameDelta + l) * (l + 1));

      colorMode(HSB);

      let pct = (i * l) / (count * dots);
      let hue = map(pct, 0, 1, 0, 360);
      let c = color(hue, 255, 255, 255);
      fill(c);
      noStroke();

      circle(0, 0, 5);

      pop();
    }
    //  }
  }

  //checkForRecording();
}

function setGradient(s, c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < s.height; y++) {
    var inter = map(y, 0, s.height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    s.stroke(c);
    s.line(0, y, s.width, y);
  }
}

function getPolar(x, y, r, a) {
  // Get as radians
  var fa = a * (Math.PI / 180);

  // Convert coordinates
  var dx = r * Math.cos(fa);
  var dy = r * Math.sin(fa);

  // Add origin values (not necessary)
  var fx = x + dx;
  var fy = y + dy;

  return [fx, fy];
}