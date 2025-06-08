import { Circle, CircleProps } from "./circle.js";
import { insideHitTestCircle } from "../hittest/hittest";

type BubbleProps = CircleProps & { is_hovered?: boolean; index?: number };

export class Bubble extends Circle {
  is_hovered: boolean = true;
  index: number = 0;

  private x: number = 0;
  private y: number = 0;
  private radius: number = 0;

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
    const { x, y, radius } = this.get_info(gc);
    this.x = x;
    this.y = y;
    this.radius = radius;

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

  update(time: number, g: number): void {
    const v = 0.000125;
    const rand = Math.random();
    if (rand <= g) {
      // NE
      this.x_rel = this.x_rel + v * time;
      this.y_rel = this.y_rel - v * time;
    } else {
      const c = Math.floor((1 - g) / 7) + 1;
      switch (c) {
        case 1:
          // E
          this.x_rel = this.x_rel + v * time;
          break;
        case 2:
          // SE
          this.x_rel = this.x_rel + v * time;
          this.y_rel = this.y_rel + v * time;
          break;

        case 3:
          // S
          this.y_rel = this.y_rel + v * time;
          break;

        case 4:
          // SW
          this.x_rel = this.x_rel - v * time;
          this.y_rel = this.y_rel + v * time;
          break;

        case 5:
          // W
          this.x_rel = this.x_rel - v * time;
          break;

        case 6:
          // NW
          this.x_rel = this.x_rel - v * time;
          this.y_rel = this.y_rel - v * time;
          break;

        case 7:
          // N
          this.y_rel = this.y_rel - v * time;
          break;
      }
    }
  }

  hittest(mx: number, my: number): boolean {
    return insideHitTestCircle(mx, my, this.x, this.y, this.radius);
  }
}
