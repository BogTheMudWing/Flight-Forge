import * as t from 'io-ts'

export const BodyParts = t.type({
  head: t.string,
  body: t.string,
  wings: t.string,
  legs: t.string,
  tail: t.string,
})

export const Relation = t.type({
  relation: t.string,
  name: t.string,
  status: t.string,
})

export const Location = t.type({
  identifier: t.string,
  name: t.string,
})

export const Trait = t.type({
  name: t.string,
  rating: t.number,
})

export const Injuries = t.type({
  leftArm: t.boolean,
  rightArm: t.boolean,
  leftLeg: t.boolean,
  rightLeg: t.boolean,
  leftWing: t.boolean,
  rightWing: t.boolean,
  leftEye: t.boolean,
  rightEye: t.boolean,
  leftHorn: t.boolean,
  rightHorn: t.boolean,
  leftEar: t.boolean,
  rightEar: t.boolean,
  rigthEar: t.boolean,
  tail: t.boolean,
})

export const Accessory = t.type({
  file: t.string,
  name: t.string,
  color: t.string,
})

export const Dragon = t.type({
  tribe: t.array(t.string),
  bodyParts: BodyParts,
  age: t.number,
  gender: t.string,
  primaryColor: t.string,
  secondaryColor: t.string,
  underscalesColor: t.string,
  membraneColor1: t.string,
  membraneColor2: t.string,
  eyeColor: t.string,
  spikesColor: t.string,
  name: t.string,
  pronouns: t.string,
  relations: t.array(Relation),
  locations: t.array(Location),
  traits: t.array(Trait),
  health: t.string,
  occupation: t.string,
  size: t.number,
  injuries: Injuries,
  accessories: t.array(Accessory),
  // The original creator of the character
  creator: t.string,
  // The user who built the dragon
  builder: t.string,
  // The art style to render as
  style: t.string,
})

export const defaultDragon = {
  tribe: ['Mud'],
  bodyParts: {
    head: 'Mud',
    body: 'Mud',
    wings: 'Mud',
    legs: 'Mud',
    tail: 'Mud',
  },
  age: 153,
  gender: 'Male',
  primaryColor: '#E36C2A',
  secondaryColor: '#513119',
  underscalesColor: '#D99A5B',
  membraneColor1: '#E5A168',
  membraneColor2: '#E5A168',
  eyeColor: '#269FE4',
  spikesColor: '#000000',
  name: 'Bog',
  pronouns: 'he/him',
  relations: [
    {
      relation: 'Sister',
      name: 'Siltstorm',
      status: 'Deceased',
    },
    {
      relation: 'Sister',
      name: 'Maple',
      status: 'Deceased',
    },
  ],
  locations: [
    {
      identifier: 'Hatching location',
      name: "Catamont's Claw",
    },
    {
      identifier: 'Home location',
      name: "Tail's End Village",
    },
    {
      identifier: 'Current location',
      name: "Tail's End Village",
    },
  ],
  traits: [
    {
      name: 'Intelligence',
      rating: 3.5,
    },
    {
      name: 'Charisma',
      rating: 2,
    },
    {
      name: 'Speed',
      rating: 1.5,
    },
    {
      name: 'Strength',
      rating: 4,
    },
    {
      name: 'Teamwork',
      rating: 4,
    },
    {
      name: 'Organization',
      rating: 2.5,
    },
    {
      name: 'Perception',
      rating: 3,
    },
    {
      name: 'Stealth',
      rating: 1,
    },
    {
      name: 'Agility',
      rating: 1,
    },
    {
      name: 'Leadership',
      rating: 4.5,
    },
    {
      name: 'Independence',
      rating: 3.5,
    },
    {
      name: 'Empathy',
      rating: 4.5,
    },
  ],
  health: 'Well',
  occupation: 'Retired',
  size: 80,
  injuries: {
    leftArm: false,
    rightArm: false,
    leftLeg: false,
    rightLeg: false,
    leftWing: false,
    rightWing: false,
    leftEye: false,
    rightEye: false,
    leftHorn: false,
    rightHorn: false,
    rigthEar: false,
    leftEar: false,
    rightEar: false,
    tail: false,
  },
  accessories: [
    {
      file: 'leftArmBand',
      name: 'Left Arm Band',
      color: '#ffe5a8',
    },
    {
      file: 'necklace',
      name: 'Necklace',
      color: '#ffe5a8',
    },
  ],
  creator: 'Bog The MudWing',
  builder: 'Bog The MudWing',
  style: 'debug',
}