import { Circle, CircleProps } from "./circle.js";
import { insideHitTestCircle } from "../hittest/hittest";

type BubbleProps = CircleProps & { is_hovered?: boolean; index?: number };

export class Bubble extends Circle {
  is_hovered: boolean = true;
  index: number = 0;

  private x: number = 0;
  private y: number = 0;
  private radius: number = 0;
  private start_time: number = 0;
  private x_rel_start: number = 0;
  private y_rel_start: number = 0;

  private x_right: { x: number; y: number } = { x: 0, y: 0 };
  private y_top: { x: number; y: number } = { x: 0, y: 0 };

  constructor({
    x_rel = 0,
    y_rel = 0,
    radius_rel = 0,
    fill = "grey",
    is_hovered = true,
    index = 0,
  }: BubbleProps = {}) {
    super({ x_rel, y_rel, radius_rel, fill });
    this.is_hovered = is_hovered;
    this.index = index;
  }

  draw(gc: CanvasRenderingContext2D): void {
    // Get the absolute position and radius
    const { x, y, radius, x_right, y_top } = this.get_info(gc);
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

    // Draw the circle
    super.draw(gc);
  }

  start(time: number): void {
    this.start_time = time;
    this.x_rel_start = this.x_rel;
    this.y_rel_start = this.y_rel;
  }

  update(current_time: number, g: number): void {
    const time = current_time - this.start_time; // Convert to seconds
    const v = 0.75 * 0.000125 * 2; // relative scaled to /2, multiply back
    const rand = Math.random();
    if (rand <= g) {
      // NE
      if (this.x < this.x_right.x) {
        this.x_rel = this.x_rel_start + v * time;
      }

      if (this.y > this.y_top.y) {
        this.y_rel = this.y_rel_start + v * time;
      }
    } else {
      const c = Math.floor((1 - g) * 7) + 1;
      switch (c) {
        case 1:
          // E
          if (this.x < this.x_right.x) {
            this.x_rel = this.x_rel_start + v * time;
          }
          break;
        case 2:
          // SE
          if (this.x < this.x_right.x) {
            this.x_rel = this.x_rel_start + v * time;
          }
          
          if (this.y < this.y_top.y) {
            this.y_rel = this.y_rel_start - v * time;
          }
          break;

        case 3:
          // S
          if (this.y < this.y_top.y) {
            this.y_rel = this.y_rel_start - v * time;
          }
          break;

        case 4:
          // SW
          if (this.x > this.x_right.x) {
            this.x_rel = this.x_rel_start - v * time;
          }
          if (this.y < this.y_top.y) {
            this.y_rel = this.y_rel_start - v * time;
          }
          break;

        case 5:
          // W
          if (this.x > this.x_right.x) {
            this.x_rel = this.x_rel_start - v * time;
          }
          break;

        case 6:
          // NW
          if (this.x > this.x_right.x) {
            this.x_rel = this.x_rel_start - v * time;
          }
          if (this.y > this.y_top.y) {
            this.y_rel = this.y_rel_start + v * time;
          }
          break;

        case 7:
          // N
          if (this.y > this.y_top.y) {
            this.y_rel = this.y_rel_start + v * time;
          }
          break;
      }
    }
  }

  hittest(mx: number, my: number): boolean {
    return insideHitTestCircle(mx, my, this.x, this.y, this.radius);
  }
}
