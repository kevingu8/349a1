export function insideHitTestCircle(
    mx: number,
    my: number,
    x: number,
    y: number,
    radius: number 
): boolean {
    return (mx-x) ** 2 + (my - y) ** 2 <= radius ** 2
}