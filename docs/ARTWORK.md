# Artwork

If you are interested in creating a style pack for Flight Forge, I would love to have it added! Flight Forge builds a character image by layering and recoloring several images. This guide will help you create a style pack that works with Flight Forge. **Please read the entire guide before starting any work so that you know exactly what you'll need before you start.**

If you need help, don't be afraid to reach out to me. I have my contact information at the end of this document.

## Tribe Images

These images are use for each of the ten tribes. You don't need to include all of them.

| Eyes      | Body             | Head             | Legs             | Tail             | Wings            |
|---------- | ---------------- | ---------------- | ---------------- | ---------------- | ---------------- |
| eyes.png  | membranes.png    | membranes.png    | membranes.png    | membranes.png    | membranes.png    |
|           | primary.png      | primary.png      | primary.png      | primary.png      | primary.png      |
|           | secondary.png    | secondary.png    | secondary.png    | secondary.png    | secondary.png    |
|           | spikes.png       | spikes.png       | spikes.png       | spikes.png       | spikes.png       |
|           | underscales.png  | underscales.png  | underscales.png  | underscales.png  |                  |

This is easiest to do if you utilize layers in an art program.

## Accessories

You may also choose to provide accessories. Below are the accessories included in the default pixel style, but you can omit any or all of them. You may also add your own.

- left_arm_band.png
- right_arm_band.png
- left_earring.png
- right_earring.png
- nose_ring.png
- chestplate.png
- glasses.png
- necklace.png
- crown.png
- bag.png

## Backgrounds

You may also choose to provide backgrounds. Below are the backgrounds included in the default pixel style, but you can omit any or all of them. You may also add your own.

> 🚧 **This section is incomplete.**
> 
> I'm not yet sure what background will be included by default.

## Coloring

It's very important that the images are **not black and white.** Instead, use red (#ff0000) as the base color. This is because Flight Forge coloring works using hue rotation, saturtion, and brightness filters.

White (#ffffff) will always appear as white and black (#000000) will always appear as black. A grey value will never become saturated, but red can be desaturated. This allows you to make decisions about saturation, hue, and brightness more freely than recoloring a black and white image would allow.

> 🚧 **This section is incomplete.**
> 
> This concept is difficult to understand and I would like to provide more information, including images.

## Requirements


All images must be the same size. The exact dimensions are not strict, but the images must be 1:1 aspect ratio. Images must not be obscene or disturbing and they should be free of text, watermarks, and backgrounds. You must provide the images in png format. If your image editor does not support exporting in png, you can use [Squoosh](https://squoosh.app) to convert by uploading the image and setting the compression to *png*.

> 🖼️ **Image wanted here.**
> 
> There should be an image showing the Squoosh interface and where to set the codec here.

Finally, you must acknowledge that the images you create are licensed CC0 1.0. This allows them to be used by anyone in any way without attribution. To do this, save the contents of the [license text](https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt) (← right-click and Save As...) to `license.txt` and include it as indicated in the directory tree below.

**By doing this, you waive all copyright and related or neighboring rights together with all associated claims and causes of action with respect to this work to the extent possible under the law.**

**Everyone will be allowed to trace, share, remix, recolor, sell, and otherwise use the included images in any way they see fit without crediting you.**

To build a style pack so that Flight Forge can use it, arrange the files in the structure below. `style_name` is the name of the style. All files should be lowercase with underscores to represent spaces.

```
🖿 style_name/
├─ 🖿 accessory/
|  ╰─ 🖻 (optional accessories in png format)
├─ 🖿 background/
│  ├─ 🖻 (optional backgrounds in png format)
├─ 🖿 tribe/
│  ├─ 🖿 hive/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  ╰─ 🖻 eyes.png
│  ├─ 🖿 ice/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  │  ╰─ 🖻 eyes.png
│  ├─ 🖿 leaf/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  │  ╰─ 🖻 eyes.png
│  ├─ 🖿 mud/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  │  ╰─ 🖻 eyes.png
│  ├─ 🖿 night/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  │  ╰─ 🖻 eyes.png
│  ├─ 🖿 rain/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  │  ╰─ 🖻 eyes.png
│  ├─ 🖿 sand/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  │  ╰─ 🖻 eyes.png
│  ├─ 🖿 silk/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  │  ╰─ 🖻 eyes.png
│  ├─ 🖿 sea/
│  │  ├─ 🖿 body/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 head/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 legs/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 tail/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ├─ 🖻 spikes.png
│  │  │  ╰─ 🖻 underscales.png
│  │  ├─ 🖿 wings/
│  │  │  ├─ 🖻 membranes.png
│  │  │  ├─ 🖻 primary.png
│  │  │  ├─ 🖻 secondary.png
│  │  │  ╰─ 🖻 spikes.png
│  │  │  ╰─ 🖻 eyes.png
│  ╰─ 🖿 sky/
│     ├─ 🖿 body/
│     │  ├─ 🖻 membranes.png
│     │  ├─ 🖻 primary.png
│     │  ├─ 🖻 secondary.png
│     │  ├─ 🖻 spikes.png
│     │  ╰─ 🖻 underscales.png
│     ├─ 🖿 head/
│     │  ├─ 🖻 membranes.png
│     │  ├─ 🖻 primary.png
│     │  ├─ 🖻 secondary.png
│     │  ├─ 🖻 spikes.png
│     │  ╰─ 🖻 underscales.png
│     ├─ 🖿 legs/
│     │  ├─ 🖻 membranes.png
│     │  ├─ 🖻 primary.png
│     │  ├─ 🖻 secondary.png
│     │  ├─ 🖻 spikes.png
│     │  ╰─ 🖻 underscales.png
│     ├─ 🖿 tail/
│     │  ├─ 🖻 membranes.png
│     │  ├─ 🖻 primary.png
│     │  ├─ 🖻 secondary.png
│     │  ├─ 🖻 spikes.png
│     │  ╰─ 🖻 underscales.png
│     ├─ 🖿 wings/
│     │  ├─ 🖻 membranes.png
│     │  ├─ 🖻 primary.png
│     │  ├─ 🖻 secondary.png
│     │  ╰─ 🖻 spikes.png
│     ╰─ 🖻 eyes.png
├─ 🖿 source/
│  ╰─ 🖻 (source files from your editor)
├ 🖹 license.txt
╰ 🖹 info.json
```

## Info File

The `info.json` file contains information about the style pack. See the example below:

```json
{
    "name": "Pixel", 
    "description": "A pixel art pack inspired by the sprites of Super Nintento Entertainment System games.",
    "packVersion": "1",
    "creators": [
        {
            "name": "Bog",
            "imageUrl": "https://blog.macver.org/content/images/2025/03/Compute-Cube-Medium.png",
            "link": "https://blog.macver.org/about-me"
        }
    ],
    "included_tribes": [
        "Hive",
        "Ice",
        "Leaf",
        "Mud",
        "Night",
        "Rain",
        "Sand",
        "Sea",
        "Silk",
        "Sky"
    ],
    "includedAccessories": [
        {
            "name": "Arm Band",
            "image": "arm_band"
        },
        {
            "name": "Earring",
            "image": "earring"
        },
        {
            "name": "Glasses",
            "image": "glasses"
        },
        {
            "name": "Necklace",
            "image": "necklace"
        },
        {
            "name": "Chestplate",
            "image": "chestplate"
        }
    ]
}
```

Below is an explanation of the file. Elements which are *required* cannot be omitted. If an element is *optional*, you can delete it (and its children, if it has any) and Flight Forge will still accept the pack.

* `name`: **Required String** - The name of the style pack. This is displayed in the app.
* `description`: **Optional String** - A short description of the style pack in one or two sentences. This is displayed in the app.
* `packVersion`: **Required String** - Used by Flight Forge internally to figure out how the pack is structured. If the pack structure follows this guide, it should be `1`.
* `creators`: **Optional Object List** - A list of creators of the pack. Must have at least one creator.
  * `name`: **Required String** - The name of the creator. This can be real name, a name you use online, or any way you want to be recognized. This is displayed in the app.
  * `image_url`: **Optional String** - A URL that points to an image to represent you. This is displayed in the app.
  * `link`: **Optional String** - A URL to your website or social profile. This is displayed in the app.
* `includedTribes`: **Required String List** - A list of tribes that the pack supports. This is usually just the ten canon tribes, but you can add or remove whatever you want here if you aren't submitting it to be added to the app.
* `includedAccessories`: **Optional Object List** - A list of accessories. You can have as many or as few accessories as you like, and they can be whatever you want. I recommend including all accessories in the Pixel style to ensure the best compatibility.
  * `name`: **Required String** - The name of the accessory. This is displayed in the app. It doesn't have to match the image name.
  * `image`: **Required String** - The name of the image of the accessory without the file extension. It doesn't have to match the display name.

## Testing

> ⚠️ **Functionality described below does not exist yet.**
>
> Style pack selection is not yet implemented in the app. In the future, this is how I would like it to work.

To test your style pack, open Flight Forge, load a dragon, and open the style pack menu. Click the *Load from folder* and upload the folder. You will need to re-upload the folder to show new changes, and reloading the page will make Flight Forge forget the folder.

## Submission

Create an archive file (like a .zip, .tar.gz, or .7z) and [open an issue](https://code.macver.org/Bog/Flight-Forge) with the archive attached. I will review it and, if approved, add it to the application. Don't worry if your submission isn't exactly perfect. I will try to fix structure and syntax errors and give feedback if necessary.

If, at any point, you wish for your style pack to be updated or removed, you may [create an issue]((https://code.macver.org/Bog/Flight-Forge)) or reach out to me directly by email at bog@macver.org, on Mastodon/ActivityPub by [@Stonley890@mastodon.social](https://mastodon.social/@Stonley890), over Matrix by [@stonleyfx:matrix.org](https://matrix.to/#/@stonleyfx:matrix.org), or on Discord by [@bogthemudwing](https://discord.com/users/505833634134228992).