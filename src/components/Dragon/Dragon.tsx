export default interface Dragon {
  tribe: string[];
  age?: number;
  gender: string;
  primaryColor: string;
  secondaryColor: string;
  underscalesColor: string;
  membraneColor1: string;
  membraneColor2: string;
  eyeColor: string;
  spikesColor: string;
  name: string;
  pronouns: string;
  relations: Relation[];
  locations: Location[]
  traits: Trait[];
  health: string;
  occupation: string;
  size: number;
  injuries: Injuries;
  accessories: Accessories;
  // The original creator of the character
  creator: string;
  // The user who built the dragon
  builder: string;
  // The art style to render as
  style: string;
}

interface Relation {
  relation: string;
  name: string;
  status: string;
}

interface Location {
  identifier: string;
  name: string;
}

interface Trait {
  name: string;
  rating: number;
}

interface Injuries {
  leftArm: boolean;
  rightArm: boolean;
  leftLeg: boolean;
  rightLeg: boolean;
  leftWing: boolean;
  rightWing: boolean;
  leftEye: boolean;
  rightEye: boolean;
  leftHorn: boolean;
  rightHorn: boolean;
  leftEar: boolean;
  rightEar: boolean;
  rigthEar: boolean;
  tail: boolean;
}

interface Accessories {
  leftArmBand?: Accessory;
  rightArmBand?: Accessory;
  leftEarring?: Accessory;
  rightEarring?: Accessory;
  noseRing?: Accessory;
  chestplate?: Accessory;
  glasses?: Accessory;
  necklace?: Accessory;
}

interface Accessory {
  color: string;
}