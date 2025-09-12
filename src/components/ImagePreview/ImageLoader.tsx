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

const tribeImageModules = import.meta.glob('../../images/**/tribe/**/**/*.png', {
  eager: true,
  import: 'default',
});

const accessoryImageModules = import.meta.glob('../../images/**/accessory/*.png', {
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

  for (const path in tribeImageModules) {
    if (!path.includes(`/${style}/tribe/${tribe}/`)) {
      continue;
    }

    const src = tribeImageModules[path] as string;

    if (path.includes('/eyes.png')) {
      tribeImages.eyes?.push({ src, type: 'eyes' });
      continue;
    }

    for (const part of parts) {
      if (path.includes(`/${part}/`)) {
        const type: ImageType = typesMap.find((key) => path.includes(`${key}.png`)) as ImageType;
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

export function accessoryAssets(style: string, dragonAccessories: { file: string; name: string; color: string; }[]) {

  const assets = [];

  for (const path in accessoryImageModules) {
    if (!path.includes(`/${style}/accessory/`)) {
      continue;
    }
    const src = accessoryImageModules[path] as string;

    for (let i = 0; i < dragonAccessories.length; i++) {
      const accessory = dragonAccessories[i];
      if (!path.includes(`${accessory.file}.png`)) {
        continue;
      }
      assets.push({src: src, name: accessory.name, file: accessory.file});
    }

  }

  return assets;
}