"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import sampleImageUrl from "@/images/sample.jpg";

const ImageMerger = () => {
  const [mergedImage, setMergedImage] = useState(null);

  const handleMergeImages = async () => {
    const templateImage = 'https://asset.customon.com/templates/14/models/527/navy.jpg';
    const sampleImage = sampleImageUrl.src;

    const designState = {
      image: sampleImage,
      transform: {
        position: { x: 400, y: 400 },
        rotation: { angle: 0 },
        scale: { x: 0.5, y: 0.5 }
      }
    };

    const canvasValue = {
      position: { x: 400, y: 400 },
      scale: { x: 600, y: 600 }
    };

    try {
      const mergedImage = await mergeImages(templateImage, designState, canvasValue);
      setMergedImage(mergedImage);
    } catch (error) {
      console.error('Error merging images:', error);
    }
  };

  // Include the mergeImages and loadImage functions here or import them
  const mergeImages = async (productItemImage, designState, canvasValue) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasValue.scale.x;
    canvas.height = canvasValue.scale.y;
    const ctx = canvas.getContext('2d');

    // Load images
    const productImage = await loadImage(productItemImage);
    ctx.drawImage(productImage, 0, 0, canvas.width, canvas.height);

    const designImage = await loadImage(designState.image);
    ctx.save();
    ctx.translate(designState.transform.position.x, designState.transform.position.y);
    ctx.rotate((designState.transform.rotation.angle * Math.PI) / 180);
    ctx.scale(designState.transform.scale.x, designState.transform.scale.y);
    ctx.drawImage(designImage, -designImage.width / 2, -designImage.height / 2);
    ctx.restore();

    // Return the merged image as a data URL
    return canvas.toDataURL('image/png');
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Important for CORS
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button onClick={handleMergeImages}>Merge Images</Button>
      {mergedImage && (
        <img src={mergedImage} alt="Merged Image" className="max-w-full h-auto" />
      )}
    </div>
  );
};

export default ImageMerger;