import { notifications } from '@mantine/notifications';

export default function notImplemented() {
  notifications.show({
    color: 'red',
    withBorder: true,
    title: 'That is not implemented yet.',
    message: 'If this is a production instance, report this as a bug.'
  })
}