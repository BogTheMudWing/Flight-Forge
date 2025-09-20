import styleInfoDebug from '@/images/debug/info.json';
import styleInfoDeveloper from '@/images/developer/info.json';

import * as t from 'io-ts'

export const StylePackCreator = t.type({
    name: t.string,
    imageUrl: t.string,
    link: t.string,
})

export const AccessoryImage = t.type({
    name: t.string,
    image: t.string,
})

export const StylePackInfo = t.type({
    name: t.string,
    description: t.string,
    packVersion: t.string,
    creators: t.array(StylePackCreator),
    includedTribes: t.array(t.string),
    includedAccessories: t.array(AccessoryImage),
});

export const styleInfo = (style: string) => {
    if (style == 'debug') return styleInfoDebug as t.TypeOf<typeof StylePackInfo>;
    if (style == 'developer') return styleInfoDeveloper as t.TypeOf<typeof StylePackInfo>;
    return null;
}