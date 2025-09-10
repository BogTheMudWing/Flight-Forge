# JSON Format

Flight Forge saves and loads collections in the form of JSON files. Here is the default collection provided in the app:

```json
{
  "name": "Default",
  "dragons": [
    {
      "tribe": [
        "Sky"
      ],
      "bodyParts": {
        "head": "Sky",
        "body": "Sky",
        "wings": "Sky",
        "legs": "Sky",
        "tail": "Sky"
      },
      "age": 8,
      "gender": "Female",
      "primaryColor": "#ffc466",
      "secondaryColor": "#9e3d34",
      "underscalesColor": "#ffc966",
      "membraneColor1": "#fff1d1",
      "membraneColor2": "#ffc038",
      "eyeColor": "#269FE4",
      "spikesColor": "#331b1b",
      "name": "Peril",
      "pronouns": "she/her",
      "relations": [
        {
          "relation": "Father",
          "name": "Chameleon",
          "status": "Estranged"
        },
        {
          "relation": "Friend",
          "name": "Clay",
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
  ],
  "version": 1
}
```

* `name`: **Required String** - The name of the collection which is shown and can be edited in the home menu. This is also the default name used when saving the colleciton.
* `dragons`: **Required Object List** - The list of dragons that this collection contains.
  * `tribe`: **Required String List** - The list of tribes that the dragon is. This determines which style packs are allowed to be chosen in the app and which names are chosen from the randomizer.
  * `bodyParts`: **Required Object** - The body parts to use for hybrids. If the dragon is only one tribe, this is ignored.
    * `head`: **Required String** - The tribe to use for the head.
    * `body`: **Required String** - The tribe to use for the body.
    * `wings`: **Required String** - The tribe to use for the wings.
    * `legs`: **Required String** - The tribe to use for the legs.
    * `tail`: **Required String** - The tribe to use for the tail.
  * `age`: **Required Number** - The age of the dragon or -1 if unset.
  * `gender`: **Optional String** - The gender of the dragon.
  * `primaryColor`: **Required String** - The primary color of the dragon.
  * `secondaryColor`: **Required String** - The secondary color of the dragon.
  * `underscalesColor`: **Required String** - The color of the dragon's underscales.
  * `membraneColor1`: **Required String** - The color of the top of the membrane gradient.
  * `membraneColor2`: **Required String** - The color of the bottom of the membrane gradient.
  * `eyeColor`: **Required String** - The eye color of the dragon.
  * `spikesColor`: **Required String** - The color of the dragon's spikes.
  * `name`: **Optional String** - The name of the dragon.
  * `pronouns`: **Optional String** - The pronouns of the dragon.
  * `relations`: **Required Object List** - The list of relations the dragon has.
    * `relation`: **Required String** - The relation to this related dragon. Limited in the app to dropdown options but can be anything.
    * `name`: **Required String** - The name of this related dragon.
    * `status`: **Required String** - The status of this related dragon. Limited in the app to dropdown options but can be anything.
  * `locations`: **Required Object List** - The list of locations relevant to the dragon.
    * `identifier`: **Required String** - How this location is relevant to the dragon.
    * `name`: **Required String** - The name of the lcoation.
  * `traits`: **Required Object List** - The list of traits that this dragon has. Limited in app to provided options, but can include anything.
    * `name`: **Required String** - The name of the trait.
    * `rating`: **Required Number** - The rating of the trait. Limited in app from 0 to 5 (inclusive) but can be anything.
  * `health`: **Optional String** - The health of the dragon. Limited in the app to dropdown options but can be anything.
  * `occupation`: **Optional String** - The occupation of the dragon.
  * `size`: **Required Number** - Unused.
  * `accessories`: **Required Object List** - The list of accessories that this dragon has.
    * `name`: **Required String** - The name of the accessory.
    * `file`: **Required String** - The name of the accessory's image file.
    * `color`: **Required String** - The color of the accessory.
  * `creator`: **Optional String** - The creator of the character.
  * `builder`: **Optional String** - The individual who built the character in the app.
  * `style`: **Required String** - The style pack that the dragon uses.
* `version`: **Required Number** - The version of the spec that the collection file uses. The latest version is 1.