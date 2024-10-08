// Importing a utility function to calculate image scaling
import { calculateImageScale } from "./calculate-image-scale.js";

// Main worker function that listens for messages from the main thread
self.onmessage = async function (e) {
    const { productItemImage, designState, canvasValue } = e.data;

    try {
        // Calls the mergeImagesWorker function to merge the product image with the design
        const result = await mergeImagesWorker(productItemImage, designState, canvasValue);
        self.postMessage(result);
    } catch (error) {
        console.error('Error in worker:', error);
        self.postMessage({ error: error.message, stack: error.stack });
    }
}

/*
    * mergeImagesWorker function
    * Merges the product image and design image based on transformation properties
    * @param {string} productItemImage - URL of the product image
    * @param {object} designState - Design state object containing design image URL and transformation properties
    * @param {object} canvasValue - Canvas value object containing position and scale the product frame on the canvas
    *
 */

// Function that merges the product image and design image based on transformation properties
async function mergeImagesWorker(productItemImage, designState, canvasValue) {
    try {
        // If no canvas value is provided, return the original product image
        if (!canvasValue) return productItemImage;

        const canvas = new OffscreenCanvas(800, 800);
        const ctx = canvas.getContext('2d');

        const piImg = await loadImage(productItemImage);
        ctx.drawImage(piImg, 0, 0, 800, 800);

        const isImg = await loadImage(designState.image);
        const transform = designState.transform;

        // If a transform object is present, apply rotation, scaling, and position changes
        if (transform) {
            ctx.save();
            // Move the canvas context to the specified position
            ctx.translate(transform.position.x, transform.position.y);
            // Apply rotation in radians
            ctx.rotate((transform.rotation.angle * Math.PI) / 180);
            // Apply scaling
            ctx.scale(transform.scale.x, transform.scale.y);
            // Draw the design image centered on the canvas after applying transformations
            ctx.drawImage(
                isImg,
                -isImg.width / 2,
                -isImg.height / 2,
                isImg.width,
                isImg.height
            );
            ctx.restore();
        } else {
            // If no transformation is provided, calculate the appropriate scale for the design image
            const { scaleX, scaleY } = calculateImageScale(canvasValue, isImg);
            // Draw the design image at the calculated scale and position
            ctx.drawImage(
                isImg,
                canvasValue.position.x - (isImg.width * scaleX) / 2,
                canvasValue.position.y - (isImg.height * scaleY) / 2,
                isImg.width * scaleX,
                isImg.height * scaleY
            );
        }

        return canvas.convertToBlob().then(blob => URL.createObjectURL(blob));
    } catch (error) {
        console.error('Error in mergeImagesWorker:', error);
        throw error;
    }
}

// Helper function to load an image from a URL
async function loadImage(url) {
    try {
        // Check if the URL is relative (starts with '/_next')
        if (url.startsWith('/_next')) {
            // If it's a relative URL, prepend the base URL
            url = `${self.location.origin}${url}`;
        }

        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status} ${response.statusText}`);
        }
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);
        return imageBitmap;
    } catch (error) {
        console.error('Error loading image:', error, 'URL:', url);
        throw error;
    }
}
