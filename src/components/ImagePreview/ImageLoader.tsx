type BodyPart = 'head' | 'body' | 'legs' | 'wings' | 'tail';
export type ImageType = 'primary' | 'secondary' | 'underscales' | 'spikes' | 'membranes' | 'eyes';

export type ImageLayer = {
  src: string;
  type: ImageType;
};

export type TribeImages = {
  eyes: ImageLayer[];
  head: ImageLayer[];
  body: ImageLayer[];
  wings: ImageLayer[];
  legs: ImageLayer[];
  tail: ImageLayer[];
};

const parts: BodyPart[] = ['head', 'body', 'legs', 'wings', 'tail'];
const typesMap = [
  'primary', 'secondary', 'underscales', 'spikes', 'membranes', 'eyes'
];

const imageModules = import.meta.glob('../../images/**/tribe/**/**/*.webp', {
  eager: true,
  import: 'default',
});

function buildTribeImages(tribe: string, style: string): TribeImages {
  const tribeImages: Partial<TribeImages> = {
    eyes: [],
    head: [],
    body: [],
    wings: [],
    legs: [],
    tail: [],
  };

  for (const path in imageModules) {
    if (!path.includes(`/${style}/tribe/${tribe}/`)) {
      continue;
    }

    const src = imageModules[path] as string;

    if (path.includes('/eyes.webp')) {
      tribeImages.eyes?.push({ src, type: 'eyes' });
      continue;
    }

    for (const part of parts) {
      if (path.includes(`/${part}/`)) {
        const type: ImageType = typesMap.find((key) => path.includes(`${key}.webp`)) as ImageType;
        if (type) {
          tribeImages[part]?.push({ src, type });
        }
      }
    }
  }

  return tribeImages as TribeImages;
}

export function imageAssets(tribe: string, style: string): TribeImages {
  return buildTribeImages(tribe, style);
};
