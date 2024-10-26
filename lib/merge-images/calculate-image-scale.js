
/**
 * Calculates the scale factors for an image to fit within a canvas while maintaining aspect ratio
 * @param {Object} canvasValue - The canvas dimensions and scale
 * @param {number} canvasValue.scale.x - The width scale of the canvas
 * @param {number} canvasValue.scale.y - The height scale of the canvas
 * @param {Object} img - The image dimensions
 * @param {number} img.width - The width of the image
 * @param {number} img.height - The height of the image
 * @returns {Object} An object containing the calculated scale factors
 * @returns {number} returns.scaleX - The horizontal scale factor
 * @returns {number} returns.scaleY - The vertical scale factor
 */
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
