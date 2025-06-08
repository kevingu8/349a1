import { distance } from "simplekit/utility"

import { FundamentalEvent, SKMouseEvent } from "simplekit/canvas-mode"

export const longclickTranslator = {
    state: "IDLE",
    movementThreshold: 50,
    timeThreshold: 500,
    startX: 0,
    startY: 0,
    startTime: 0,

    update(fe: FundamentalEvent): SKMouseEvent | undefined {
        switch (this.state) {
            case "IDLE":
                if (fe.type == "mousedown") {
                    this.state = "DOWN";
                    this.startX = fe.x || 0;
                    this.startY = fe.y || 0;
                    this.startTime = fe.timeStamp;
                }
                break;
            
            case "DOWN":
                if (fe.type == "mouseup" || (fe.x && fe.y && distance(fe.x, fe.y, this.startX, this.startY) > this.movementThreshold)) {
                    this.state = "IDLE";
                } else if (fe.timeStamp - this.startTime > this.timeThreshold) {
                    this.state = "LONG_PRESS"
                }
                break;
            
            case "LONG_PRESS":
                if (fe.type == "mouseup") {
                    this.state = "IDLE";
                    return new SKMouseEvent(
                        "longclick", 
                         fe.timeStamp,
                         fe.x || 0,
                         fe.y || 0 
                    );
                }
                break;
        };

        return;
    }
}
