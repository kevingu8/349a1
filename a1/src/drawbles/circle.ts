import { Drawable } from "./drawable";

export type CircleProps = {
  x_rel?: number;
  y_rel?: number;
  radius_rel?: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
};

type coordinates = {
  x: number;
  y: number;
};

export class Circle implements Drawable {
  constructor({
    x_rel = 0,
    y_rel = 0,
    radius_rel = 100,
    fill = "grey",
    stroke = "black",
    lineWidth = 1,
  }: CircleProps = {}) {
    this.x_rel = x_rel;
    this.y_rel = y_rel;
    this.radius_rel = radius_rel;
    this.fill = fill;
    this.stroke = stroke;
    this.lineWidth = lineWidth;
  }

  x_rel: number;
  y_rel: number;
  radius_rel: number;
  fill: string;
  stroke: string;
  lineWidth: number;
  

  get_info(gc: CanvasRenderingContext2D) {
    const margin = 50;
    const canvas_width = gc.canvas.width;
    const canvas_height = gc.canvas.height;
    const center: coordinates = { x: canvas_width / 2, y: canvas_height / 2 };
    const dist: number = Math.min(canvas_width, canvas_height) / 2 - margin;
    const origin = { x: center.x - dist, y: center.y + dist };
    const x_right = { x: center.x + dist, y: center.y + dist };
    const y_top = { x: center.x - dist, y: center.y - dist };
    return {
      x: origin.x + (x_right.x - origin.x) * this.x_rel / 2,
      y: origin.y - (origin.y - y_top.y) * this.y_rel / 2,
      radius: 2 * dist * this.radius_rel,
      x_right: x_right,
      y_top: y_top
    }
  }
  

  draw(gc: CanvasRenderingContext2D) {
    const { x, y, radius } = this.get_info(gc);

    gc.beginPath();
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;
    gc.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2,
    );
    if (this.fill) gc.fill();
    if (this.lineWidth) gc.stroke();
  }
}
