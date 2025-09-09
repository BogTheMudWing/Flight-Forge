import { Dragon, BodyParts } from '../Dragon/Dragon';

import './ImagePreview.css';

import { JSX, useState } from 'react';
import Background from '@/images/debug/background/white.png';
// import { imageAssets, ImageLayer, ImageType } from './ImageAssets';
import { imageAssets, ImageLayer, ImageType, TribeImages } from './ImageLoader';
import convert from 'color-convert';

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
    switch (type) {
      case 'primary':
        return { filter: `hue-rotate(${convert.hex.hsv(dragon.primaryColor)[0]}deg) saturate(${convert.hex.hsv(dragon.primaryColor)[1]}%) brightness(${convert.hex.hsv(dragon.primaryColor)[2] / 50})` };
      case 'secondary':
        return {
          filter: `hue-rotate(${convert.hex.hsv(dragon.secondaryColor)[0]}deg) saturate(${convert.hex.hsv(dragon.secondaryColor)[1]}%) brightness(${convert.hex.hsv(dragon.secondaryColor)[2] / 50})`,
        };
      case 'underscales':
        return {
          filter: `hue-rotate(${convert.hex.hsv(dragon.underscalesColor)[0]}deg) saturate(${convert.hex.hsv(dragon.underscalesColor)[1]}%) brightness(${convert.hex.hsv(dragon.underscalesColor)[2] / 50})`,
        };
      case 'spikes':
        return { filter: `hue-rotate(${convert.hex.hsv(dragon.spikesColor)[0]}deg) saturate(${convert.hex.hsv(dragon.spikesColor)[1]}%) brightness(${convert.hex.hsv(dragon.spikesColor)[2] / 50})` };
      case 'eyes':
        return { filter: `hue-rotate(${convert.hex.hsv(dragon.eyeColor)[0]}deg) saturate(${convert.hex.hsv(dragon.eyeColor)[1]}%) brightness(${convert.hex.hsv(dragon.eyeColor)[2] / 50})` };
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
