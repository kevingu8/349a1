// linear interpolation
export const lerp = (start: number, end: number, t: number) =>
  start + (end - start) * t;

//#region Easing Functions

export type EasingFunction = (t: number) => number;

export const flip: EasingFunction = (t) => 1 - t;

// changing the power adjusts the curve
export const easeOut: EasingFunction = (t) => Math.pow(t, 2);

export const easeIn: EasingFunction = (t) => flip(easeOut(flip(t)));

export const easeInOut: EasingFunction = (t) =>
  lerp(easeOut(t), easeIn(t), t);

export const bow: EasingFunction = (a, x = 1) =>
  easeIn(Math.pow(a, 2) * ((x + 1) * a - x));

export const bounce: EasingFunction = (t, x = 1.5) =>
  Math.pow(2, 10 * (t - 1)) * Math.cos(((20 * Math.PI * x) / 3) * t);

//#endregion

// basic animation object
export class Animator {
  public startValue: number;
  public endValue: number;
  public duration: number;
  public updateValue: (p: number) => void;
  public easing: EasingFunction;

  constructor(
    startValue: number,
    endValue: number,
    duration: number,
    updateValue: (p: number) => void,
    easing: EasingFunction = (t) => t
  ) {
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.updateValue = updateValue;
    this.easing = easing;
  }

  private startTime: number | undefined;

  start(time: number) {
    this.startTime = time;
    this._isRunning = true;
  }

  get isRunning() {
    return this._isRunning;
  }
  private _isRunning = false;

  update(time: number) {
    if (!this._isRunning || this.startTime === undefined) return;

    // proportion of time elapsed
    const t = Math.min(1, (time - this.startTime) / this.duration);

    // calculate the new value using easing function
    const value = lerp(
      this.startValue,
      this.endValue,
      this.easing(t)
    );

    // call the update callback
    this.updateValue(value);

    if (t === 1) {
      this.startTime = undefined;
      this._isRunning = false;
    }
  }
}
