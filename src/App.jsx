import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import Configurator from './components/Configurator/Configurator.jsx'
import './App.css'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { AppShell, Container, SimpleGrid, Text, Title, Stack, createTheme, Image, MantineProvider, Center, Anchor, ActionIcon, Group, Menu, Textarea } from '@mantine/core';

const purpleFire = [
  '#fee9ff',
  '#f4d1ff',
  '#e5a0fc',
  '#d56cf8',
  '#c840f5',
  '#c22cf4',
  '#bc13f4',
  '#a504d9',
  '#9300c3',
  '#8000ab'
];

const theme = createTheme({
  colors: {
    purpleFire,
  },
  fontFamily: 'Roboto, sans-serif',
  primaryColor: 'purpleFire',
  defaultRadius: 'md'
});

function App() {


  return (
    <>
      <MantineProvider theme={theme}>

        <AppShell
          styles={{
            header: { backgroundColor: 'var(--mantine-color-grape-light)' },
            main: { display: 'flex' }
          }}
          padding="md"
          header={{ height: 80 }}
        >

          <AppShell.Header h={"auto"}>
            <Group p={'xm'}>
              <Stack px="md" gap="0" flex={1}>
                <Title order={2}>Flight Forge</Title>
                <Anchor href="https://github.com/BogTheMudWing/Flight-Forge" target="_blank">
                  <Text size="sm">Version DEV-1 © 2025 Bog The MudWing</Text>
                </Anchor>
              </Stack>
              <Menu shadow="md" width={200} transitionProps={{ transition: 'pop', duration: 200 }}>
                <Menu.Target>
                  <ActionIcon variant="subtle" aria-label="Menu" size={'xl'}>
                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />}>
                    New
                  </Menu.Item>
                  <Menu.Item leftSection={<FontAwesomeIcon icon="fa-solid fa-circle-info" size="sm" onClick={open} />}>
                    About
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

            </Group>

          </AppShell.Header>

          <AppShell.Main>
            <SimpleGrid
              cols={{ base: 1, md: 2 }}
            >
              <Center>
                <Stack>
                  <Image
                    radius="md"
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                  />
                </Stack>
              </Center>
              <Container w='100%' h='100%' mah={500}>
                <Configurator />
              </Container>
            </SimpleGrid>
          </AppShell.Main>
        </AppShell>


      </MantineProvider>
    </>

  )
}

export default App
