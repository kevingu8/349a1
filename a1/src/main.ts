import { startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  setSKAnimationCallback,
  addSKEventTranslator,
  skTime, } from "simplekit/canvas-mode";
const canvasinfo = startSimpleKit()

if (!canvasinfo) throw new Error("simplekit failed");


setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  gc.fillStyle = "black"
  gc.fillRect(600,200, 400, 400)

  gc.save();
  gc.fillStyle = "black";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height)
  gc.restore();

  gc.save();
  gc.font = "12px sans-serif"
  gc.textAlign = "center";
  gc.textBaseline = "middle";
  gc.fillStyle = "White"
  gc.fillText("click anywhere to start", gc.canvas.width/2, 50)

  // demos
  // rectangleDemo(gc);
  // pathDemo(gc);
  // pathHouseDemo(gc);
  // colourDemo(gc);
  // saveStateDemo(gc);
  // fpsDemo(gc);
});


//#region rectangleDemo

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

function textDemo(gc: CanvasRenderingContext2D) {
  const x = 800;
  const y = 350;

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
  gc.fillText("click anywhere to start", x, y);

}

//#endregion

//#region colourDemo
// colourDemo shows how to use HSL colours


