import { Animator } from "./animator"

export const animateClick = (updateValue: (value: number)=>void) => {
    return new Animator(
        0.025,
        0.05,
        1000/3,
        updateValue
    )
}
