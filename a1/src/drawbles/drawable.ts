export interface Drawable {
  draw: (gc: CanvasRenderingContext2D) => void;
  hittest: (mx: number, my: number) => boolean;
}
