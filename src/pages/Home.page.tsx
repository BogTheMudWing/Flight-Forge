import { JSX, useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { faArrowUpRightFromSquare, faBan, faBars, faBug, faCheck, faCircleInfo, faClone, faCode, faDownload, faEllipsis, faFileExport, faGear, faHome, faPlus, faRotateLeft, fas, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import { ActionIcon, Anchor, AppShell, Button, Card, Center, Container, FileButton, Flex, Group, Image, JsonInput, Menu, Modal, SimpleGrid, Space, Stack, Switch, Text, TextInput, Title, Tooltip, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications, Notifications } from '@mantine/notifications';
import ImagePreview from '@/components/ImagePreview/ImagePreview';
import notImplemented, { myJoin } from '../components/AppUtils/AppUtils';
import { Collection, defaultCollection } from '../components/Collection/Collection';
import Configurator from '../components/Configurator/Configurator';
import { Dragon } from '../components/Dragon/Dragon';
import icon from '../images/icon.png';
import Telemetry, {allowTelemetry, denyTelemetry, isTelemetryEnabled} from '@/components/Telemetry/Telemetry';
import './Home.page.css'
import { exportImage } from '@/components/Exporter/Exporter';

library.add(fas, fab);

export function HomePage() {
  const { setColorScheme } = useMantineColorScheme();
  const [settingsModalOpened, { open: openSettingsModal, close: closeSettingsModal }] =
    useDisclosure(false);
  const [jsonModalOpened, { open: openJsonModal, close: closeJsonModal }] = useDisclosure(false);
  const [welcomeModalOpened, { open: openWelcomeModal, close: closeWelcomeModal }] =
    useDisclosure(true);
  const [aboutModalOpened, { open: openAboutModal, close: closeAboutModal }] = useDisclosure(false);
  const [configuratorPage, setConfiguratorPage] = useState<number>(0);
  const [collectionFile, setCollectionFile] = useState<File | null>(null);
  const [collection, setCollection] = useState<t.TypeOf<typeof Collection>>(defaultCollection);
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(collection, null, 2))}`;

  // Undo on Ctrl + Z
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "z") { // if Ctrl and Z
        event.preventDefault(); // Prevent default browser behavior
        undo(); // Undo
      }
    };

    // Add listener
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Read and parse collectionFile
  useEffect(() => {
    // Make sure it exists
    if (collectionFile) {
      // We use a FileReader to read the file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        // Get the content as string
        const fileContent: string = fileReader.result as string;
        // Parse the string into JSON
        const jsonData: JSON = JSON.parse(fileContent);
        // Create a Collection from the JSON
        const decoded = Collection.decode(jsonData);
        // If isLeft is true, there was a problem.
        if (isLeft(decoded)) {
          // Notify user
          notifications.show({
            color: 'red',
            withBorder: true,
            title: 'There was a problem opening that file.',
            message: 'Could not validate data: '.concat(PathReporter.report(decoded).join('\n')),
          });
        } else {
          // Everything went well, store as collection
          const decodedCollection: t.TypeOf<typeof Collection> = decoded.right;
          // Set state
          setCollection(decodedCollection);
          // Notify user that all is well
          notifications.show({
            color: 'green',
            withBorder: true,
            title: 'Collection opened',
            message: 'Opened collection with '
              .concat(decodedCollection.dragons.length.toString())
              .concat(' dragons.'),
          });
        }
      };
      // Run all that stuff
      fileReader.readAsText(collectionFile);
    }
  }, [collectionFile]);

  // Used when creating a new dragon
  const emptyDragon: t.TypeOf<typeof Dragon> = {
    tribe: [],
    bodyParts: {
      head: '',
      body: '',
      wings: '',
      legs: '',
      tail: '',
    },
    age: -1,
    gender: '',
    primaryColor: '#ffffff',
    secondaryColor: '#ffffff',
    underscalesColor: '#ffffff',
    membraneColor1: '#ffffff',
    membraneColor2: '#ffffff',
    eyeColor: '#ffffff',
    spikesColor: '#ffffff',
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

  // setDragon should not be used directly. setHistory should be used instead, which allows the undo function.
  const [dragon, setDragon] = useState<t.TypeOf<typeof Dragon>>(emptyDragon);
  const [history, setHistory] = useState<t.TypeOf<typeof Dragon>[]>([]);

  /**
   * Change the active dragon and save the current one in undo history.
   * @param newDragon the modified Dragon
   */
  const setDragonWithHistory: React.Dispatch<React.SetStateAction<t.TypeOf<typeof Dragon>>> = (
    newDragon
  ) => {
    setDragon((prevDragon: t.TypeOf<typeof Dragon>) => {
      const resolvedNewDragon =
        typeof newDragon === 'function'
          ? (newDragon as (prev: t.TypeOf<typeof Dragon>) => t.TypeOf<typeof Dragon>)(prevDragon)
          : newDragon;

      setHistory((prevHistory) => [...prevHistory, prevDragon]);
      return resolvedNewDragon;
    });
  };

  /**
   * Change the active dragon to the previous saved step.
   */
  function undo(): void {
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

  /**
   * Reset configurator and close welcome modal
   */
  function loadNew(): void {
    reset();
    closeWelcomeModal();
  }

  /**
   * Load new empty dragon and reset configurator. If you also want to close the welcome modal, use loadNew().
   */
  function reset(): void {
    setDragonWithHistory(emptyDragon);
    setConfiguratorPage(0);
  }

  /**
   * Turn the active dragon into JSON and open it in the JSON editor.
   */
  function openJson(): void {
    setJson(JSON.stringify(dragon, null, 2));
    openJsonModal();
  }

  /**
   * Take the text in the JSON editor and set it as the active dragon.
   */
  function applyJson(): void {
    setDragonWithHistory(JSON.parse(json));
    closeJsonModal();
  }

  /**
   * Load a given dragon and close the welcome modal
   * @param dragonToLoad the dragon to load as the active dragon
   */
  function loadDragon(dragonToLoad: t.TypeOf<typeof Dragon>): void {
    setDragonWithHistory(dragonToLoad);
    closeWelcomeModal();
  }

  /**
   * Remove a dragon from the loaded collection
   * @param dragonToDelete the dragon to remove from the collect
   */
  function deleteDragon(dragonToDelete: t.TypeOf<typeof Dragon>): void {
    const index: number = collection.dragons.indexOf(dragonToDelete);
    if (index === -1) {
      // This shouldn't happen, but if the dragon is not found, notify user.
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'That dragon was not found in the collection.',
      });
    } else {
      setCollection((prev) => ({
        ...prev,
        dragons: collection.dragons.filter((item) => item.name !== dragonToDelete.name),
      }));
    }
  }

  /**
   * Duplicates a dragon in the current collection.
   * @param dragonToDuplicate the dragon in the collection to duplicate
   */
  function duplicateDragon(dragonToDuplicate: t.TypeOf<typeof Dragon>): void {
    const index: number = collection.dragons.indexOf(dragonToDuplicate);
    const newDragon = structuredClone(dragonToDuplicate);
    newDragon.name = newDragon.name.concat(' copy');
    if (index === -1) {
      // This shouldn't happen, but if the dragon is not found, notify user.
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'That dragon was not found in the collection.',
      });
    } else {
      // Create a copy of the collection of dragons
      const newItems = collection.dragons;
      // Add the dragon to duplicate just after itself
      newItems.splice(index + 1, 0, newDragon);
      // Save changes to state
      setCollection((prev) => ({ ...prev, dragons: newItems }));
    }
  }

  /**
   * Generate dragon cards for welcome modal
   * @returns elements representing the dragons in the collection for the welcome modal
   */
  function generateCards(): JSX.Element[] {
    const elements: JSX.Element[] = [];

    collection.dragons.forEach((dragonInCollection: t.TypeOf<typeof Dragon>) => {
      // Name
      let name: string = dragonInCollection.name;
      if (name === undefined || name === null || name === '') {
        name = 'Unnamed';
      }

      // Age
      const age: number | undefined = dragonInCollection.age;
      let ageString: string;
      if (age === undefined || age === null || age < 0) {
        ageString = '';
      } else {
        ageString = age.toString().concat('-year-old ');
      }

      // Gender
      let gender: string = dragonInCollection.gender;
      if (name === undefined || name === null || name === '') {
        gender = '';
      } else {
        gender = gender.concat(' ');
      }

      // Tribes
      const tribes: string[] = dragonInCollection.tribe;
      let tribeString: string;
      if (tribes === undefined || tribes === null || tribes.length === 0) {
        tribeString = 'Dragon';
      } else {
        tribeString = myJoin(tribes, '/').concat('Wing');
      }

      // Build it!
      elements.push(
        <Card shadow="sm" withBorder>
          <Card.Section>
            <Image // TODO: This should be a preview of the dragon
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Text mt="md" mb="xs" fw={500}>
            {name}
          </Text>

          <Text size="sm" c="dimmed">
            {ageString.concat(gender).concat(tribeString)}
          </Text>

          <Flex mt="md" gap="md">
            <Button onClick={() => loadDragon(dragonInCollection)} fullWidth variant="light">
              Open
            </Button>
            <Menu shadow="md" width={200} transitionProps={{ transition: 'pop', duration: 200 }}>
              <Menu.Target>
                <ActionIcon aria-label="Options" variant="light" size={36}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => duplicateDragon(dragonInCollection)}
                  leftSection={<FontAwesomeIcon icon={faClone} size="sm" />}
                >
                  Duplicate
                </Menu.Item>
                <Menu.Item
                  onClick={() => deleteDragon(dragonInCollection)}
                  leftSection={<FontAwesomeIcon icon={faTrash} size="sm" />}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Card>
      );
    });

    return elements;
  }

  function doExport() {
    let imagePreview: HTMLElement | null = document.getElementById('image-preview');
    if (imagePreview == null) {
      return;
    }
    let images = imagePreview.children;
    exportImage(images, dragon.name, dragon.membraneColor1, dragon.membraneColor2);
  }

  const [lightModeSettingChecked, setlightModeSettingChecked] = useState(useMantineColorScheme().colorScheme === 'light');
  const [telemetrySettingChecked, setTelemetrySettingChecked] = useState(isTelemetryEnabled());

  return (
    <>
      <Notifications />

      <Modal
        opened={settingsModalOpened}
        onClose={closeSettingsModal}
        centered
        size="auto"
        title="App Settings"
      >
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
              setlightModeSettingChecked(event.currentTarget.checked);
            }}
            label="Use light theme"
            description="If disabled, the app will use the dark theme."
          />
          <Switch
            checked={telemetrySettingChecked}
            onChange={(event) => {
              const allow: boolean = event.currentTarget.checked;
              if (allow) {
                allowTelemetry(true);
                event.currentTarget.checked = true;
              } else {
                denyTelemetry(true);
                event.currentTarget.checked = false;
              }
              setTelemetrySettingChecked(event.currentTarget.checked);
            }}
            label="Allow telemetry"
            description="If enabled, anonymous usage data will be sent to the developer."
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
              Discard
            </Button>
            <Button leftSection={<FontAwesomeIcon icon={faCheck} />} onClick={applyJson}>
              Apply
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={welcomeModalOpened}
        onClose={closeWelcomeModal}
        centered
        withCloseButton={false}
        size="100%"
      >
        <Stack>
          <Title style={{order: -2}} order={1}>Welcome to Flight Forge!</Title>
          <Text style={{order: -2}}>
            Flight Forge is a web application that allows you to build characters based on Wings of
            Fire in a step-by-step guided form.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 3 }} className='dragon-list'>
            {generateCards()}
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
          <Flex gap="md" align="flex-end" className='collection-buttons'>
            <TextInput
              label="Collection name"
              variant="filled"
              value={collection.name}
              onChange={(newName) => {
                setCollection((prev) => ({ ...prev, name: String(newName) }));
              }}
            />
            <FileButton onChange={setCollectionFile} accept="application/json">
              {(props) => (
                <Button {...props} leftSection={<FontAwesomeIcon icon={faUpload} />}>
                  Open Collection
                </Button>
              )}
            </FileButton>
            <Anchor href={dataStr} download={collection.name.concat('.json')}>
              <Button leftSection={<FontAwesomeIcon icon={faDownload} />}>Save Collection</Button>
            </Anchor>
          </Flex>
        </Stack>
      </Modal>

      <Modal opened={aboutModalOpened} onClose={closeAboutModal} title="About" centered>
        <Stack>
          <Text>Flight Forge Version DEV-1</Text>
          <Text>
            Built by <Anchor href="https://blog.macver.org/about-me" target='new'>Bog The MudWing <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' /></Anchor>.
          </Text>
          <Text>
            This is free and open source software licensed MIT and available on{' '}
            <Anchor href="https://code.macver.org/Bog/Flight-Forge" target='new'>Macver Code Athenaeum <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' /></Anchor>.
          </Text>
          <Text>
            Images are licensed <Anchor href='https://creativecommons.org/publicdomain/zero/1.0/' target='new'>CC0 1.0 <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' /></Anchor> and can be used for any purpose without attribution.
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
              alt=""
              style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }}
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/zero.svg"
              alt=""
              style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }}
            />
          </Text>
          <Text><Anchor href={import.meta.env.VITE_PRIVACY_POLICY_URL} target="new">Privacy Policy<FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' /></Anchor></Text>
          <Image src="https://blog.macver.org/content/images/size/w1600/2025/06/Wordmark-Color-5.png" />
        </Stack>
      </Modal>

      {Telemetry()}

      <AppShell
        styles={{
          header: { backgroundColor: 'var(--mantine-color-grape-light)' },
          main: { display: 'flex' },
        }}
        padding="md"
        header={{ height: 50 }}
        className='shell'
      >
        <AppShell.Header h="auto" className='header'>
          <Group p="xm">
            <Group gap={'xs'} flex={1} className='header-info'>
              <Image src={icon} h={'50px'} w={'50px'} sizes='sm'></Image>
              <Stack gap="0">
                <Title order={2}>Flight Forge</Title>
                <Text size="sm">Version DEV-1 © 2025 Bog The MudWing</Text>
              </Stack>
            </Group>
            <Group className='header-button'>
              <Space h="md" />
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
                <ActionIcon onClick={doExport} variant="subtle" aria-label="Export">
                  <FontAwesomeIcon icon={faFileExport} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Download">
                <Anchor href={dataStr} download={collection.name.concat('.json')}>
                  <ActionIcon variant="subtle" aria-label="Download">
                    <FontAwesomeIcon icon={faDownload} />
                  </ActionIcon>
                </Anchor>
              </Tooltip>
              <Tooltip label="Home">
                <ActionIcon onClick={openWelcomeModal} variant="subtle" aria-label="Home">
                  <FontAwesomeIcon icon={faHome} />
                </ActionIcon>
              </Tooltip>
              <Menu shadow="md" width={200} transitionProps={{ transition: 'pop', duration: 200 }}>
                <Menu.Target>
                  <ActionIcon variant="subtle" aria-label="Menu">
                    <FontAwesomeIcon icon={faBars} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Editor</Menu.Label>
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
                  <Menu.Label>App</Menu.Label>
                  <Menu.Item
                    onClick={openSettingsModal}
                    leftSection={<FontAwesomeIcon icon={faGear} size="sm" />}
                  >
                    Settings
                  </Menu.Item>
                  <Anchor href='https://code.macver.org/Bog/Flight-Forge/issues/new' target='new'>
                    <Menu.Item
                      leftSection={<FontAwesomeIcon icon={faBug} size="sm" />}
                      rightSection={<FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' />}
                    >
                      Report bug
                    </Menu.Item>
                  </Anchor>
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

        <AppShell.Main className='main'>
          <SimpleGrid mt={'lg'} w="100%" cols={{ base: 1, md: 2 }} className={'layout-grid'}>
            <ImagePreview dragon={dragon} page={configuratorPage} />
            <Container className='configurator-container'>
              <Configurator
                dragon={dragon}
                setDragon={setDragonWithHistory}
                collection={collection}
                dataStr={dataStr}
                page={configuratorPage}
                setPage={setConfiguratorPage}
                doExport={doExport}
              />
            </Container>
          </SimpleGrid>
        </AppShell.Main>
      </AppShell>
    </>
  );
}