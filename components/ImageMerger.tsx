"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import sampleImageUrl from "@/public/sample.jpg";

const ImageMerger = () => {
  const [mergedImage, setMergedImage] = useState(null);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    if (typeof Worker !== "undefined") {
        const w = new Worker(new URL('../public/merge-images-worker.js', import.meta.url));
        setWorker(w);

        return () => {
            w.terminate();
        };
    } else {
        console.warn('Web Workers are not supported in this browser.');
        // Handle image merging without worker here as fallback
    }
}, []);


  const handleMergeImages = () => {
    if (!worker) return;

    const templateImage = 'https://asset.customon.com/templates/14/models/527/navy.jpg';
    const sampleImage = sampleImageUrl.src; // Use the 'src' property of the imported image

    const designState = {
      image: sampleImage,
      transform: {
        position: { x: 400, y: 400 },
        rotation: { angle: 0 },
        scale: { x: 0.5, y: 0.5 } // 50% scale of the original sample image
      }
    };

    const canvasValue = {
      position: { x: 400, y: 400 },
      scale: { x: 600, y: 600 }
    };

    worker.postMessage({ productItemImage: templateImage, designState, canvasValue });

    worker.onmessage = (e) => {
      setTimeout(() => {
          if (e.data.error) {
              console.error('Error from worker:', e.data.error);
          } else {
              setMergedImage(e.data);
          }
      }, 0);
    };
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