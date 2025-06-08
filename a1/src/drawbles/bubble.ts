import { Circle, type CircleProps } from './circle.js';

type BubbleProps = CircleProps & { index?: number };

export class Bubble extends Circle {
    index: number = 0;

    constructor({
        x = 0,
        y = 0,
        radius = 100,
        fill = 'grey',
        index = 0,
    }: BubbleProps = {}) {
        super({ x, y, radius, fill });
        this.index = index;
    }
    
    draw(gc: CanvasRenderingContext2D): void {
        gc.textAlign = 'center';
        gc.textBaseline = 'middle';
        gc.fillStyle = 'black';
        gc.fillText(this.index.toString(), this.x, this.y - 10);
        gc.font = '20px Arial';
        super.draw(gc);
    }
}