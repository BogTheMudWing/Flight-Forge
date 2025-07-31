import { React, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import notImplemented from './components/AppUtils.jsx'

library.add(fas, far, fab)

import Configurator from './components/Configurator/Configurator.jsx'
import './App.css'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { Modal, Tooltip, Space, AppShell, Container, SimpleGrid, Text, Title, Stack, createTheme, Image, MantineProvider, Center, Anchor, ActionIcon, Group, Menu, em } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

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

  const [aboutModalOpened, { open: openAboutModal, close: closeAboutModal }] = useDisclosure(false);

  const emptyDragon = {
    tribe: [],
    age: null,
    gender: "",
    primaryColor: "",
    secondaryColor: "",
    underscalesColor: "",
    membraneColor1: "",
    membraneColor2: "",
    eyeColor: "",
    spikesColor: "",
    name: "",
    pronouns: "",
    relations: [],
    traits: [
      {
        name: "Intelligence",
        rating: 0
      },
      {
        name: "Charisma",
        rating: 0
      },
      {
        name: "Speed",
        rating: 0
      },
      {
        name: "Strength",
        rating: 0
      },
      {
        name: "Teamwork",
        rating: 0
      },
      {
        name: "Organization",
        rating: 0
      },
      {
        name: "Perception",
        rating: 0
      },
      {
        name: "Stealth",
        rating: 0
      },
      {
        name: "Agility",
        rating: 0
      },
      {
        name: "Leadership",
        rating: 0
      },
      {
        name: "Independence",
        rating: 0
      },
      {
        name: "Empathy",
        rating: 0
      }
    ],
    health: "",
    occupation: "",
    size: 0.5,
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
      rigthEar: false
    },
    accessories: {
      leftArmBand: null,
      rightArmBand: null,
      leftEarring: null,
      rightEarring: null,
      noseRing: null,
      chestplate: null,
      glasses: null,
      necklace: null
    },
    creator: "",
    builder: ""

  }

  const exampleDragon = {
    tribe: ["Mud"],
    age: 153,
    gender: "Male",
    primaryColor: "#E36C2A",
    secondaryColor: "#513119",
    underscalesColor: "#D99A5B",
    membraneColor1: "#E5A168",
    membraneColor2: "#E5A168",
    eyeColor: "#269FE4",
    spikesColor: "#000000",
    name: "Bog",
    pronouns: "he/him",
    relations: [
      {
        relation: "Sister",
        name: "Siltstorm",
        status: "Deceased"
      },
      {
        relation: "Sister",
        name: "Maple",
        status: "Deceased"
      }
    ],
    locations: [
      {
        identifier: "Hatching location",
        name: "Catamont's Claw"
      },
      {
        identifier: "Home location",
        name: "Tail's End Village"
      },
      {
        identifier: "Current location",
        name: "Tail's End Village"
      }
    ],
    traits: [
      {
        name: "Intelligence",
        rating: 3.5
      },
      {
        name: "Charisma",
        rating: 2
      },
      {
        name: "Speed",
        rating: 1.5
      },
      {
        name: "Strength",
        rating: 4
      },
      {
        name: "Teamwork",
        rating: 4
      },
      {
        name: "Organization",
        rating: 2.5
      },
      {
        name: "Perception",
        rating: 3
      },
      {
        name: "Stealth",
        rating: 1
      },
      {
        name: "Agility",
        rating: 1
      },
      {
        name: "Leadership",
        rating: 4.5
      },
      {
        name: "Independence",
        rating: 3.5
      },
      {
        name: "Empathy",
        rating: 4.5
      }
    ],
    health: "Well",
    occupation: "Retired",
    size: 0.8,
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
      rigthEar: false
    },
    accessories: {
      leftArmBand: {
        color: "#ffe5a8"
      },
      rightArmBand: null,
      leftEarring: null,
      rightEarring: null,
      noseRing: null,
      chestplate: null,
      glasses: null,
      necklace: {
        color: "#ffe5a8"
      }
    },
    creator: "Bog The MudWing",
    builder: "Bog The MudWing"

  }

  const [dragon, setDragon] = useState(exampleDragon);

  return (
    <MantineProvider theme={theme}>

      <Notifications />

      <Modal opened={aboutModalOpened} onClose={closeAboutModal} title="About" centered>
        <Stack>
          <Text>Flight Forge Version DEV-1</Text>
          <Text>Built by <Anchor href='https://blog.macver.org/about-me'>Bog The MudWing</Anchor>.</Text>
          <Text>This is free and open source software licensed MIT and available on <Anchor href='https://github.com/BogTheMudWing/Flight-Forge'>GitHub</Anchor>.</Text>
          <Image src={"https://blog.macver.org/content/images/size/w1600/2025/06/Wordmark-Color-5.png"} />
        </Stack>
      </Modal>

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
            <Group>
              <Tooltip label="Undo">
                <ActionIcon variant="subtle" aria-label="Undo" onClick={notImplemented}>
                  <FontAwesomeIcon icon="fa-solid fa-rotate-left" />
                </ActionIcon>
              </Tooltip>
              <Menu shadow="md" width={200} transitionProps={{ transition: 'pop', duration: 200 }}>
                <Menu.Target>
                  <ActionIcon variant="subtle" aria-label="Menu">
                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item onClick={setDragon} leftSection={<FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />}>
                    New
                  </Menu.Item>
                  <Menu.Item onClick={openAboutModal} leftSection={<FontAwesomeIcon icon="fa-solid fa-circle-info" size="sm" />}>
                    About
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Space h='md' />
            </Group>

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
              <Configurator dragon={dragon} />
            </Container>
          </SimpleGrid>
        </AppShell.Main>
      </AppShell>

    </MantineProvider>

  )
}

export default App
