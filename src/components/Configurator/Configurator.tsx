import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAddressCard,
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faChartPie,
  faCode,
  faDice,
  faDownload,
  faFileExport,
  faFloppyDisk,
  faGlasses,
  faHeartPulse,
  faInfo,
  faLocationDot,
  faPalette,
  faPeopleGroup,
  fas,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as t from 'io-ts';
import { JSX } from 'react/jsx-runtime';
import {
  ActionIcon,
  Anchor,
  Button,
  Center,
  ColorInput,
  Fieldset,
  Flex,
  Group,
  Menu,
  MultiSelect,
  NumberInput,
  Rating,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Stepper,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import notImplemented, { myJoin } from '../AppUtils/AppUtils';
import { Collection } from '../Collection/Collection';
import { Dragon, Relation } from '../Dragon/Dragon';
import { recordTelemetry } from '../Telemetry/Telemetry';
import { useState } from 'react';
import './Configurator.css'
import { GetColorName } from 'hex-color-to-color-name';
import { names } from '../Random/Random';
import { notifications } from '@mantine/notifications';

// Style Info
import styleInfoDebug from '@/images/debug/info.json';
import styleInfoDeveloper from '@/images/developer/info.json';

library.add(fas);

type ConfiguratorProps = {
  dragon: t.TypeOf<typeof Dragon>;
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
            <TextInput label="Name" value={relation.name} />
            <Select label="Status" value={relation.status} data={relationStatus} />
            <Button color="red" variant="light" onClick={notImplemented}>
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

  const nextStep = () => setPage((current: number) => (current < 9 ? current + 1 : current));
  const prevStep = () => setPage((current: number) => (current > 0 ? current - 1 : current));

  const relationStatus = ['Good', 'Estranged', 'Deceased', 'Lost', 'Unknown'];
  const [newRelationSelectorValue, setNewRelationSelectorValue] = useState<string | null>('');

  const prevButton = () => {
    if (window.screen.width > 630) {
      return (
        <Button
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
          onClick={nextStep}
          leftSection={<FontAwesomeIcon icon={faArrowRight} />}
        >
          Next
        </Button>
      );
    }
    return (
      <Button onClick={nextStep}>
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    );
  }

  // const randomButton = () => {
  //   if (window.innerWidth > 630) {
  //     return (
  //       <Button
  //         onClick={notImplemented}
  //         leftSection={<FontAwesomeIcon icon={faDice} />}
  //       >
  //         Random
  //       </Button>
  //     );
  //   }
  //   return (
  //     <Button onClick={notImplemented}>
  //       <FontAwesomeIcon icon={faDice} />
  //     </Button>
  //   );
  // }

  /**
   * Back, Randomize, and Next buttons
   */
  const progressButtons = (
    <Group>
      {prevButton()}
      {/* {randomButton()} */}
      {nextButton()}
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

    // Build it!
    return (
      <Stack>
        <Title order={2}>{name}</Title>
        <Text>{ageString.concat(gender).concat(tribeString)}</Text>
        <Title order={3}>Appearance</Title>
        <Text>{name} is a {tribeString} with scales the color of {primaryColorName.toLowerCase()} and {secondaryColorName.toLowerCase()}. {name} has underscales are the color of {underscalesColorName.toLowerCase()} and eyes of {eyeColorName.toLowerCase()}.</Text>
        <Text></Text>
      </Stack>
    )
  }

  const availableTribes = () => {
    let info = null;
    if (dragon.style == 'debug') info = styleInfoDebug;
    else if (dragon.style == 'developer') info = styleInfoDeveloper;
    if (info == null) return [];

    return info.included_tribes;
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
                  setDragon((prev) => ({ ...prev, age: Number(newAge) }));
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
              <SimpleGrid cols={2}>
                <Select label="Head" data={dragon.tribe} />
                <Select label="Body" data={dragon.tribe} />
                <Select label="Wings" data={dragon.tribe} />
                <Select label="Legs" data={dragon.tribe} />
                <Select label="Tails" data={dragon.tribe} />
              </SimpleGrid>
            </Stack>
          </Stack>
        </Stepper.Step>

        {/* Step 2: Colors */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faPalette} />}
          completedIcon={<FontAwesomeIcon icon={faPalette} />}
        >
          <Stack>
            <Title order={2}>Colors</Title>
            <Text>Choose the colors for this dragon.</Text>
            <Title order={3}>Scales</Title>
            <SimpleGrid cols={2}>
              <ColorInput
                label="Primary"
                value={dragon.primaryColor}
                onChangeEnd={(newColor) => {
                  setDragon((prev) => ({ ...prev, primaryColor: newColor }));
                }}
                description="Primary scales color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={colorSwatches}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Secondary"
                value={dragon.secondaryColor}
                onChangeEnd={(newColor) => {
                  setDragon((prev) => ({ ...prev, secondaryColor: newColor }));
                }}
                description="Secondary scales color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={colorSwatches}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Underscales"
                value={dragon.underscalesColor}
                onChangeEnd={(newColor) => {
                  setDragon((prev) => ({ ...prev, underscalesColor: newColor }));
                }}
                description="Underscales color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={colorSwatches}
              // TODO: Dyanmically change swatches based on tribe
              />
            </SimpleGrid>
            <Title order={3}>Membrane</Title>
            <SimpleGrid cols={2}>
              <ColorInput
                label="Start Color"
                value={dragon.membraneColor1}
                onChangeEnd={(newColor) => {
                  setDragon((prev) => ({ ...prev, membraneColor1: newColor }));
                }}
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={colorSwatches}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="End Color"
                value={dragon.membraneColor2}
                onChangeEnd={(newColor) => {
                  setDragon((prev) => ({ ...prev, membraneColor2: newColor }));
                }}
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={colorSwatches}
              // TODO: Dyanmically change swatches based on tribe
              />
            </SimpleGrid>
            <Title order={3}>Other</Title>
            <SimpleGrid cols={2}>
              <ColorInput
                label="Eyes"
                value={dragon.eyeColor}
                onChangeEnd={(newColor) => {
                  setDragon((prev) => ({ ...prev, eyeColor: newColor }));
                }}
                description="Eye color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={colorSwatches}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Spikes"
                value={dragon.spikesColor}
                onChangeEnd={(newColor) => {
                  setDragon((prev) => ({ ...prev, spikesColor: newColor }));
                }}
                description="Spikes and talons"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={colorSwatches}
              // TODO: Dyanmically change swatches based on tribe
              />
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
              <Select
                id='newRelationSelector'
                flex={1}
                label="Add relation"
                placeholder="Pick value"
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
                  'Friend',
                  'Mentor',
                  'Ex-partner',
                  'Dragonet',
                ]}
                value={newRelationSelectorValue}
                onChange={setNewRelationSelectorValue}
                searchable
              />
              <Button onClick={addRelation}>Add</Button>
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
              <TextInput
                label="Hatching location"
                // This line below finds the location with identifier "Hatching location" and gets its value
                defaultValue={
                  dragon.locations.find((location) => location.identifier === 'Hatching location')
                    ?.name
                }
                onChange={(event) => { setLocation('Hatching location', event.currentTarget.value); }}
              // TODO: Display random placeholder
              />
              <TextInput
                label="Growing up location"
                defaultValue={
                  dragon.locations.find((location) => location.identifier === 'Growing up location')
                    ?.name
                }
                onChange={(event) => { setLocation('Growing up location', event.currentTarget.value); }}
              // TODO: Display random placeholder
              />
              <TextInput
                label="Home location"
                defaultValue={
                  dragon.locations.find((location) => location.identifier === 'Home location')?.name
                }
                onChange={(event) => { setLocation('Home location', event.currentTarget.value); }}
              // TODO: Display random placeholder
              />
              <TextInput
                label="Current location"
                defaultValue={
                  dragon.locations.find((location) => location.identifier === 'Current location')
                    ?.name
                }
                onChange={(event) => { setLocation('Current location', event.currentTarget.value); }}
              // TODO: Display random placeholder
              />
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

        {/* Step 6: Traits */}
        <Stepper.Step
          icon={<FontAwesomeIcon icon={faChartPie} />}
          completedIcon={<FontAwesomeIcon icon={faChartPie} />}
        >
          <Stack>
            <Title order={2}>Traits</Title>
            <Text>Tell me what this dragon is like.</Text>
            <Center>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Intelligence
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={
                      dragon.traits.find((trait) => trait.name === 'Intelligence')?.rating
                    }
                    onChange={(value) => setTrait('Intelligence', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Perception
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Perception')?.rating}
                    onChange={(value) => setTrait('Perception', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Charisma
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Charisma')?.rating}
                    onChange={(value) => setTrait('Charisma', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Stealth
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Stealth')?.rating}
                    onChange={(value) => setTrait('Stealth', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Speed
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Speed')?.rating}
                    onChange={(value) => setTrait('Speed', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Agility
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Agility')?.rating}
                    onChange={(value) => setTrait('Agility', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Strength
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Strength')?.rating}
                    onChange={(value) => setTrait('Strength', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Leadership
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Leadership')?.rating}
                    onChange={(value) => setTrait('Leadership', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Teamwork
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Teamwork')?.rating}
                    onChange={(value) => setTrait('Teamwork', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Independence
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={
                      dragon.traits.find((trait) => trait.name === 'Independence')?.rating
                    }
                    onChange={(value) => setTrait('Independence', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Organization
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={
                      dragon.traits.find((trait) => trait.name === 'Organization')?.rating
                    }
                    onChange={(value) => setTrait('Organization', value)}
                  />
                </Flex>
                <Flex gap="md" justify="flex-end" align="flex-end" direction="row" wrap="nowrap">
                  <Text size="sm" fw="bold">
                    Empathy
                  </Text>
                  <Rating
                    fractions={2}
                    defaultValue={dragon.traits.find((trait) => trait.name === 'Empathy')?.rating}
                    onChange={(value) => setTrait('Empathy', value)}
                  />
                </Flex>
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
                defaultValue={dragon.health}
                onChange={(value) => {
                  let newHealth: string = '';
                  if (value != null) newHealth = value;
                  setDragon((prev) => ({ ...prev, health: newHealth }));
                }}
              />
              <TextInput
                label="Occupation"
                defaultValue={dragon.occupation}
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
                defaultValue={dragon.creator}
                onChange={(event) => {
                  let newCreator: string = '';
                  if (event.currentTarget.value != null) newCreator = event.currentTarget.value;
                  setDragon((prev) => ({ ...prev, creator: newCreator }));
                }}
              />
              <TextInput
                label="Builder"
                description="The individual who built this in Flight Forge (YOU)"
                defaultValue={dragon.builder}
                onChange={(event) => {
                  let newBuilder: string = '';
                  if (event.currentTarget.value != null) newBuilder = event.currentTarget.value;
                  setDragon((prev) => ({ ...prev, builder: newBuilder }));
                }}
              />
            </SimpleGrid>
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
