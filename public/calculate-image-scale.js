
export function calculateImageScale(canvasValue, img) {
    const imgAspectRatio = img.width / img.height;
    const frameAspectRatio = canvasValue.scale.x / canvasValue.scale.y;
    let scaleX, scaleY;

    if (imgAspectRatio > frameAspectRatio) {
        scaleX = canvasValue.scale.x / img.width;
        scaleY = scaleX;
    } else {
        scaleY = canvasValue.scale.y / img.height;
        scaleX = scaleY;
    }
    return {scaleX, scaleY};
}
