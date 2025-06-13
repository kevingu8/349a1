import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  setSKAnimationCallback,
  addSKEventTranslator,
  skTime,
  SKEvent,
  SKMouseEvent,
} from "simplekit/canvas-mode";

import { DisplayList } from "./drawbles/displaylist";
import { Bubble } from "./drawbles/bubble";
import { longclickTranslator } from "./translators/longclick";
import { cursorCircle } from "./drawbles/cursorCircle";
import { animateClick } from "./animations/animate_click";
const canvasinfo = startSimpleKit();

if (!canvasinfo) throw new Error("simplekit failed");

type coordinates = {
  x: number;
  y: number;
};

let mode: "setup" | "play" | "pause" | "end" = "setup";
let bgc = "black";
let num_bubbles: number = 6;
// let globalGC: CanvasRenderingContext2D | null = null;

let mouse_click = false;
let canvas_width = canvasinfo.width;
let canvas_height = canvasinfo.height;

const margin = 50;
const max_bubbles = 10;
const min_bubbles = 2;
const min_g = 0.125;
const max_g = 1.0;

let center: coordinates = { x: canvas_width / 2, y: canvas_height / 2 };
let dist: number = Math.min(canvas_width, canvas_height) / 2 - margin;
let origin = { x: center.x - dist, y: center.y + dist };
let x_right = { x: center.x + dist, y: center.y + dist };
let y_top = { x: center.x - dist, y: center.y - dist };
let g = 0.5;

const bubbles_list: DisplayList = new DisplayList();
const cursor_circle = new cursorCircle(0, 0, 0);
const initialize = () => {
  bubbles_list.clear();
  for (let i = 0; i < num_bubbles; i++) {
    bubbles_list.add(
      new Bubble({
        x_rel: Math.random(),
        y_rel: Math.random(),
        radius_rel: 0.0125 + Math.random() * (0.0375 - 0.0125),
        fill: `hsl(${Math.random() * 360}, 100%, 50%)`,
        is_hovered: false,
        index: i + 1,
      })
    );
  }
};

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
  x_right = { x: center.x + dist, y: center.y + dist };
  y_top = { x: center.x - dist, y: center.y - dist };

  gc.save();
  gc.fillStyle = bgc;
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
  gc.moveTo((x_right.x + origin.x - 10) / 2, origin.y);
  gc.lineTo((x_right.x + origin.x - 10) / 2, origin.y + 10);
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
  gc.moveTo(origin.x, (origin.y + y_top.y) / 2);
  gc.lineTo(origin.x - 10, (origin.y + y_top.y) / 2);
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

  text(gc, x_right.x, x_right.y + 25, "100");
  text(gc, (x_right.x + origin.x - 10) / 2, origin.y + 25, "50");
  text(gc, origin.x - 25, origin.y, "0");
  text(gc, origin.x, origin.y + 25, "0");
  text(gc, origin.x - 25, (origin.y + y_top.y) / 2, "50");
  text(gc, origin.x - 25, y_top.y, "100");

  if (mouse_click) {
    cursor_circle.draw(gc);
  }

  bubbles_list.draw(gc);
});

function text(
  gc: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string
) {
  gc.font = "12pt sans-serif";
  gc.textAlign = "center";
  gc.textBaseline = "middle";
  gc.fillStyle = "white";
  gc.fillText(text, x, y);
}

let mx = 0, my = 0;
const click_animator = animateClick((value: number) => {
  cursor_circle.r = (x_right.x - origin.x) * value;
  if (value === 0.05) {
    mouse_click = false;
    cursor_circle.r = 0;
  }
})



setSKAnimationCallback((time) => {
  click_animator.update(time);
  if (mode === "play") {
    bubbles_list.update(time, g);
    if (time - bubbles_list.list[0].time_pos_lst[0].time >= 6000) {
      mode = "end";
    }
  }
})

addSKEventTranslator(longclickTranslator);

const handleEvent = (e: SKEvent) => {
  switch (e.type) {
    case "longclick":
      if (mode === "play" || mode === "pause" || mode === "end") {
        mode = "setup";
        initialize();
      }
      break;

    case "click":
      ({x: mx, y: my} = e as SKMouseEvent);

      // if (mx <= x_right.x - origin.x && my <= y_top.y - origin.y) {
      //   mouse_click = true;
      //   cursor_circle.x = mx;
      //   cursor_circle.y = my;
      //   cursor_circle.r = (x_right.x - origin.x) * 0.0025;
      // }
      if (mx > origin.x && mx < x_right.x && my > y_top.y && my < origin.y) {
        mouse_click = true;
        cursor_circle.x = mx;
        cursor_circle.y = my;
        click_animator.start(skTime);
      }

      if (mode === "setup" || mode === "pause") {
        mode = "play";
        bubbles_list.start(skTime);
      } else if (mode === "play") {
        mode = "pause";
      }
      break;
    
    case "mousemove":
      ({x: mx, y: my } = e as SKMouseEvent);
      bubbles_list.list.forEach((b) => {
        if (b.hittest(mx, my)) {
          b.is_hovered = true;
          b.stroke = "lightblue";
          b.lineWidth = 2;
        } else {
          b.is_hovered = false;
          b.stroke = "black";
          b.lineWidth = 1;
        }
      });
      break;

    case "mousedown":
      let got_hit = false;
      ({x: mx, y: my } = e as SKMouseEvent);
      bubbles_list.list.forEach((b) => {
        if (b.hittest(mx, my)) {
          b.stroke = "yellow";
          b.lineWidth = 3;
          got_hit = true;
          b.draw_tail = true;
        }
      })

      if (!got_hit) {
        bgc = "midnightblue";
      }
      break;

    case "mouseup":
      ({x: mx, y: my } = e as SKMouseEvent);
      bubbles_list.list.forEach((b) => {
        if (b.hittest(mx, my)) {
          b.stroke = "lightblue";
          b.lineWidth = 2;
          b.draw_tail = false;
        }
      })
      bgc = "black";
      break;
    
    case "keyup":
      bubbles_list.list.forEach((b) => {
        b.draw_tail = false;
      })
      break;
      
    case "keydown":
      const { key } = e as KeyboardEvent;

      switch (key) {
        case "Enter":
          if (mode === "end" || mode === "setup")
          mode = "setup";
          initialize();
          break;

        case "Escape":
          if (mode === "end" || mode === "setup" || mode === "play") {
            mode = "setup";
            initialize();
          }
          break;

        case " ":
          if (mode === "setup" || mode === "pause") {
            mode = "play";
          } else if (mode === "play") {
            mode = "pause";
          }
          break;
        
        case "t":
          bubbles_list.list.forEach((b) => {
            b.draw_tail = true;
          })
          break;
      }
      if (mode === "setup") {
        switch (key) {
          case "[":
            if (num_bubbles > min_bubbles) {
              num_bubbles--;
              initialize();
            }
            break;

          case "]":
            if (num_bubbles < max_bubbles) {
              num_bubbles++;
              initialize();
            }
            break;

          case "{":
            if (g > min_g) {
              g -= 0.125;
              initialize();
            }
            break;

          case "}":
            if (g < max_g) {
              g += 0.125;
              initialize();
            }
            break;
        }
      }

  }
};
setSKEventListener(handleEvent);

// setSKAnimationCallback((time) => {
  
// });
