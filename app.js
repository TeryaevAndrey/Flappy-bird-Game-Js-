const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

let gap = 90;

const moveUp = () => {
  yPos -= 45;
};

const restartGame = (e) => {
  e.preventDefault();

  e.target.blur();

  xPos = 10;
  yPos = 150;

  pipe = [];
  pipe[0] = {
    x: cvs.width,
    y: 0,
  };

  score = 0;
};

document.addEventListener("keydown", moveUp);
document.addEventListener("touchstart", moveUp);
document.getElementById("restart").addEventListener("click", restartGame);

let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0,
};

let score = 0;

let xPos = 10;
let yPos = 150;
let grav = 2;

bird.src = "img/user.png";
bg.src = "img/bg.png";
fg.src = "img/road.png";
pipeUp.src = "img/top.png";
pipeBottom.src = "img/bottom.png";

const score_audio = new Audio();

score_audio.src = "audio/score.mp3";

const draw = () => {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height ||
      yPos <= 0
    ) {
      xPos = 10;
      yPos = 150;

      pipe = [];
      pipe[0] = {
        x: cvs.width,
        y: 0,
      };

      score = 0;
    }

    if (pipe[i].x === 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, cvs.width / 2 - 40, cvs.height - 10);
};

const game = setInterval(draw, 15);

pipeBottom.onload = draw;
