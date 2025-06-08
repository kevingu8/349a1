import { Circle, type CircleProps } from './circle.js';

type BubbleProps = CircleProps & { display_index?: boolean, index?: number };

export class Bubble extends Circle {
    display_index: boolean = true;
    index: number = 0;

    constructor({
        x = 0,
        y = 0,
        radius = 100,
        fill = 'grey',
        display_index = true,
        index = 0,
    }: BubbleProps = {}) {
        super({ x, y, radius, fill });
        this.display_index = display_index;
        this.index = index;
    }
    
    draw(gc: CanvasRenderingContext2D): void {
        // Draw the circle
        super.draw(gc);

        // Draw the index number above the circle (if hover)
        if (this.display_index) {
            gc.save();
            gc.font = "12px sans-serif"
            gc.textAlign = "center";
            gc.textBaseline = "middle";
            gc.fillStyle = "lightblue";
            gc.fillText(this.index.toString(), this.x, this.y - this.radius - 15);
            gc.restore();
        }
    }

    update(time: number, g: number, l: number): void {
        const v = l * 0.000125
        const rand = Math.random();
    }
}