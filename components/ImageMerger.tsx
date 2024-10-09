"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import sampleImageUrl from "@/public/sample.jpg";
import templateImageUrl from "@/public/template.jpg";

interface TemplateObj {
  templateImageUrl: string;
  templateBounderyWidth: number;
  templateBounderyHeight: number;
  templateBounderyOffsetTop: number;
  templateBounderyOffsetLeft: number;
}

interface DesignObj {
  designImageUrl: string;
  designWidth: number;
  designHeight: number;
  designOffsetTop: number;
  designOffsetLeft: number;
}

const ImageMerger = () => {
  const [templateObj, setTemplateObj] = useState<TemplateObj>({
    // templateImageUrl: "asset.cusotmon.com/temp/14.png",
    templateImageUrl: templateImageUrl.src,
    templateBounderyWidth: 372,
    templateBounderyHeight: 430,
    templateBounderyOffsetTop: 120,
    templateBounderyOffsetLeft: 220,
  });

  const [designObj, setDesignObj] = useState<DesignObj>({
    // designImageUrl: "asset.cusotmon.com/temp/art.png",
    designImageUrl: sampleImageUrl.src,
    designWidth: 372,
    designHeight: 430,
    designOffsetTop: 120,
    designOffsetLeft: 220,
  });

  const [outputWidth, setOutputWidth] = useState<number>(1200);
  const [outputHeight, setOutputHeight] = useState<number>(1200);
  const [mergedImage, setMergedImage] = useState<string | null>(null);

  const handleMergeImages = async () => {
    try {
      const mergedImage = await mergeImage(templateObj, designObj, outputWidth, outputHeight);
      setMergedImage(mergedImage);
    } catch (error) {
      console.error('Error merging images:', error);
    }
  };

  const mergeImage = async (
    templateObj: TemplateObj,
    designObj: DesignObj,
    outputWidth: number,
    outputHeight: number
  ): Promise<string> => {

    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d');

    // Load template image
    const templateImage = await loadImage(templateObj.templateImageUrl);
    ctx?.drawImage(
      templateImage,
      0, 0, outputWidth, outputHeight // Scaling the template to fit the output size
    );

    // Load design image
    const designImage = await loadImage(designObj.designImageUrl);

    // Calculate final design offsets
    const finalOffsetTop = templateObj.templateBounderyOffsetTop + designObj.designOffsetTop;
    const finalOffsetLeft = templateObj.templateBounderyOffsetLeft + designObj.designOffsetLeft;

    // Draw the design image with calculated offsets and dimensions
    ctx?.drawImage(
      designImage,
      finalOffsetLeft, finalOffsetTop,
      designObj.designWidth, designObj.designHeight
    );

    return canvas.toDataURL('image/png');
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Important for CORS
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  };

  return (
    <div className="flex flex-col items-center w-full space-y-4">

      {mergedImage && (
        <img src={mergedImage} alt="Merged Image" className="max-w-full h-auto" />
      )}

      <Button onClick={handleMergeImages}>Merge Images</Button>

      {/* Form Inputs for Template */}
      <div className='flex items-center gap-2'>
        <Label className='text-white'>Template</Label>
        <input
          type="text"
          value={templateObj.templateImageUrl}
          onChange={(e) => setTemplateObj({ ...templateObj, templateImageUrl: e.target.value })}
          placeholder="Template Image URL"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>Width</Label>
        <input
          type="number"
          value={templateObj.templateBounderyWidth}
          onChange={(e) => setTemplateObj({ ...templateObj, templateBounderyWidth: parseInt(e.target.value) })}
          placeholder="Template Boundary Width"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>Height</Label>
        <input
          type="number"
          value={templateObj.templateBounderyHeight}
          onChange={(e) => setTemplateObj({ ...templateObj, templateBounderyHeight: parseInt(e.target.value) })}
          placeholder="Template Boundary Height"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>OffsetTop</Label>
        <input
          type="number"
          value={templateObj.templateBounderyOffsetTop}
          onChange={(e) => setTemplateObj({ ...templateObj, templateBounderyOffsetTop: parseInt(e.target.value) })}
          placeholder="Template Boundary Offset Top"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>OffsetLeft</Label>
        <input
          type="number"
          value={templateObj.templateBounderyOffsetLeft}
          onChange={(e) => setTemplateObj({ ...templateObj, templateBounderyOffsetLeft: parseInt(e.target.value) })}
          placeholder="Template Boundary Offset Left"
          className='text-black'
        />
      </div>

      {/* Form inputs for Design */}
      <div className='flex items-center gap-2'>
        <Label className='text-white'>Design</Label>
        <input
          type="text"
          value={designObj.designImageUrl}
          onChange={(e) => setDesignObj({ ...designObj, designImageUrl: e.target.value })}
          placeholder="Design Image URL"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>Width</Label>
        <input
          type="number"
          value={designObj.designWidth}
          onChange={(e) => setDesignObj({ ...designObj, designWidth: parseInt(e.target.value) })}
          placeholder="Design Width"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>Height</Label>
        <input
          type="number"
          value={designObj.designHeight}
          onChange={(e) => setDesignObj({ ...designObj, designHeight: parseInt(e.target.value) })}
          placeholder="Design Height"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>OffsetTop</Label>
        <input
          type="number"
          value={designObj.designOffsetTop}
          onChange={(e) => setDesignObj({ ...designObj, designOffsetTop: parseInt(e.target.value) })}
          placeholder="Design Offset Top"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>OffsetLeft</Label>
        <input
          type="number"
          value={designObj.designOffsetLeft}
          onChange={(e) => setDesignObj({ ...designObj, designOffsetLeft: parseInt(e.target.value) })}
          placeholder="Design Offset Left"
          className='text-black'
        />
      </div>

      {/* Form Inputs for Output Size */}
      <div className='flex items-center gap-2'>
        <Label className='text-white'>Width</Label>
        <input
          type="number"
          value={outputWidth}
          onChange={(e) => setOutputWidth(parseInt(e.target.value))}
          placeholder="Output Width"
          className='text-black'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-white'>Height</Label>
        <input
          type="number"
          value={outputHeight}
          onChange={(e) => setOutputHeight(parseInt(e.target.value))}
          placeholder="Output Height"
          className='text-black'
        />
      </div>

    </div>
  );
};

export default ImageMerger;