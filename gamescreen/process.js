import { Player } from "./player.js";
import { Door } from "./door.js";

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const player = Player(context, 272, 416);
const doors = [Door(context, 320, 368), Door(context, 320, 272),
               Door(context, 320, 176), Door(context, 320, 80)];

let result = [];
let submitted = false;
let correct = false;

export function setResult(val) {
  result = val;
}

export function setSubmitted(val) {
  submitted = val;
}

export function setCorrect(val) {
  correct = val;
}

function sendSuccess() {
  console.log("success");
  document.getElementById("alertSuccess").style.display = "block";
  document.getElementById("alertFail").style.display = "none";
  document.getElementById("alertProblem").style.display = "none";
  document.getElementById("submit").disabled = false;
  setSubmitted(false);
}

function sendFail() {
  console.log("fail");
  document.getElementById("alertSuccess").style.display = "none";
  document.getElementById("alertFail").style.display = "block";
  document.getElementById("alertProblem").style.display = "none";
  document.getElementById("submit").disabled = false;
  setSubmitted(false);
}

function doFrame(now) {
    if (submitted && document.getElementById("submit").disabled === false) {
      document.getElementById("submit").disabled = true;
      player.setXY(272, 416);
      for (let i = 0; i < doors.length; i++) {
        doors[i].close();
      }
    }

    if (submitted) {
      if (correct) {
        sendSuccess();
        for (let i = 0; i < doors.length; i++) {
          doors[i].open();
        }
      } else {
        sendFail();
      }
    }

    /* Update the sprites */
    player.update(now);
    for (let i = 0; i < doors.length; i++) {
      doors[i].update(now);
    }

    /* Clear the screen */
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the sprites */
    player.draw();
    for (let i = 0; i < doors.length; i++) {
      doors[i].draw();
    }

    /* Show Array */
    context.font = "20px Consolas";
    context.textAlign = "center";

    if (result.length > 0) {
      if (!correct) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "green";
      }

      for (let i = 0; i < result.length; i++) {
        context.fillText(result[i], 320, 340 - 96 * i);
      }
    }   
    
    /* Process the next frame */
    requestAnimationFrame(doFrame);
}

/* Start the animation */
requestAnimationFrame(doFrame);