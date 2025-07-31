import { notifications } from '@mantine/notifications';

export default function notImplemented() {
  notifications.show({
    color: 'red',
    withBorder: true,
    title: 'That is not implemented yet.',
    message: 'If this is a production instance, report this as a bug.'
  })
}

export function myJoin(array: string[], separator=',') {
  let str = '';
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== null && array[i] !== undefined) {
      str += array[i];
    }
    if (i < array.length - 1) {
      str += separator;
    }
  }

  return str;
}