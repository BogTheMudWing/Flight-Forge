import HiveBodyMembranes from '@/images/render/debug/hive/body/membranes.png';
import HiveBodyPrimary from '@/images/render/debug/hive/body/primary.png';
import HiveBodySecondary from '@/images/render/debug/hive/body/secondary.png';
import HiveBodySpikes from '@/images/render/debug/hive/body/spikes.png';
import HiveBodyUnderscales from '@/images/render/debug/hive/body/underscales.png';
import HiveEyes from '@/images/render/debug/hive/eyes.png';
import HiveHeadMembranes from '@/images/render/debug/hive/head/membranes.png';
import HiveHeadPrimary from '@/images/render/debug/hive/head/primary.png';
import HiveHeadSecondary from '@/images/render/debug/hive/head/secondary.png';
import HiveHeadSpikes from '@/images/render/debug/hive/head/spikes.png';
import HiveHeadUnderscales from '@/images/render/debug/hive/head/underscales.png';
import HiveLegsMembranes from '@/images/render/debug/hive/legs/membranes.png';
import HiveLegsPrimary from '@/images/render/debug/hive/legs/primary.png';
import HiveLegsSecondary from '@/images/render/debug/hive/legs/secondary.png';
import HiveLegsSpikes from '@/images/render/debug/hive/legs/spikes.png';
import HiveLegsUnderscales from '@/images/render/debug/hive/legs/underscales.png';
import HiveTailMembranes from '@/images/render/debug/hive/tail/membranes.png';
import HiveTailPrimary from '@/images/render/debug/hive/tail/primary.png';
import HiveTailSecondary from '@/images/render/debug/hive/tail/secondary.png';
import HiveTailSpikes from '@/images/render/debug/hive/tail/spikes.png';
import HiveTailUnderscales from '@/images/render/debug/hive/tail/underscales.png';
import HiveWingsMembranes from '@/images/render/debug/hive/wings/membranes.png';
import HiveWingsPrimary from '@/images/render/debug/hive/wings/primary.png';
import HiveWingsSecondary from '@/images/render/debug/hive/wings/secondary.png';
import HiveWingsSpikes from '@/images/render/debug/hive/wings/spikes.png';

export type ImageType =
  | 'primary'
  | 'secondary'
  | 'underscales'
  | 'spikes'
  | 'membrane'
  | 'membrane-gradient'
  | 'eyes';

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
}

export const hive: TribeImages = {
  eyes: [{ src: HiveEyes, type: 'eyes' }],
    head: [
      { src: HiveHeadPrimary, type: 'primary' },
      { src: HiveHeadSecondary, type: 'secondary' },
      { src: HiveHeadUnderscales, type: 'underscales' },
      { src: HiveHeadMembranes, type: 'membrane-gradient' },
      { src: HiveHeadSpikes, type: 'spikes' },
    ],
    body: [
      { src: HiveBodyPrimary, type: 'primary' },
      { src: HiveBodySecondary, type: 'secondary' },
      { src: HiveBodyUnderscales, type: 'underscales' },
      { src: HiveBodyMembranes, type: 'membrane-gradient' },
      { src: HiveBodySpikes, type: 'spikes' },
    ],
    wings: [
      { src: HiveWingsPrimary, type: 'primary' },
      { src: HiveWingsSecondary, type: 'secondary' },
      { src: HiveWingsMembranes, type: 'membrane-gradient' },
      { src: HiveWingsSpikes, type: 'spikes' },
    ],
    legs: [
      { src: HiveLegsPrimary, type: 'primary' },
      { src: HiveLegsSecondary, type: 'secondary' },
      { src: HiveLegsUnderscales, type: 'underscales' },
      { src: HiveLegsMembranes, type: 'membrane-gradient' },
      { src: HiveLegsSpikes, type: 'spikes' },
    ],
    tail: [
      { src: HiveTailPrimary, type: 'primary' },
      { src: HiveTailSecondary, type: 'secondary' },
      { src: HiveTailUnderscales, type: 'underscales' },
      { src: HiveTailMembranes, type: 'membrane-gradient' },
      { src: HiveTailSpikes, type: 'spikes' },
    ],
}

export const imageAssets = {
  Hive: hive

  // Future tribes can go here
};
