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