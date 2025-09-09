import { defaultDragon, Dragon } from '../Dragon/Dragon';
import * as t from 'io-ts'

export const Collection = t.type({
  name: t.string,
  dragons: t.array(Dragon),
  // Data version for future changes
  version: t.number,
})

export const defaultCollection: t.TypeOf<typeof Collection> = {
  name: 'Default',
  dragons: [
    defaultDragon
  ],
  version: 1,
};
