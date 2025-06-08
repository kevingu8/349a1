import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  setSKAnimationCallback,
  addSKEventTranslator,
  skTime,
} from "simplekit/canvas-mode";
const canvasinfo = startSimpleKit();

if (!canvasinfo) throw new Error("simplekit failed");

type coordinates = {
  x: number;
  y: number;
};

let canvas_width = 0;
let canvas_height = 0;
let origin: coordinates = { x: canvas_width / 5, y: canvas_height - 100 };
let x_right: coordinates = { x: canvas_width / 1.3, y: canvas_height - 100 };
let y_top: coordinates = { x: canvas_width / 5, y: canvas_height / 7 };
const margin = 50;

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  canvas_width = gc.canvas.width;
  canvas_height = gc.canvas.height;
  const center: coordinates = { x: canvas_width / 2, y: canvas_height / 2 };
  const dist: number = Math.min(canvas_width, canvas_height) / 2 - margin;
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
    (gc.canvas.width / 1.3 + (gc.canvas.width / 5 - 10)) / 2,
    gc.canvas.height - 90
  );
  gc.lineTo(
    (gc.canvas.width / 1.3 + (gc.canvas.width / 5 - 10)) / 2,
    gc.canvas.height - 100
  );
  gc.closePath();

  gc.stroke();
  gc.restore();

  // last tick on x axis

  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(gc.canvas.width / 1.3, gc.canvas.height - 100);
  gc.lineTo(gc.canvas.width / 1.3, gc.canvas.height - 90);
  gc.closePath();

  gc.stroke();
  gc.restore();

  // first tick on y axis

  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(
    gc.canvas.width / 5,
    (gc.canvas.height - 90 + gc.canvas.height / 7) / 2
  );
  gc.lineTo(
    gc.canvas.width / 5 - 10,
    (gc.canvas.height - 90 + gc.canvas.height / 7) / 2
  );
  gc.closePath();

  gc.stroke();
  gc.restore();

  // last tick on y axis
  gc.save();
  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(gc.canvas.width / 5, gc.canvas.height / 7);
  gc.lineTo(gc.canvas.width / 5 - 10, gc.canvas.height / 7);
  gc.closePath();

  gc.stroke();
  gc.restore();

  textDemo(gc, gc.canvas.width / 5 - 25, gc.canvas.height / 7, "100");
  textDemo(
    gc,
    gc.canvas.width / 5 - 25,
    (gc.canvas.height - 90 + gc.canvas.height / 7) / 2,
    "50"
  );
  textDemo(gc, gc.canvas.width / 5, gc.canvas.height - 75, "0");
  textDemo(gc, gc.canvas.width / 1.3, gc.canvas.height - 75, "100");
  textDemo(
    gc,
    (gc.canvas.width / 1.3 + (gc.canvas.width / 5 - 10)) / 2,
    gc.canvas.height - 75,
    "50"
  );
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
