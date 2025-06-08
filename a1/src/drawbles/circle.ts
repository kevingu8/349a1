import type { Drawable } from "./drawable";

export type CircleProps = {
  x?: number;
  y?: number;
  radius?: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
};

export class Circle implements Drawable {
  constructor({
    x = 0,
    y = 0,
    radius = 100,
    fill = "grey",
    stroke = "black",
    lineWidth = 1,
  }: CircleProps = {}) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill = fill;
    this.stroke = stroke;
    this.lineWidth = lineWidth;
  }

  x: number;
  y: number;
  radius: number;
  fill: string;
  stroke: string;
  lineWidth: number;

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;
    gc.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
    );
    if (this.fill) gc.fill();
    if (this.lineWidth) gc.stroke();
  }
}
