type Tribe = 'hive' | 'ice' | 'leaf' | 'mud' | 'night' | 'rain' | 'sand' | 'sea' | 'silk' | 'sky';
type BodyPart = 'head' | 'body' | 'legs' | 'wings' | 'tail';
export type ImageType = 'primary' | 'secondary' | 'underscales' | 'spikes' | 'membrane' | 'membrane-gradient' | 'eyes';

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
  'primary', 'secondary', 'underscales', 'spikes', 'membrane', 'membrane-gradient', 'eyes'
];

const imageModules = import.meta.glob('../../images/debug/**/**/*.png', {
  eager: true,
  import: 'default',
});

function buildTribeImages(tribe: Tribe): TribeImages {
  const tribeImages: Partial<TribeImages> = {
    eyes: [],
    head: [],
    body: [],
    wings: [],
    legs: [],
    tail: [],
  };

  for (const path in imageModules) {
    if (!path.includes(`/debug/${tribe}/`)) {continue;}

    const src = imageModules[path] as string;

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

export const imageAssets: Record<string, TribeImages> = {
  Hive: buildTribeImages('hive'),
  Ice: buildTribeImages('ice'),
  Leaf: buildTribeImages('leaf'),
  Mud: buildTribeImages('mud'),
  Night: buildTribeImages('night'),
  Rain: buildTribeImages('rain'),
  Sand: buildTribeImages('sand'),
  Sea: buildTribeImages('sea'),
  Silk: buildTribeImages('silk'),
  Sky: buildTribeImages('sky'),
};
