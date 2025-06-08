import { Circle, type CircleProps } from './circle.js';

type BubbleProps = CircleProps & { is_hovered?: boolean, index?: number };

export class Bubble extends Circle {
    is_hovered: boolean = true;
    index: number = 0;

    constructor({
        x = 0,
        y = 0,
        radius = 100,
        fill = 'grey',
        is_hovered = true,
        index = 0,
    }: BubbleProps = {}) {
        super({ x, y, radius, fill });
        this.is_hovered = is_hovered;
        this.index = index;
    }
    
    draw(gc: CanvasRenderingContext2D): void {

        // Draw the index number above the circle (if hover)
        if (this.is_hovered) {
            this.stroke = "lightblue";

            gc.save();
            gc.font = "12px sans-serif"
            gc.textAlign = "center";
            gc.textBaseline = "middle";
            gc.fillStyle = this.stroke;
            gc.fillText(this.index.toString(), this.x, this.y - this.radius - 15);
            gc.restore();
        }

        // Draw the circle
        super.draw(gc);
    }

    update(time: number, g: number, l: number): void {
        const v = l * 0.000125
        const rand = Math.random();
        if (rand <= g) {
            this.x = this.x + v * time;
            this.y = this.y - v * time;
        } else {
            
        }
    }
}