import Dragon from '../Dragon/Dragon';

export interface Collection {
  name: string;
  dragons: Dragon[];
  // Data version for future changes
  version: number;
}

export const defaultCollection: Collection = {
  name: 'Default',
  dragons: [
    {
      tribe: ['Mud'],
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
      accessories: {
        leftArmBand: {
          color: '#ffe5a8',
        },
        rightArmBand: undefined,
        leftEarring: undefined,
        rightEarring: undefined,
        noseRing: undefined,
        chestplate: undefined,
        glasses: undefined,
        necklace: {
          color: '#ffe5a8',
        },
      },
      creator: 'Bog The MudWing',
      builder: 'Bog The MudWing',
      style: 'Pixel',
    },
  ],
  version: 1,
};
