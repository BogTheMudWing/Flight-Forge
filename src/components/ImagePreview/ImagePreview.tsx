import { Dragon, BodyParts } from '../Dragon/Dragon';

import './ImagePreview.css';

import { JSX } from 'react';
import Background from '@/images/debug/background/white.png';
// import { imageAssets, ImageLayer, ImageType } from './ImageAssets';
import { imageAssets, ImageLayer, ImageType } from './ImageLoader';
import convert from 'color-convert';

import * as t from 'io-ts';

type ImagePreviewProps = {
  dragon: t.TypeOf<typeof Dragon>;
  page: number;
};

export default function ImagePreview({ dragon, page }: ImagePreviewProps) {

  /**
   * Get CSS properties for a given image part
   * @param type the color layer (primary, secondary, etc.)
   * @param dragon the dragon config to pull data from
   * @returns 
   */
  function getLayerStyle(type: ImageLayer['type'], dragon: t.TypeOf<typeof Dragon>): React.CSSProperties {
    switch (type) {
      case 'primary':
        return { filter: `hue-rotate(${convert.hex.hsl(dragon.primaryColor)[0]}deg) saturate(${convert.hex.hsl(dragon.primaryColor)[1]}%) brightness(${convert.hex.hsl(dragon.primaryColor)[2] / 50})` };
      case 'secondary':
        return {
          filter: `hue-rotate(${convert.hex.hsl(dragon.secondaryColor)[0]}deg) saturate(${convert.hex.hsl(dragon.secondaryColor)[1]}%) brightness(${convert.hex.hsl(dragon.secondaryColor)[2] / 50})`,
        };
      case 'underscales':
        return {
          filter: `hue-rotate(${convert.hex.hsl(dragon.underscalesColor)[0]}deg) saturate(${convert.hex.hsl(dragon.underscalesColor)[1]}%) brightness(${convert.hex.hsl(dragon.underscalesColor)[2] / 50})`,
        };
      case 'spikes':
        return { filter: `hue-rotate(${convert.hex.hsl(dragon.spikesColor)[0]}deg) saturate(${convert.hex.hsl(dragon.spikesColor)[1]}%) brightness(${convert.hex.hsl(dragon.spikesColor)[2] / 50})` };
      case 'eyes':
        return { filter: `hue-rotate(${convert.hex.hsl(dragon.eyeColor)[0]}deg) saturate(${convert.hex.hsl(dragon.eyeColor)[1]}%) brightness(${convert.hex.hsl(dragon.eyeColor)[2] / 50})` };
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
  function renderPart(tribe: keyof typeof imageAssets, bodyPart: keyof (typeof imageAssets)['Hive']): JSX.Element[] {
    const layers = imageAssets[tribe]?.[bodyPart];
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

  const getTribePart = (part: keyof t.TypeOf<typeof BodyParts>): keyof typeof imageAssets => {
    return dragon.tribe.length === 1 ? dragon.tribe[0] as keyof typeof imageAssets : dragon.bodyParts[part] as keyof typeof imageAssets;
  };

  return (
    <div className="image-preview">
      {/* <img src={Background} alt="background" /> */}
      {renderPart(getTribePart('head'), 'eyes')}
      {renderPart(getTribePart('head'), 'head')}
      {renderPart(getTribePart('body'), 'body')}
      {renderPart(getTribePart('wings'), 'wings')}
      {renderPart(getTribePart('legs'), 'legs')}
      {renderPart(getTribePart('tail'), 'tail')}
    </div>
  );
}
