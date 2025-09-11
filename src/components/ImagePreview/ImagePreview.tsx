import { Dragon, BodyParts } from '../Dragon/Dragon';

import './ImagePreview.css';

import { JSX, useState } from 'react';
import Background from '@/images/debug/background/white.png';
// import { imageAssets, ImageLayer, ImageType } from './ImageAssets';
import { imageAssets, ImageLayer, ImageType, TribeImages } from './ImageLoader';
import convert, { RGB } from 'color-convert';

import * as t from 'io-ts';
import { LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type ImagePreviewProps = {
  dragon: t.TypeOf<typeof Dragon>;
  page: number;
  style: string;
};

export default function ImagePreview({ dragon, page, style }: ImagePreviewProps) {

  /**
   * Get CSS properties for a given image part
   * @param type the color layer (primary, secondary, etc.)
   * @param dragon the dragon config to pull data from
   * @returns 
   */
  function getLayerStyle(type: ImageLayer['type'], dragon: t.TypeOf<typeof Dragon>): React.CSSProperties {

    const returnStyle = (hexColor: string) => {

      // The hue-shift CSS filter doesn't conserve saturation and brightness like expected, so some colors look really inaccurate.
      // To compensate, the code below recreates the end result of the hue-rotate filter, then finds the difference in saturation and brightness and adds it.
      // See the URL for more info.
      // https://stackoverflow.com/questions/19187905/why-doesnt-hue-rotation-by-180deg-and-180deg-yield-the-original-color/

      const color = ("ff0000")
      
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);
      const angle = (convert.hex.hsv(hexColor)[0] % 360 + 360) % 360;
      
      // Hold your breath because what follows isn't flowers.
      
      const matrix = [ // Just remember this is the identity matrix for
          1, 0, 0,   // Reds
          0, 1, 0,   // Greens
          0, 0, 1    // Blues
      ];
      
      // Luminance coefficients.
      const lumR = 0.2126;
      const lumG = 0.7152;
      const lumB = 0.0722;
      
      // Hue rotate coefficients.
      const hueRotateR = 0.143;
      const hueRotateG = 0.140;
      const hueRotateB = 0.283;
      
      const cos = Math.cos(angle * Math.PI / 180);
      const sin = Math.sin(angle * Math.PI / 180);
      
      matrix[0] = lumR + (1 - lumR) * cos - lumR * sin;
      matrix[1] = lumG - lumG * cos - lumG * sin;
      matrix[2] = lumB - lumB * cos + (1 - lumB) * sin;
      
      matrix[3] = lumR - lumR * cos + hueRotateR * sin;
      matrix[4] = lumG + (1 - lumG) * cos + hueRotateG * sin;
      matrix[5] = lumB - lumB * cos - hueRotateB * sin;
      
      matrix[6] = lumR - lumR * cos - (1 - lumR) * sin;
      matrix[7] = lumG - lumG * cos + lumG * sin;
      matrix[8] = lumB + (1 - lumB) * cos + lumB * sin;
      
      function clamp(num: number) {
          return Math.round(Math.max(0, Math.min(255, num)));
      }
      
      const R = clamp(matrix[0] * r + matrix[1] * g + matrix[2] * b);
      const G = clamp(matrix[3] * r + matrix[4] * g + matrix[5] * b);
      const B = clamp(matrix[6] * r + matrix[7] * g + matrix[8] * b);

      const rgb = [R, G, B] as RGB;
      const hsv = convert.rgb.hsv(rgb); // this is what the browser's hue-rotate will give us
      const originalHsv = convert.hex.hsv(hexColor); // this is what we actually want

      const sDiff = originalHsv[1] - hsv[1]; // find the saturation difference
      const vDiff = originalHsv[2] - hsv[2]; // find the value difference

      const hueRotate = originalHsv[0];
      const saturate = ((originalHsv[1] + sDiff)/2)+50 // we add the difference to get what we actually want
      const brightness = ((originalHsv[2] + vDiff) / 100)+1 // we add the difference to get what we actually want.

      return { filter: `hue-rotate(${hueRotate}deg) saturate(${saturate}%) brightness(${brightness}` };
    }

    switch (type) {
      case 'primary':
        return returnStyle(dragon.primaryColor);
      case 'secondary':
        return returnStyle(dragon.secondaryColor);
      case 'underscales':
        return returnStyle(dragon.underscalesColor);
      case 'spikes':
        return returnStyle(dragon.spikesColor);
      case 'eyes':
        return returnStyle(dragon.eyeColor);
      case 'membranes':
        return { backgroundColor: dragon.membraneColor1 };
      default:
        return {};
    }    
  }

  /**
   * Get the image element of a given tribe and body part
   * @param tribe the tribe
   * @param bodyPart the bodypart
   * @returns the element
   */
  function renderPart(tribe: string, style: string, bodyPart: keyof TribeImages): JSX.Element[] {
    const layers = imageAssets(tribe, style)[bodyPart];
    if (!layers) {
      return [];
    }

    return layers.map(({ src, type }: { src: string; type: ImageType }, i: number) => {
      const style = getLayerStyle(type, dragon);

      if (type === 'membranes') {
        return (
          <div
            key={i}
            style={{
              ...style,
              background: `linear-gradient(to bottom, ${dragon.membraneColor1}, ${dragon.membraneColor2})`,
              maskImage: `url(${src})`,
              maskSize: `contain`
            }}
            aria-label={`${bodyPart} ${type}`}
          />
        );
      }

      return (
        <img
          key={i}
          src={src}
          alt={`${bodyPart} ${type}`}
          style={style}
        />
      );
    });
  }

  const getTribePart = (part: keyof t.TypeOf<typeof BodyParts>): string => {
    return dragon.tribe.length === 1 ? dragon.tribe[0].toLowerCase() : dragon.bodyParts[part].toLowerCase();
  };

  return (
    <div id='image-preview' className="image-preview">
      {/* <img src={Background} alt="background" /> */}
      {renderPart(getTribePart('body'), style, 'body')}
      {renderPart(getTribePart('wings'), style, 'wings')}
      {renderPart(getTribePart('legs'), style, 'legs')}
      {renderPart(getTribePart('tail'), style, 'tail')}
      {renderPart(getTribePart('head'), style, 'head')}
      {renderPart(getTribePart('head'), style, 'eyes')}
    </div>
  );
}
