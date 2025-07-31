import { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import {
  faBan,
  faBars,
  faCheck,
  faCircleInfo,
  faClone,
  faCode,
  faDownload,
  faEllipsis,
  faFileExport,
  faFolderOpen,
  faGear,
  faPlus,
  faRotateLeft,
  fas,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ActionIcon,
  Anchor,
  AppShell,
  Badge,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Image,
  JsonInput,
  Menu,
  Modal,
  SimpleGrid,
  Space,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import notImplemented from '../components/AppUtils/AppUtils';
import Configurator from '../components/Configurator/Configurator';
import Dragon from '../components/Dragon/Dragon';

library.add(fas, fab);

export function HomePage() {
  const { setColorScheme } = useMantineColorScheme();
  const [settingsModalOpened, { open: openSettingsModal, close: closeSettingsModal }] = useDisclosure(false);
  const [jsonModalOpened, { open: openJsonModal, close: closeJsonModal }] = useDisclosure(false);
  const [welcomeModalOpened, { open: openWelcomeModal, close: closeWelcomeModal }] =
    useDisclosure(true);
  const [aboutModalOpened, { open: openAboutModal, close: closeAboutModal }] = useDisclosure(false);
  const [configuratorPage, setConfiguratorPage] = useState(0);

  const emptyDragon: Dragon = {
    tribe: [],
    age: undefined,
    gender: '',
    primaryColor: '',
    secondaryColor: '',
    underscalesColor: '',
    membraneColor1: '',
    membraneColor2: '',
    eyeColor: '',
    spikesColor: '',
    name: '',
    pronouns: '',
    relations: [],
    locations: [],
    traits: [
      {
        name: 'Intelligence',
        rating: 0,
      },
      {
        name: 'Charisma',
        rating: 0,
      },
      {
        name: 'Speed',
        rating: 0,
      },
      {
        name: 'Strength',
        rating: 0,
      },
      {
        name: 'Teamwork',
        rating: 0,
      },
      {
        name: 'Organization',
        rating: 0,
      },
      {
        name: 'Perception',
        rating: 0,
      },
      {
        name: 'Stealth',
        rating: 0,
      },
      {
        name: 'Agility',
        rating: 0,
      },
      {
        name: 'Leadership',
        rating: 0,
      },
      {
        name: 'Independence',
        rating: 0,
      },
      {
        name: 'Empathy',
        rating: 0,
      },
    ],
    health: '',
    occupation: '',
    size: 50,
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
      leftArmBand: undefined,
      rightArmBand: undefined,
      leftEarring: undefined,
      rightEarring: undefined,
      noseRing: undefined,
      chestplate: undefined,
      glasses: undefined,
      necklace: undefined,
    },
    creator: '',
    builder: '',
    style: 'Pixel',
  };

  const exampleDragon: Dragon = {
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
  };

  const [dragon, setDragon] = useState<Dragon>(emptyDragon);
  const [history, setHistory] = useState<Dragon[]>([]);

  const setDragonWithHistory: React.Dispatch<React.SetStateAction<Dragon>> = (newDragon) => {
    setDragon((prevDragon) => {
      const resolvedNewDragon =
        typeof newDragon === 'function'
          ? (newDragon as (prev: Dragon) => Dragon)(prevDragon)
          : newDragon;

      setHistory((prevHistory) => [...prevHistory, prevDragon]);
      return resolvedNewDragon;
    });
  };

  function undo() {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) {
        return prevHistory;
      }

      const newHistory = [...prevHistory];
      const lastDragon = newHistory.pop()!;
      setDragon(lastDragon);
      return newHistory;
    });
  }

  const [json, setJson] = useState<string>('{"error":"This should not be empty!!"}');

  function loadBog() {
    setDragonWithHistory(exampleDragon);
    closeWelcomeModal();
  }

  function loadNew() {
    reset();
    closeWelcomeModal();
  }

  function reset() {
    setDragonWithHistory(emptyDragon);
    setConfiguratorPage(0);
  }

  function openJson() {
    setJson(JSON.stringify(dragon, null, 2));
    openJsonModal();
  }

  function applyJson() {
    setDragonWithHistory(JSON.parse(json));
    closeJsonModal();
  }

  return (
    <>
      <Notifications />

      <Modal opened={settingsModalOpened} onClose={closeSettingsModal} centered size="auto" title="App Settings">
        <Stack>
          <Switch
                checked={useMantineColorScheme().colorScheme === 'light'}
                onChange={(event) => {
                  const light: boolean = event.currentTarget.checked;
                  if (light) {
                    setColorScheme('light');
                  } else {
                    setColorScheme('dark');
                  }
                }}
                label="Use light theme"
                description="If disabled, the app will use the dark theme."
              />
        </Stack>
      </Modal>

      <Modal opened={jsonModalOpened} onClose={closeJsonModal} centered size="lg" title="JSON Data">
        <Stack>
          <JsonInput
            id="json-input"
            aria-label="JSON data input"
            placeholder="There's nothing here"
            validationError="Invalid JSON"
            formatOnBlur
            autosize
            minRows={4}
            value={json}
            onChange={setJson}
            maxRows={20}
            styles={{
              input: {
                overflow: 'scroll',
              },
            }}
          />
          <Group justify="space-between">
            <Button
              leftSection={<FontAwesomeIcon icon={faBan} />}
              onClick={closeJsonModal}
              variant="light"
            >
              Discard changes
            </Button>
            <Button leftSection={<FontAwesomeIcon icon={faCheck} />} onClick={applyJson}>
              Apply changes
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={welcomeModalOpened}
        onClose={closeWelcomeModal}
        centered
        withCloseButton={false}
        size="auto"
      >
        <Stack>
          <Title order={1}>Welcome to Flight Forge!</Title>
          <Text>
            Flight Forge is a web application that allows you to build characters based on Wings of
            Fire in a step-by-step guided form.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Card shadow="sm" withBorder>
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Bog</Text>
                <Badge color="orange">Mud</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                153-year-old Male MudWing
              </Text>

              <Flex mt="md" gap="md">
                <Button onClick={loadBog} fullWidth variant="light">
                  Open
                </Button>
                <Menu
                  shadow="md"
                  width={200}
                  transitionProps={{ transition: 'pop', duration: 200 }}
                >
                  <Menu.Target>
                    <ActionIcon aria-label="Options" variant="light" size={36}>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={notImplemented}
                      leftSection={<FontAwesomeIcon icon={faClone} size="sm" />}
                    >
                      Duplicate
                    </Menu.Item>
                    <Menu.Item
                      onClick={notImplemented}
                      leftSection={<FontAwesomeIcon icon={faTrash} size="sm" />}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            </Card>
            <Card shadow="sm" withBorder>
              <Card.Section>
                <Container h={160} />
              </Card.Section>

              <Text mt="md" mb="xs" fw={500}>
                Create New
              </Text>

              <Text size="sm" c="dimmed">
                Start from scratch
              </Text>

              <Button
                onClick={loadNew}
                mt="md"
                fullWidth
                leftSection={<FontAwesomeIcon icon={faPlus} />}
                variant="light"
              >
                New
              </Button>
            </Card>
          </SimpleGrid>
          <Group>
            <Button onClick={notImplemented} leftSection={<FontAwesomeIcon icon={faUpload} />}>
              Open Collection
            </Button>
            <Button onClick={notImplemented} leftSection={<FontAwesomeIcon icon={faDownload} />}>
              Save Collection
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal opened={aboutModalOpened} onClose={closeAboutModal} title="About" centered>
        <Stack>
          <Text>Flight Forge Version DEV-1</Text>
          <Text>
            Built by <Anchor href="https://blog.macver.org/about-me">Bog The MudWing</Anchor>.
          </Text>
          <Text>
            This is free and open source software licensed MIT and available on{' '}
            <Anchor href="https://github.com/BogTheMudWing/Flight-Forge">GitHub</Anchor>.
          </Text>
          <Image src="https://blog.macver.org/content/images/size/w1600/2025/06/Wordmark-Color-5.png" />
        </Stack>
      </Modal>

      <AppShell
        styles={{
          header: { backgroundColor: 'var(--mantine-color-grape-light)' },
          main: { display: 'flex' },
        }}
        padding="md"
        header={{ height: 80 }}
      >
        <AppShell.Header h="auto">
          <Group p="xm">
            <Stack px="md" gap="0" flex={1}>
              <Title order={2}>Flight Forge</Title>
              <Anchor href="https://github.com/BogTheMudWing/Flight-Forge" target="_blank">
                <Text size="sm">Version DEV-1 © 2025 Bog The MudWing</Text>
              </Anchor>
            </Stack>
            <Group>
              <Tooltip label={history.length > 0 ? 'Undo' : 'No undo steps'}>
                <ActionIcon
                  variant="subtle"
                  aria-label="Undo"
                  onClick={undo}
                  disabled={history.length === 0}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Export">
                <ActionIcon onClick={notImplemented} variant="subtle" aria-label="Export">
                  <FontAwesomeIcon icon={faFileExport} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Download">
                <ActionIcon onClick={notImplemented} variant="subtle" aria-label="Download">
                  <FontAwesomeIcon icon={faDownload} />
                </ActionIcon>
              </Tooltip>
              <Menu shadow="md" width={200} transitionProps={{ transition: 'pop', duration: 200 }}>
                <Menu.Target>
                  <ActionIcon variant="subtle" aria-label="Menu">
                    <FontAwesomeIcon icon={faBars} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={openWelcomeModal}
                    leftSection={<FontAwesomeIcon icon={faFolderOpen} size="sm" />}
                  >
                    Load
                  </Menu.Item>
                  <Menu.Item
                    onClick={reset}
                    leftSection={<FontAwesomeIcon icon={faPlus} size="sm" />}
                  >
                    New
                  </Menu.Item>
                  <Menu.Item
                    onClick={openJson}
                    leftSection={<FontAwesomeIcon icon={faCode} size="sm" />}
                  >
                    Raw data
                  </Menu.Item>
                  <Menu.Item
                    onClick={openSettingsModal}
                    leftSection={<FontAwesomeIcon icon={faGear} size="sm" />}
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    onClick={openAboutModal}
                    leftSection={<FontAwesomeIcon icon={faCircleInfo} size="sm" />}
                  >
                    About
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Space h="md" />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <Center>
              <Stack>
                <Image
                  radius="md"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                />
              </Stack>
            </Center>
            <Container w="100%" h="100%" mah={500}>
              <Configurator
                dragon={dragon}
                setDragon={setDragonWithHistory}
                page={configuratorPage}
                setPage={setConfiguratorPage}
              />
            </Container>
          </SimpleGrid>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
