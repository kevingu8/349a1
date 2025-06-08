import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  setSKAnimationCallback,
  addSKEventTranslator,
  skTime,
} from "simplekit/canvas-mode";

import { DisplayList } from "./drawbles/displaylist";
import { Bubble } from "./drawbles/bubble";
const canvasinfo = startSimpleKit();

if (!canvasinfo) throw new Error("simplekit failed");

type coordinates = {
  x: number;
  y: number;
};

let mode : "setup" | "play" | "pause" | "end" = "setup";
let num_bubbles: number = 6;

let canvas_width = canvasinfo.width;
let canvas_height = canvasinfo.height;

const margin = 50;
let center: coordinates = { x: canvas_width / 2, y: canvas_height / 2 };
let dist: number = Math.min(canvas_width, canvas_height) / 2 - margin;
let origin = { x: center.x - dist, y: center.y + dist };
let x_right = { x: center.x + dist, y: center.y + dist};
let y_top = { x: center.x - dist, y: center.y - dist };

const bubbles_list: DisplayList = new DisplayList();
const initialize = () => {
  for (let i = 0; i < num_bubbles; i++) {
    bubbles_list.add(new Bubble({
      x: origin.x + Math.random() * (x_right.x - origin.x) / 2,
      y: origin.y - Math.random() * (origin.y - y_top.y) / 2,
      radius: 2 * dist * (0.025 + Math.random() * (0.05 - 0.025)),
      fill: `hsl(${Math.random() * 360}, 100%, 50%)`,
      is_hovered: false,
      index: i + 1,
    }))
  }
}

if (mode === "setup") {
  initialize();
}

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  canvas_width = gc.canvas.width;
  canvas_height = gc.canvas.height;
  center = { x: canvas_width / 2, y: canvas_height / 2 };
  dist = Math.min(canvas_width, canvas_height) / 2 - margin;
  origin = { x: center.x - dist, y: center.y + dist };
  x_right = { x: center.x + dist, y: center.y + dist};
  y_top = { x: center.x - dist, y: center.y - dist };

  gc.fillStyle = "black";
  gc.fillRect(600, 200, 400, 400);

  gc.save();
  gc.fillStyle = "black";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);
  gc.restore();

  gc.save();
  gc.font = "12px sans-serif";
  gc.textAlign = "center";
  gc.textBaseline = "middle";
  gc.fillStyle = "White";
  gc.fillText("click anywhere to start", gc.canvas.width / 2, 25);

  // x axis
  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(origin.x - 10, origin.y);
  gc.lineTo(x_right.x, x_right.y);
  gc.closePath();

  gc.stroke();
  gc.restore();

  // y axis
  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(origin.x, origin.y + 10);
  gc.lineTo(y_top.x, y_top.y);
  gc.closePath();

  gc.stroke();
  gc.restore();

  // middle tick on x axis

  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(
    (x_right.x + origin.x - 10)/2,
    origin.y
  );
  gc.lineTo(
    (x_right.x + origin.x - 10)/2,
    origin.y + 10
  );
  gc.closePath();

  gc.stroke();
  gc.restore();

  // last tick on x axis

  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(x_right.x, x_right.y);
  gc.lineTo(x_right.x, x_right.y + 10);
  gc.closePath();

  gc.stroke();
  gc.restore();

  // first tick on y axis

  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(
    origin.x,
    (origin.y + y_top.y) / 2
  );
  gc.lineTo(
    origin.x - 10,
    (origin.y + y_top.y) / 2
  );
  gc.closePath();

  gc.stroke();
  gc.restore();

  // last tick on y axis
  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(origin.x, y_top.y);
  gc.lineTo(origin.x - 10, y_top.y);
  gc.closePath();

  gc.stroke();
  gc.restore();

  textDemo(gc, x_right.x, x_right.y + 25, "100");
  textDemo(
    gc,
    (x_right.x + origin.x - 10)/2,
    origin.y + 25,
    "50"
  );
  textDemo(gc, origin.x - 25, origin.y, "0");
  textDemo(gc, origin.x, origin.y + 25, "0")
  textDemo(gc, origin.x - 25,
    (origin.y + y_top.y) / 2, "50");
  textDemo(
    gc,
    origin.x - 25, y_top.y,
    "100"
  );


  bubbles_list.draw(gc);

});

function rectangleDemo(gc: CanvasRenderingContext2D) {
  gc.fillStyle = "red";
  gc.fillRect(70, 10, 50, 50);

  gc.strokeStyle = "blue";
  gc.strokeRect(80, 20, 50, 50);

  // stacking to make more complex shapes
  gc.lineWidth = 3;
  gc.fillRect(150, 20, 50, 50);
  gc.strokeRect(150, 20, 50, 50);

  // has no effect
  gc.strokeStyle = "green";
}

//#endregion

//#region pathDemo
// pathDemo draws lines, polygons, and circles

function pathDemo(gc: CanvasRenderingContext2D) {
  gc.lineWidth = 3;

  // line
  gc.strokeStyle = "black";
  gc.beginPath();
  gc.moveTo(10, 10);
  gc.lineTo(60, 60);
  gc.stroke();

  // polyline or polygon
  gc.strokeStyle = "green";
  gc.beginPath();
  gc.moveTo(100, 10);
  gc.lineTo(150, 60);
  gc.lineTo(100, 60);
  gc.closePath(); // try commenting out
  gc.stroke();

  // circle using ellipse
  gc.strokeStyle = "blue";
  gc.beginPath();
  gc.ellipse(200, 30, 25, 25, 0, 0, 2 * Math.PI);
  gc.stroke();

  // circle using arc
  gc.strokeStyle = "red";
  gc.beginPath();
  gc.arc(200, 30, 20, 0, 2 * Math.PI);
  gc.stroke();
}

//#region textDemo
// textDemo shows how to draw text with different styles

function textDemo(
  gc: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string
) {
  // string uses same style as CSS font property
  gc.font = "12pt sans-serif";
  // // standard alignment
  // gc.textAlign = "left";
  // gc.textBaseline = "alphabetic";
  // gc.fillStyle = "blue";
  // gc.fillText("Hello", x, y);

  // fully centred alignment
  gc.textAlign = "center";
  gc.textBaseline = "middle";
  gc.fillStyle = "white";
  gc.fillText(text, x, y);
}

//#endregion

//#region colourDemo
// colourDemo shows how to use HSL colours
