import { Circle, CircleProps } from "./circle.js";
import { insideHitTestCircle } from "../hittest/hittest";

type BubbleProps = CircleProps & { is_hovered?: boolean; draw_tail?: boolean; index?: number };

export class Bubble extends Circle {
  is_hovered: boolean = true;
  index: number = 0;
  draw_tail: boolean = false;

  private x: number = 0;
  private y: number = 0;
  private radius: number = 0;

  private x_right: { x: number; y: number } = { x: 0, y: 0 };
  private y_top: { x: number; y: number } = { x: 0, y: 0 };

  time_pos_lst: { time: number; x_rel: number; y_rel: number }[] = [];
  constructor({
    x_rel = 0,
    y_rel = 0,
    radius_rel = 0,
    fill = "grey",
    is_hovered = true,
    draw_tail = false,
    index = 0,
  }: BubbleProps = {}) {
    super({ x_rel, y_rel, radius_rel, fill });
    this.is_hovered = is_hovered;
    this.index = index;
    this.draw_tail = draw_tail;
  }

  draw(gc: CanvasRenderingContext2D): void {
    // Get the absolute position and radius
    const { x, y, radius, x_right, y_top, origin } = this.get_info(gc);
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.x_right = x_right;
    this.y_top = y_top;

    // Draw the index number above the circle (if hover)
    if (this.is_hovered) {
      this.stroke = "lightblue";

      gc.save();
      gc.font = "12px sans-serif";
      gc.textAlign = "center";
      gc.textBaseline = "middle";
      gc.fillStyle = this.stroke;
      gc.fillText(this.index.toString(), x, y - radius - 5);
      gc.restore();
    }
    
    if (this.draw_tail) {
      // Draw the tail
      gc.save();
      gc.strokeStyle = this.fill;
      gc.lineWidth = 1;
      gc.beginPath();
      for (let i = 0; i < this.time_pos_lst.length; i++) {
        const tp = this.time_pos_lst[i];
        const x_tail = origin.x + (x_right.x - origin.x) * tp.x_rel / 2;
        const y_tail = origin.y - (origin.y - y_top.y) * tp.y_rel / 2;
        if (i === 0) {
          gc.moveTo(x_tail, y_tail);
        } else {
          gc.lineTo(x_tail, y_tail);
        }
      }
      gc.stroke();
      gc.restore();
    }

    // Draw the circle
    super.draw(gc);
  }

  start(time: number): void {
    this.time_pos_lst.push({
      time: time,
      x_rel: this.x_rel,
      y_rel: this.y_rel,
    })
  }

  update(current_time: number, g: number): void {
    const last_tp = this.time_pos_lst[this.time_pos_lst.length - 1];
    const time = current_time - last_tp.time;
    const v = 0.75 * 0.000125 * 2; // relative scaled to / 2, multiply back
    const rand = Math.random();
    if (rand <= g) {
      // NE
      if (this.x < this.x_right.x) {
        this.x_rel = last_tp.x_rel + v * time;
      }

      if (this.y > this.y_top.y) {
        this.y_rel = last_tp.y_rel + v * time;
      }

    } else {
      const c = Math.floor((1 - rand) * 7) + 1;
      console.log("c", c);
      switch (c) {
        case 1:
          // E
          if (this.x < this.x_right.x) {
            this.x_rel = last_tp.x_rel + v * time;
          }
          break;
        case 2:
          // SE
          if (this.x < this.x_right.x) {
            this.x_rel = last_tp.x_rel + v * time;
          }
          
          if (this.y < this.y_top.y) {
            this.y_rel = last_tp.y_rel - v * time;
          }
          break;

        case 3:
          // S
          if (this.y < this.y_top.y) {
            this.y_rel = last_tp.y_rel - v * time;
          }
          break;

        case 4:
          // SW
          if (this.x > this.x_right.x) {
            this.x_rel = last_tp.x_rel - v * time;
          }
          if (this.y < this.y_top.y) {
            this.y_rel = last_tp.y_rel - v * time;
          }
          break;

        case 5:
          // W
          if (this.x > this.x_right.x) {
            this.x_rel = last_tp.x_rel - v * time;
          }
          break;

        case 6:
          // NW
          if (this.x > this.x_right.x) {
            this.x_rel = last_tp.x_rel - v * time;
          }
          if (this.y > this.y_top.y) {
            this.y_rel = last_tp.y_rel + v * time;
          }
          break;

        case 7:
          // N
          if (this.y > this.y_top.y) {
            this.y_rel = last_tp.y_rel + v * time;
          }
          break;
      }
      this.time_pos_lst.push({
        time: current_time,
        x_rel: this.x_rel,
        y_rel: this.y_rel,
      });
    }
  }

  hittest(mx: number, my: number): boolean {
    return insideHitTestCircle(mx, my, this.x, this.y, this.radius);
  }
}
