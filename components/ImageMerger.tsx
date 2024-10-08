"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import sampleImageUrl from "@/images/sample.jpg";

const ImageMerger = () => {
  const [mergedImage, setMergedImage] = useState(null);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const w = new Worker(new URL('../lib/merge-images/merge-images-worker.js', import.meta.url));
    setWorker(w);

    return () => {
      w.terminate();
    };
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
      if (e.data.error) {
        console.error('Error from worker:', e.data.error);
      } else {
        setMergedImage(e.data);
      }
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