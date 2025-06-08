export function insideHitTestCircle(
    mx: number,
    my: number,
    cx: number,
    cy: number,
    r: number 
): boolean {
    return (mx-cx) ** 2 + (my - cy) ** 2 <= r ** 2
}