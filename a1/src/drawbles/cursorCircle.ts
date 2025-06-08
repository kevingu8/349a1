export class cursorCircle {
    x: number = 0;
    y: number = 0;
    r: number = 0;
    stroke: string = "yellow";
    lineWidth: number =3;

    constructor(
        x: number,
        y: number,
        r: number,
    ) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw(gc: CanvasRenderingContext2D) {
        gc.beginPath();
        if (this.stroke) gc.strokeStyle = this.stroke
        if (this.lineWidth) gc.lineWidth = this.lineWidth;

        gc.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

        gc.stroke();
    }

}