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
    accessories: t.array(Accessory),
    // The original creator of the character
    creator: t.string,
    // The user who built the dragon
    builder: t.string,
    // The art style to render as
    style: t.string,
})

export const defaultDragon = {
    tribe: [
        "Sky"
    ],
    bodyParts: {
        head: "Sky",
        body: "Sky",
        wings: "Sky",
        legs: "Sky",
        tail: "Sky"
    },
    age: 8,
    gender: "Female",
    primaryColor: "#ffc466",
    secondaryColor: "#9e3d34",
    underscalesColor: "#ffc966",
    membraneColor1: "#fff1d1",
    membraneColor2: "#ffc038",
    eyeColor: "#269FE4",
    spikesColor: "#331b1b",
    name: "Peril",
    pronouns: "she/her",
    relations: [
        {
            relation: "Father",
            name: "Chameleon",
            status: "Estranged"
        },
        {
            relation: "Friend",
            name: "Clay",
            "status": "Good"
        },
        {
            "relation": "Mother",
            "name": "Kestrel",
            "status": "Deceased"
        },
        {
            "relation": "Mentor",
            "name": "Osprey",
            "status": "Deceased"
        },
        {
            "relation": "Adoptive Mother",
            "name": "Scarlet",
            "status": "Deceased"
        },
        {
            "relation": "Friend",
            "name": "Turtle",
            "status": "Good"
        }
    ],
    "locations": [
        {
            "identifier": "Hatching location",
            "name": "the SkyWing Palace"
        },
        {
            "identifier": "Home location",
            "name": "Jade Mountain Academy"
        },
        {
            "identifier": "Current location",
            "name": "Jade Mountain Academy"
        },
        {
            "identifier": "Growing up location",
            "name": "the SkyWing Palace"
        }
    ],
    "traits": [
        {
            "name": "Intelligence",
            "rating": 2.5
        },
        {
            "name": "Charisma",
            "rating": 3
        },
        {
            "name": "Speed",
            "rating": 2.5
        },
        {
            "name": "Strength",
            "rating": 2
        },
        {
            "name": "Teamwork",
            "rating": 2
        },
        {
            "name": "Organization",
            "rating": 1
        },
        {
            "name": "Perception",
            "rating": 1.5
        },
        {
            "name": "Stealth",
            "rating": 0.5
        },
        {
            "name": "Agility",
            "rating": 1.5
        },
        {
            "name": "Leadership",
            "rating": 1
        },
        {
            "name": "Independence",
            "rating": 2
        },
        {
            "name": "Empathy",
            "rating": 3
        }
    ],
    "health": "Well",
    "occupation": "Student",
    "size": 80,
    "accessories": [],
    "creator": "Tui T. Sutherland",
    "builder": "Bog The MudWing",
    "style": "developer"
}