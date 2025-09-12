import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAddressCard,
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faBackward,
  faChartPie,
  faCode,
  faDice,
  faDownload,
  faFileExport,
  faFloppyDisk,
  faForward,
  faGlasses,
  faHeartPulse,
  faInfo,
  faLocationDot,
  faPalette,
  faPeopleGroup,
  faPlus,
  fas,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as t from 'io-ts';
import { JSX } from 'react/jsx-runtime';
import {
  ActionIcon,
  Anchor,
  Autocomplete,
  Button,
  Center,
  Checkbox,
  ColorInput,
  ColorPicker,
  Container,
  Fieldset,
  Flex,
  Group,
  Menu,
  MultiSelect,
  NumberInput,
  Rating,
  Select,
  SimpleGrid,
  Stack,
  Stepper,
  Switch,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import notImplemented, { myJoin } from '../AppUtils/AppUtils';
import { Collection } from '../Collection/Collection';
import { Dragon, Relation } from '../Dragon/Dragon';
import { recordTelemetry } from '../Telemetry/Telemetry';
import { useEffect, useState } from 'react';
import './Configurator.css'
import { GetColorName } from 'hex-color-to-color-name';
import { locations, names } from '../Random/Random';
import { notifications } from '@mantine/notifications';

// Style Info
import styleInfoDebug from '@/images/debug/info.json';
import styleInfoDeveloper from '@/images/developer/info.json';
import { styleInfo } from '../StyleHandler';

library.add(fas);

type ConfiguratorProps = {
  dragon: t.TypeOf<typeof Dragon>;
  previewDragon: React.Dispatch<React.SetStateAction<t.TypeOf<typeof Dragon>>>;
  setDragon: React.Dispatch<React.SetStateAction<t.TypeOf<typeof Dragon>>>;
  collection: t.TypeOf<typeof Collection>;
  dataStr: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLastSave: Function;
  doExport: Function;
};

export default function Configurator({
  dragon,
  collection,
  dataStr,
  previewDragon,
  setDragon,
  page,
  setPage,
  setLastSave,
  doExport
}: ConfiguratorProps) {
  /**
   * Generate the elements for viewing and editing relations.
   * @returns elements for viewing and editing relations
   */
  function relations() {
    const elements: JSX.Element[] = [];

    dragon.relations.forEach((relation) => {
      elements.push(
        <Fieldset legend={relation.relation}>
          <Stack>
            <TextInput
              label="Name"
              value={relation.name}
              onChange={(event) => {
                let newRelations = dragon.relations;
                let newRelation = relation;
                newRelation.name = event.currentTarget.value;
                newRelations.splice(newRelations.indexOf(relation), 1, newRelation);
                setDragon((prev) => ({ ...prev, relations: newRelations }));
              }}
            />
            <Select
              label="Status"
              value={relation.status}
              data={relationStatus}
              onChange={(value) => {
                if (value == null) return;
                let newRelations = dragon.relations;
                let newRelation = relation;
                newRelation.status = value;
                newRelations.splice(newRelations.indexOf(relation), 1, newRelation);
                setDragon((prev) => ({ ...prev, relations: newRelations }));
              }}
            />
            <Button color="red" variant="light" onClick={() => {
              let newRelations = dragon.relations;
              newRelations.splice(newRelations.indexOf(relation), 1);
              setDragon((prev) => ({ ...prev, relations: newRelations }));
            }}>
              Delete
            </Button>
          </Stack>
        </Fieldset>
      );
    });

    return elements;
  }

  /**
   * Add a new relation to the active dragon.
   */
  function addRelation() {
    let newDragon: t.TypeOf<typeof Dragon> = dragon;
    let relations: t.TypeOf<typeof Relation>[] = dragon.relations;
    newDragon.relations = relations;
    let relation: string;
    if (newRelationSelectorValue == null) relation = 'Unknown';
    else relation = newRelationSelectorValue;
    newDragon.relations.push({ relation: relation, name: 'Unknown', status: 'Unknown' })
    setDragon(newDragon);
  }

  const dragonHasAccessory = (accessory: { image: string; }) => {
    dragon.accessories.forEach((dergAccessory) => {
      if (accessory.image == dergAccessory.file) {
        console.log("YEAH");
        return true;
      }
    })
    return false;
  }

  const accessories = () => {

    let info = styleInfo(dragon.style);
    if (info == null) return (<Text>It seems like you have an invalid style pack applied. Select one of the provided style packs.</Text>);

    const accessoryElements: JSX.Element[] = [];

    info.includedAccessories.forEach((availableAccessory) => {
      const isChecked = dragon.accessories.some(
        (dergAccessory) => availableAccessory.image === dergAccessory.file
      );
      const color = isChecked ? dragon.accessories.find(((dergAccessory) => availableAccessory.image === dergAccessory.file))?.color : '#ffffff';
      accessoryElements.push(
        <Group>
          <Switch
            checked={isChecked}
            onChange={(event) => {
              const checked = event.currentTarget.checked;

              setDragon((prev) => {
                const newAccessories = [...prev.accessories]; // create copy

                const existingIndex = newAccessories.findIndex(
                  (a) => a.file === availableAccessory.image
                );

                if (checked && existingIndex === -1) {
                  // Add accessory
                  newAccessories.push({
                    file: availableAccessory.image,
                    name: availableAccessory.name,
                    color: "#ffffff",
                  });
                } else if (!checked && existingIndex !== -1) {
                  // Remove accessory
                  newAccessories.splice(existingIndex, 1);
                }

                return { ...prev, accessories: newAccessories };
              });
            }}
            label={availableAccessory.name}
          />
          <ColorInput
            disabled={!isChecked}
            value={color}
            onChange={(value) => {
              setDragon((prev) => {
                const newAccessories = [...prev.accessories]; // create copy

                const existingIndex = newAccessories.findIndex(
                  (a) => a.file === availableAccessory.image
                );

                // Add accessory
                newAccessories.splice(
                  existingIndex,
                  1,
                  {
                    file: availableAccessory.image,
                    name: availableAccessory.name,
                    color: value,
                  }
                );

                return { ...prev, accessories: newAccessories };
              });
            }}
          />
        </Group>
      );
    });

    return <SimpleGrid cols={2}>{accessoryElements}</SimpleGrid>;
  }

  const nextStep = () => setPage((current: number) => (current < 9 ? current + 1 : current));
  const prevStep = () => setPage((current: number) => (current > 0 ? current - 1 : current));

  const relationStatus = ['Good', 'Estranged', 'Deceased', 'Lost', 'Unknown'];
  const [newRelationSelectorValue, setNewRelationSelectorValue] = useState<string>('');
  const [sameBuilderCreator, setSameBuilderCreator] = useState(dragon.creator == dragon.builder);

  useEffect(() => {
    setSameBuilderCreator(dragon.creator == dragon.builder);
  }, [dragon])

  const prevButton = () => {
    if (window.screen.width > 630) {
      return (
        <Button
          variant='light'
          onClick={prevStep}
          leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
          disabled={page === 0}
        >
          Previous
        </Button>
      );
    }
    return (
      <Button
        variant='light'
        onClick={prevStep}
        disabled={page === 0}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    );
  }

  const nextButton = () => {
    if (window.screen.width > 630) {
      return (
        <Button
          variant='light'
          onClick={nextStep}
          rightSection={<FontAwesomeIcon icon={faArrowRight} />}
        >
          Next
        </Button>
      );
    }
    return (
      <Button variant='light' onClick={nextStep}>
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    );
  }

  const startButton = () => {
    return (
      <ActionIcon
        variant='subtle'
        onClick={() => setPage(0)}
        disabled={page === 0}
        aria-label='Go to start'
      >
        <FontAwesomeIcon icon={faBackward} />
      </ActionIcon>
    )
  }

  const endButton = () => {
    return (
      <ActionIcon
        variant='subtle'
        onClick={() => setPage(9)}
        disabled={page === 9}
        aria-label='Go to end'
      >
        <FontAwesomeIcon icon={faForward} />
      </ActionIcon>
    )
  }

  /**
   * Back, Randomize, and Next buttons
   */
  const progressButtons = (
    <Group>
      {startButton()}
      {prevButton()}
      {/* {randomButton()} */}
      {nextButton()}
      {endButton()}
    </Group>
  );

  const colorSwatches = [
    '#2e2e2e',
    '#868e96',
    '#fa5252',
    '#e64980',
    '#be4bdb',
    '#7950f2',
    '#4c6ef5',
    '#228be6',
    '#15aabf',
    '#12b886',
    '#40c057',
    '#82c91e',
    '#fab005',
    '#fd7e14',
  ]

  /**
   * The Save button which allows Download or Export at the end of the configurator.
   */
  const finishedButtons = (
    <Group>
      {startButton()}
      {prevButton()}
      <Menu shadow="md" width={200} transitionProps={{ transition: 'pop', duration: 200 }}>
        <Menu.Target>
          <Button leftSection={<FontAwesomeIcon icon={faFloppyDisk} />}>Save</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Anchor href={dataStr} download={collection.name.concat('.json')} onClick={() => setLastSave(new Date())}>
            <Menu.Item leftSection={<FontAwesomeIcon icon={faDownload} size="sm" />}>
              Download
            </Menu.Item>
          </Anchor>
          <Menu.Item
            onClick={() => doExport()}
            leftSection={<FontAwesomeIcon icon={faFileExport} size="sm" />}
          >
            Export
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {endButton()}
    </Group>
  );

  /**
   * Get the action buttons to show at the bottom
   * @returns the correct action buttons at the bottom of the configurator
   */
  function actionButtons() {
    if (page === 9) {
      return finishedButtons;
    }
    return progressButtons;
  }

  function ageFeild(): string | number | undefined {
    if (dragon.age > -1) return dragon.age;
    else undefined;
  }

  /**
   * Create or overwrite a location for the active dragon.
   * @param identifier the identifier of the location (i.e. "Hatching location")
   * @param value the value of the location (i.e. "Catamont's Claw")
   */
  function setLocation(identifier: string, value: string) {
    const locations = dragon.locations;
    const sameLocation = locations.find((oldLocation) => oldLocation.identifier === identifier);
    if (sameLocation == null) locations.push({ identifier: identifier, name: value });
    else {
      const index = locations.indexOf(sameLocation);
      locations.splice(index, 1, { identifier: identifier, name: value });
    }
    setDragon((prev) => ({ ...prev, locations: locations }));
  }

  const addLocation = () => {
    setLocation('', '');
  }

  const customLocations = () => {
    const knownLocations = [
      'Hatching location',
      'Growing up location',
      'Home location',
      'Current location'
    ]
    const elements: JSX.Element[] = [];
    for (let i = 0; i < dragon.locations.length; i++) {
      const location = dragon.locations[i];
      if (knownLocations.includes(location.identifier)) continue;
      elements.push(
        <Group align='flex-end'>
          <Group grow flex={1}>
            <TextInput
              label='Type'
              value={location.identifier}
              onChange={(event) => {
                const index = dragon.locations.indexOf(location);
                let newLocation = location;
                newLocation.identifier = event.currentTarget.value;
                const newLocationList = dragon.locations;
                newLocationList.splice(index, 1, newLocation)
                setLocation(event.currentTarget.value, location.name)
              }}
              placeholder='Write anything here'
            />
            <Autocomplete
              label="Name"
              placeholder="Write anything here"
              value={location.name}
              data={locations}
              onChange={(value) => { setLocation(location.identifier, value); }}
              rightSection={
                <ActionIcon
                  aria-label="Randomize"
                  variant='subtle'
                  color="gray"
                  onClick={() => {
                    const index = Math.floor(Math.random() * locations.length);
                    setLocation(location.identifier, locations[index]);
                  }}
                >
                  <FontAwesomeIcon icon={faDice} />
                </ActionIcon>
              }
            />
          </Group>
          <Group>
            <ActionIcon variant='outline' size={'lg'} onClick={(event) => {
              const newLocations = dragon.locations;
              const i = newLocations.indexOf(location);
              if (i == -1) {
                notifications.show({
                  color: 'red',
                  withBorder: true,
                  title: 'Could not delete the location.',
                  message: 'That location does not exist.',
                });
                return;
              }
              newLocations.splice(i, 1);
              setDragon((prev) => ({ ...prev, locations: newLocations }));
            }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </ActionIcon>
          </Group>
        </Group>
      )
    }
    return elements;
  }

  /**
 * Create or overwrite a trait for the active dragon.
 * @param name the name of the trait (i.e. "Intelligence")
 * @param rating the rating from 0 to 5 (i.e. 3.5)
 */
  function setTrait(name: string, rating: number) {
    const traits = dragon.traits;
    const sameTrait = traits.find((oldTrait) => oldTrait.name === name);
    if (sameTrait == null) traits.push({ name: name, rating: rating });
    else {
      const index = traits.indexOf(sameTrait);
      traits.splice(index, 1, { name: name, rating: rating });
    }
    setDragon((prev) => ({ ...prev, traits: traits }));
  }

  const summary = () => {
    const elements: JSX.Element[] = [];

    // Name
    let name: string = dragon.name;
    if (name === undefined || name === null || name === '') {
      name = 'Unnamed';
    }

    // Age
    const age: number | undefined = dragon.age;
    let ageString: string;
    if (age === undefined || age === null || age < 0) {
      ageString = '';
    } else {
      ageString = age.toString().concat('-year-old ');
    }

    // Gender
    let gender: string = dragon.gender;
    if (name === undefined || name === null || name === '') {
      gender = '';
    } else {
      gender = gender.concat(' ');
    }

    // Tribes
    const tribes: string[] = dragon.tribe;
    let tribeString: string;
    if (tribes === undefined || tribes === null || tribes.length === 0) {
      tribeString = 'Dragon';
    } else {
      tribeString = myJoin(tribes, '/').concat('Wing');
    }

    const primaryColorName: string = GetColorName(dragon.primaryColor);
    const secondaryColorName: string = GetColorName(dragon.secondaryColor);
    const underscalesColorName: string = GetColorName(dragon.underscalesColor);
    const eyeColorName: string = GetColorName(dragon.eyeColor);

    const relations = () => {
      const elements: JSX.Element[] = [];
      if (dragon.relations.length == 0) return elements;
      elements.push(<Title order={3}>Relations</Title>)
      const relationElements: JSX.Element[] = [];
      for (let i = 0; i < dragon.relations.length; i++) {
        const relation = dragon.relations[i];
        let beTense = 'is';
        let haveTense = 'has';
        if (relation.status == 'Deceased') {
          beTense = 'was';
          haveTense = 'had';
        }

        let statusString = '';
        if (relation.status == 'Estranged') statusString = `${relation.name} is currently estranged from ${dragon.name}.`
        else if (relation.status == 'Lost') statusString = `${relation.name} is considered lost.`

        if (relation.name == 'Unknown')
          relationElements.push(
            <li>{relation.name} {haveTense} a {relation.relation.toLowerCase()} whose name is not known.</li>
          );
        else relationElements.push(
          <li>{relation.name} {beTense} {dragon.name}'s {relation.relation.toLowerCase()}. {statusString}</li>
        );
      }
      elements.push(<ul style={{ margin: 0 }}>{relationElements}</ul>);
      return elements;
    }

    const locations = () => {
      const elements: JSX.Element[] = [];
      if (dragon.locations.length == 0) return elements;
      elements.push(<Title order={3}>Locations</Title>)

      const hatchingLocation = dragon.locations.find((location) => (location.identifier == 'Hatching location'));
      const growingUpLocation = dragon.locations.find((location) => (location.identifier == 'Growing up location'));
      const homeLocation = dragon.locations.find((location) => (location.identifier == 'Home location'));
      const currentLocation = dragon.locations.find((location) => (location.identifier == 'Current location'));

      let locationString = '';
      let nextStart = dragon.name;

      if (hatchingLocation != undefined && hatchingLocation.name != '' && growingUpLocation != undefined && growingUpLocation.name != '') {

        nextStart = `. ${dragon.name}`;
        if (hatchingLocation.name == growingUpLocation.name)
          locationString = locationString.concat(`${dragon.name} hatched and grew up at ${hatchingLocation.name}`);
        else locationString = locationString.concat(`${dragon.name} hatched at ${hatchingLocation.name}, but grew up at ${growingUpLocation.name}`);

      } else {

        if (hatchingLocation != undefined && hatchingLocation.name != '') {
          nextStart = ' and';
          locationString = locationString.concat(`${dragon.name} hatched at ${hatchingLocation.name}`);
        }
        else if (growingUpLocation != undefined && growingUpLocation.name != '') {
          nextStart = ' and';
          locationString = locationString.concat(`${dragon.name} grew up at ${growingUpLocation.name}`);
        }
      }

      if (homeLocation != undefined && homeLocation.name != '' && currentLocation != undefined && currentLocation.name != '') {

        if (homeLocation.name == currentLocation.name)
          locationString = locationString.concat(`${nextStart} currently resides at ${homeLocation.name}`);
        else locationString = locationString.concat(`${nextStart} lives at ${homeLocation.name}, but currently ${dragon.name} is at ${currentLocation.name}`);

      } else {

        if (homeLocation != undefined && homeLocation.name != '')
          locationString = locationString.concat(`${nextStart} lives at ${homeLocation.name}`);
        else if (currentLocation != undefined && currentLocation.name != '')
          locationString = locationString.concat(`${nextStart} is currently at ${currentLocation.name}`);
      }

      if (locationString == '') return;
      locationString = locationString.concat('.')

      elements.push(<Text>{locationString}</Text>);
      return elements;
    }

    const traits = () => {
      const elements: JSX.Element[] = [];
      if (dragon.traits.length == 0) return elements;
      elements.push(<Title order={3}>Traits</Title>)

      let string = `${dragon.name} has`;

      for (let i = 0; i < dragon.traits.length; i++) {
        const trait = dragon.traits[i];
        if (trait == undefined || trait.rating == 0) continue;

        let quality = 'impossible';
        if (trait.rating <= 0.5) quality = 'awful';
        else if (trait.rating <= 1) quality = 'poor';
        else if (trait.rating <= 2) quality = 'below-average';
        else if (trait.rating <= 3) quality = 'average';
        else if (trait.rating <= 4) quality = 'above-average';
        else if (trait.rating <= 4.5) quality = 'exceptional';
        else if (trait.rating <= 5) quality = 'extraordinary';

        if (dragon.traits.length > 1 && i == dragon.traits.length - 1) string = string.concat(' and');

        string = string.concat(` ${quality} ${trait.name.toLowerCase()},`)
      }

      if (string == `${dragon.name} has`) return;
      string = string.substring(0, string.length - 1).concat('.')

      elements.push(<Text>{string}</Text>);
      return elements;
    }

    // Build it!
    return (
      <Stack>
        <Title order={2}>{name}</Title>
        <Text>{ageString.concat(gender).concat(tribeString)}</Text>
        <Title order={3}>Appearance</Title>
        <Text>{name} is a {tribeString} with scales the color of {primaryColorName.toLowerCase()} and {secondaryColorName.toLowerCase()}. {name} has underscales are the color of {underscalesColorName.toLowerCase()} and eyes of {eyeColorName.toLowerCase()}.</Text>
        {relations()}
        {locations()}
        {traits()}
      </Stack>
    )
  }

  const availableTribes = () => {
    let info = null;
    if (dragon.style == 'debug') info = styleInfoDebug;
    else if (dragon.style == 'developer') info = styleInfoDeveloper;
    if (info == null) return [];

    return info.includedTribes;
  }

  const trait = (name: string) => {
    return (
      <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
        <Text size="sm" fw="bold">
          {name}
        </Text>
        <Rating
          fractions={2}
          value={
            dragon.traits.find((trait) => trait.name === name)?.rating
          }
          onChange={(value) => setTrait(name, value)}
        />
        <ActionIcon
          aria-label='Clear'
          size={'xs'}
          variant='transparent'
          onClick={() => setTrait(name, 0)}
          disabled={dragon.traits.find((trait) => trait.name === name)?.rating == 0}>
          <FontAwesomeIcon icon={faXmark} />
        </ActionIcon>
      </Flex>
    )
  }

  return (
    <Flex gap="md" direction="column" h="100%" className='configurator'>
      <Stepper
        flex={1}
        active={page}
        onStepClick={setPage}
        styles={{
          separator: {
            marginLeft: 2,
            marginRight: 2,
            height: 0,
          },
          step: {
            scale: 1,
            margin: 0
          }
        }}
        classNames={{
          content: 'content',
          steps: 'step-button-layout',
        }}
      >
        {/* Step 1: Basic Information */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faInfo} />}
          completedIcon={<FontAwesomeIcon icon={faInfo} />}
        >
          <Stack>
            <Title order={2}>Basic Information</Title>
            <Text>What kind of dragon are you creating?</Text>
            <MultiSelect
              label="Tribe"
              description="The tribe(s) of the character"
              placeholder="Select any"
              data={availableTribes()}
              clearable
              searchable
              nothingFoundMessage="Nothing found..."
              value={dragon.tribe}
              comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
              onChange={(newTribes) => {
                recordTelemetry("tribeSelect", newTribes[newTribes.length - 1]);
                recordTelemetry("tribeCount", newTribes.length);
                setDragon((prev) => ({ ...prev, tribe: newTribes }));
              }}
            />
            <Group grow>
              <NumberInput
                label="Age"
                description="The age of the character"
                placeholder="Mature at age 6"
                value={ageFeild()}
                onChange={(newAge) => {
                  recordTelemetry("age", newAge);
                  if (newAge == '') setDragon((prev) => ({ ...prev, age: -1 }));
                  else setDragon((prev) => ({ ...prev, age: Number(newAge) }));
                }}
              />
              <TextInput
                label="Gender"
                description="The gender of the character"
                value={dragon.gender}
                onChange={(event) => {
                  recordTelemetry("age", event.currentTarget.value);
                  setDragon((prev) => ({ ...prev, gender: event.currentTarget.value }));
                }}
              />
            </Group>
            <Stack style={dragon.tribe.length > 1 ? { display: 'block' } : { display: 'none' }}>
              <Text>Choose which body parts to use.</Text>
              <SimpleGrid cols={3}>
                <Select
                  label="Head"
                  data={dragon.tribe}
                  value={dragon.bodyParts.head}
                  onChange={(value) => {
                    let newBodyParts = dragon.bodyParts;
                    if (value == null) return;
                    newBodyParts.head = value;
                    setDragon((prev) => ({ ...prev, newBodyParts }));
                  }}
                />
                <Select
                  label="Body"
                  data={dragon.tribe}
                  value={dragon.bodyParts.body}
                  onChange={(value) => {
                    let newBodyParts = dragon.bodyParts;
                    if (value == null) return;
                    newBodyParts.body = value;
                    setDragon((prev) => ({ ...prev, newBodyParts }));
                  }}
                />
                <Select
                  label="Wings"
                  data={dragon.tribe}
                  value={dragon.bodyParts.wings}
                  onChange={(value) => {
                    let newBodyParts = dragon.bodyParts;
                    if (value == null) return;
                    newBodyParts.wings = value;
                    setDragon((prev) => ({ ...prev, newBodyParts }));
                  }}
                />
                <Select
                  label="Legs"
                  data={dragon.tribe}
                  value={dragon.bodyParts.legs}
                  onChange={(value) => {
                    let newBodyParts = dragon.bodyParts;
                    if (value == null) return;
                    newBodyParts.legs = value;
                    setDragon((prev) => ({ ...prev, newBodyParts }));
                  }}
                />
                <Select
                  label="Tail"
                  data={dragon.tribe}
                  value={dragon.bodyParts.tail}
                  onChange={(value) => {
                    let newBodyParts = dragon.bodyParts;
                    if (value == null) return;
                    newBodyParts.tail = value;
                    setDragon((prev) => ({ ...prev, newBodyParts }));
                  }}
                />
              </SimpleGrid>
            </Stack>
          </Stack>
        </Stepper.Step>

        {/* Step 2: Colors */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faPalette} />}
          completedIcon={<FontAwesomeIcon icon={faPalette} />}
        >
          <Stack style={{overflowX: 'hidden'}}>
            <Title order={2}>Colors</Title>
            <Text>Choose the colors for this dragon.</Text>
            <Title order={3}>Scales</Title>
            <SimpleGrid cols={2}>
              <Stack>
                <ColorInput
                  label="Primary"
                  withPicker={false}
                  value={dragon.primaryColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, primaryColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, primaryColor: newColor }));
                  }}
                  description="Primary scales color"
                />
                <ColorPicker
                  fullWidth
                  swatches={colorSwatches}
                  value={dragon.primaryColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, primaryColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, primaryColor: newColor }));
                  }}
                />
              </Stack>
              <Stack>
                <ColorInput
                  label="Secondary"
                  withPicker={false}
                  value={dragon.secondaryColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, secondaryColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, secondaryColor: newColor }));
                  }}
                  description="Secondary scales color"
                />
                <ColorPicker
                  fullWidth
                  swatches={colorSwatches}
                  value={dragon.secondaryColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, secondaryColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, secondaryColor: newColor }));
                  }}
                />
              </Stack>
              <Stack>
                <ColorInput
                  label="Underscales"
                  withPicker={false}
                  value={dragon.underscalesColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, underscalesColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, underscalesColor: newColor }));
                  }}
                  description="Underscales color"
                />
                <ColorPicker
                  fullWidth
                  swatches={colorSwatches}
                  value={dragon.secondaryColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, underscalesColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, underscalesColor: newColor }));
                  }}
                />
              </Stack>
            </SimpleGrid>
            <Title order={3}>Membrane</Title>
            <SimpleGrid cols={2}>
              <Stack>
                <ColorInput
                  label="Start"
                  withPicker={false}
                  value={dragon.membraneColor1}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, membraneColor1: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, membraneColor1: newColor }));
                  }}
                  description="The top of the gradient"
                />
                <ColorPicker
                  fullWidth
                  format="hexa"
                  swatches={colorSwatches}
                  value={dragon.membraneColor1}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, membraneColor1: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, membraneColor1: newColor }));
                  }}
                />
              </Stack>
              <Stack>
                <ColorInput
                  label="End"
                  withPicker={false}
                  value={dragon.membraneColor2}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, membraneColor2: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, membraneColor2: newColor }));
                  }}
                  description="The bottom of the gradient"
                />
                <ColorPicker
                  fullWidth
                  format="hexa"
                  swatches={colorSwatches}
                  value={dragon.membraneColor2}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, membraneColor2: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, membraneColor2: newColor }));
                  }}
                />
              </Stack>
            </SimpleGrid>
            <Title order={3}>Other</Title>
            <SimpleGrid cols={2}>
              <Stack>
                <ColorInput
                  label="Eyes"
                  withPicker={false}
                  value={dragon.eyeColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, eyeColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, eyeColor: newColor }));
                  }}
                  description="Eye color"
                />
                <ColorPicker
                  fullWidth
                  swatches={colorSwatches}
                  value={dragon.eyeColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, eyeColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, eyeColor: newColor }));
                  }}
                />
              </Stack>
              <Stack>
                <ColorInput
                  label="Spikes"
                  withPicker={false}
                  value={dragon.spikesColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, spikesColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, spikesColor: newColor }));
                  }}
                  description="Spikes and talons"
                />

                <ColorPicker
                  fullWidth
                  swatches={colorSwatches}
                  value={dragon.spikesColor}
                  onChange={(newColor) => {
                    previewDragon((prev) => ({ ...prev, spikesColor: newColor }));
                  }}
                  onChangeEnd={(newColor) => {
                    setDragon((prev) => ({ ...prev, spikesColor: newColor }));
                  }}
                />
              </Stack>
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

        {/* Step 3: Identification */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faAddressCard} />}
          completedIcon={<FontAwesomeIcon icon={faAddressCard} />}
        >
          <Stack>
            <Title order={2}>Identification</Title>
            <Text>What do we call this dragon?</Text>
            <SimpleGrid cols={2}>
              <TextInput
                label="Name"
                value={dragon.name}
                onChange={(event) => {
                  setDragon((prev) => ({ ...prev, name: event.target.value }));
                }}
                rightSection={
                  <ActionIcon aria-label="Randomize" variant='subtle' color="gray" onClick={() => {
                    if (dragon.tribe.length != 0) {
                      let possibleNames: string[] = [];
                      for (let i = 0; i < dragon.tribe.length; i++) {
                        const dragonTribe: string = dragon.tribe[i].toLowerCase();
                        for (let j = 0; j < names.length; j++) {
                          const element = names[j];
                          if (element.tribe != dragonTribe) continue;
                          possibleNames = possibleNames.concat(element.names);
                        }
                      }
                      const index = Math.floor(Math.random() * possibleNames.length);
                      setDragon((prev) => ({ ...prev, name: possibleNames[index] }));
                    } else {
                      notifications.show({
                        color: 'red',
                        withBorder: true,
                        title: 'Could not choose a random name.',
                        message: 'You need to select a tribe first.',
                      });
                    }
                  }}>
                    <FontAwesomeIcon icon={faDice} />
                  </ActionIcon>
                }
              />
              <TextInput
                label="Pronouns"
                value={dragon.pronouns}
                onChange={(event) => {
                  setDragon((prev) => ({ ...prev, pronouns: event.target.value }));
                }}
              />
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

        {/* Step 4: Relations */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faPeopleGroup} />}
          completedIcon={<FontAwesomeIcon icon={faPeopleGroup} />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Relations</Title>
              <Text>Dragons are social creatures!</Text>
            </Stack>
            <Flex gap="md" justify="flex-start" align="flex-end" direction="row" wrap="nowrap">
              <Autocomplete
                id='newRelationSelector'
                flex={1}
                label="Add relation"
                placeholder="Write anything here"
                data={[
                  'Mother',
                  'Father',
                  'Guardian',
                  'Grandmother',
                  'Grandfather',
                  'Adoptive Mother',
                  'Adoptive Father',
                  'Biological Mother',
                  'Biological Father',
                  'Stepmother',
                  'Stepfather',
                  'Sibling',
                  'Sister',
                  'Brother',
                  'Cousin',
                  'Aunt',
                  'Uncle',
                  'Friend',
                  'Mentor',
                  'Employer',
                  'Crush',
                  'Partner',
                  'Ex-partner',
                  'Dragonet',
                  'Pet',
                ]}
                value={newRelationSelectorValue}
                onChange={setNewRelationSelectorValue}
              />
              <Button leftSection={<FontAwesomeIcon icon={faPlus} />} onClick={addRelation}>Add</Button>
            </Flex>

            <SimpleGrid cols={2}>{relations()}</SimpleGrid>
          </Stack>
        </Stepper.Step>

        {/* Step 5: Locations */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faLocationDot} />}
          completedIcon={<FontAwesomeIcon icon={faLocationDot} />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Locations</Title>
              <Text>Check the <Anchor href='https://wingsoffire.fandom.com/wiki/Map:Pyrrhia' target='new'>Pyrrhia map<FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' /></Anchor> or <Anchor href='https://wingsoffire.fandom.com/wiki/Map:Pantala' target='new'>Pantala map<FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' /></Anchor> for help.</Text>
            </Stack>
            <SimpleGrid cols={2}>
              <Autocomplete
                label="Hatching location"
                placeholder="Write anything here"
                // This line below finds the location with identifier "Hatching location" and gets its value
                value={
                  dragon.locations.find((location) => location.identifier === 'Hatching location')
                    ?.name
                }
                data={locations}
                onChange={(value) => { setLocation('Hatching location', value); }}
                rightSection={
                  <ActionIcon
                    aria-label="Randomize"
                    variant='subtle'
                    color="gray"
                    onClick={() => {
                      const index = Math.floor(Math.random() * locations.length);
                      setLocation('Hatching location', locations[index]);
                    }}
                  >
                    <FontAwesomeIcon icon={faDice} />
                  </ActionIcon>
                }
              />
              <Autocomplete
                label="Growing up location"
                placeholder="Write anything here"
                value={
                  dragon.locations.find((location) => location.identifier === 'Growing up location')
                    ?.name
                }
                data={locations}
                onChange={(value) => { setLocation('Growing up location', value); }}
                rightSection={
                  <ActionIcon
                    aria-label="Randomize"
                    variant='subtle'
                    color="gray"
                    onClick={() => {
                      const index = Math.floor(Math.random() * locations.length);
                      setLocation('Growing up location', locations[index]);
                    }}
                  >
                    <FontAwesomeIcon icon={faDice} />
                  </ActionIcon>
                }
              />
              <Autocomplete
                label="Home location"
                placeholder="Write anything here"
                value={
                  dragon.locations.find((location) => location.identifier === 'Home location')?.name
                }
                data={locations}
                onChange={(value) => { setLocation('Home location', value); }}
                rightSection={
                  <ActionIcon
                    aria-label="Randomize"
                    variant='subtle'
                    color="gray"
                    onClick={() => {
                      const index = Math.floor(Math.random() * locations.length);
                      setLocation('Home location', locations[index]);
                    }}
                  >
                    <FontAwesomeIcon icon={faDice} />
                  </ActionIcon>
                }
              />
              <Autocomplete
                label="Current location"
                placeholder="Write anything here"
                value={
                  dragon.locations.find((location) => location.identifier === 'Current location')
                    ?.name
                }
                data={locations}
                onChange={(value) => { setLocation('Current location', value); }}
                rightSection={
                  <ActionIcon
                    aria-label="Randomize"
                    variant='subtle'
                    color="gray"
                    onClick={() => {
                      const index = Math.floor(Math.random() * locations.length);
                      setLocation('Current location', locations[index]);
                    }}
                  >
                    <FontAwesomeIcon icon={faDice} />
                  </ActionIcon>
                }
              />
            </SimpleGrid>
            <hr style={{ width: '100%' }} />
            {customLocations()}
            <Center>
              <Tooltip
                label='You need to set type for the empty location before adding more.'
                disabled={dragon.locations.at(-1)?.identifier != ''}
              >
                <Button
                  disabled={dragon.locations.at(-1)?.identifier == ''}
                  onClick={() => addLocation()}
                  leftSection={<FontAwesomeIcon icon={faPlus} />}
                >
                  Add
                </Button>
              </Tooltip>
            </Center>
          </Stack>
        </Stepper.Step>

        {/* Step 6: Traits */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faChartPie} />}
          completedIcon={<FontAwesomeIcon icon={faChartPie} />}
        >
          <Stack>
            <Title order={2}>Traits</Title>
            <Text>How does this dragon behave?</Text>
            <Center>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                {trait('Intelligence')}
                {trait('Perception')}
                {trait('Charisma')}
                {trait('Stealth')}
                {trait('Speed')}
                {trait('Agility')}
                {trait('Strength')}
                {trait('Leadership')}
                {trait('Teamwork')}
                {trait('Independence')}
                {trait('Organization')}
                {trait('Empathy')}
              </SimpleGrid>
            </Center>
          </Stack>
        </Stepper.Step>

        {/* Step 7: Life */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faHeartPulse} />}
          completedIcon={<FontAwesomeIcon icon={faHeartPulse} />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Life</Title>
              <Text>The state of this dragon now.</Text>
            </Stack>
            <SimpleGrid cols={2}>
              <Select
                label="Health"
                placeholder="Pick value"
                data={['Well', 'Injured', 'Deteriorating', 'Ill', 'Dying']}
                searchable
                value={dragon.health}
                onChange={(value) => {
                  let newHealth: string = '';
                  if (value != null) newHealth = value;
                  setDragon((prev) => ({ ...prev, health: newHealth }));
                }}
              />
              <TextInput
                label="Occupation"
                value={dragon.occupation}
                onChange={(event) => {
                  let newOccupation: string = '';
                  if (event.currentTarget.value != null) newOccupation = event.currentTarget.value;
                  setDragon((prev) => ({ ...prev, occupation: newOccupation }));
                }}
              // TODO: Display random placeholder
              />
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

        {/* Step 8: Appearance */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faGlasses} />}
          completedIcon={<FontAwesomeIcon icon={faGlasses} />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Appearance</Title>
              <Text>Customize! Accessorize! Decorate!</Text>
            </Stack>
            <Title order={3}>Accessories</Title>
            {accessories()}
            <SimpleGrid cols={2}>
              {/* TODO: Generate accessory toggles (with preview?) based on pack info.json. */}
              {/* <Switch label="Left arm" defaultChecked={dragon.injuries.leftArm} />
              <Switch label="Right arm" defaultChecked={dragon.injuries.rightArm} />
              <Switch label="Left leg" defaultChecked={dragon.injuries.leftLeg} />
              <Switch label="Right leg" defaultChecked={dragon.injuries.rightLeg} />
              <Switch label="Left wing" defaultChecked={dragon.injuries.leftWing} />
              <Switch label="Right wing" defaultChecked={dragon.injuries.rightWing} />
              <Switch label="Left eye" defaultChecked={dragon.injuries.leftEye} />
              <Switch label="Right eye" defaultChecked={dragon.injuries.rightEye} />
              <Switch label="Left horn" defaultChecked={dragon.injuries.leftHorn} />
              <Switch label="Right horn" defaultChecked={dragon.injuries.rightHorn} />
              <Switch label="Left ear" defaultChecked={dragon.injuries.leftEar} />
              <Switch label="Right ear" defaultChecked={dragon.injuries.rightEar} />
              <Switch label="Tail" defaultChecked={dragon.injuries.tail} /> */}
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

        {/* Step 9: Metadata */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faCode} />}
          completedIcon={<FontAwesomeIcon icon={faCode} />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Metadata</Title>
              <Text>Credit where credit is due.</Text>
            </Stack>
            <SimpleGrid cols={2}>
              <TextInput
                label="Creator"
                description="The original creator of this character"
                value={dragon.creator}
                onChange={(event) => {
                  let newCreator: string = '';
                  if (event.currentTarget.value != null) newCreator = event.currentTarget.value;
                  if (sameBuilderCreator) {
                    setDragon((prev) => ({ ...prev, builder: newCreator, creator: newCreator }));
                  } else {
                    setDragon((prev) => ({ ...prev, creator: newCreator }));
                  }
                }}
              />
              <TextInput
                label="Builder"
                description="The individual who built this in Flight Forge (YOU)"
                disabled={sameBuilderCreator}
                value={dragon.builder}
                onChange={(event) => {
                  let newBuilder: string = '';
                  if (event.currentTarget.value != null) newBuilder = event.currentTarget.value;
                  setDragon((prev) => ({ ...prev, builder: newBuilder }));
                }}
              />
            </SimpleGrid>
            <Checkbox
              checked={sameBuilderCreator}
              onChange={(event) => {
                const checked = event.currentTarget.checked;
                setSameBuilderCreator(checked);
                if (checked) setDragon((prev) => ({ ...prev, builder: dragon.creator }));
              }}
              label="Creator and builder are the same"
              description="If you both created and built this character, use the same name for both"
            />
          </Stack>
        </Stepper.Step>

        <Stepper.Completed>
          {summary()}
        </Stepper.Completed>
      </Stepper>
      <Group justify="center">{actionButtons()}</Group>
    </Flex>
  );
}
