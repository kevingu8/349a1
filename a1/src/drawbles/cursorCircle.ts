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
        
    }

}