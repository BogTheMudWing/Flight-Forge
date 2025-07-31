
import notImplemented from '../AppUtils/AppUtils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressCard, faArrowLeft, faArrowRight, faChartPie, faCode, faDice, faFloppyDisk, faGlasses, faHeartPulse, faInfo, faLocationDot, faPalette, faPeopleGroup, fas } from '@fortawesome/free-solid-svg-icons'

import Dragon from '../Dragon/Dragon';

library.add(fas)

import { Stepper, Stack, Title, Text, Group, Button, MultiSelect, NumberInput, TextInput, ColorInput, Switch, Select, Slider, Flex, SimpleGrid, Rating, Fieldset } from '@mantine/core'
import { JSX } from 'react/jsx-runtime';

type ConfiguratorProps = {
  dragon: Dragon;
  setDragon: React.Dispatch<React.SetStateAction<Dragon>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Configurator({dragon, setDragon, page, setPage}: ConfiguratorProps) {

  function relations() {

    const elements: JSX.Element[] = [];

    

    dragon.relations.forEach((relation) => {
      elements.push(
        <Fieldset legend={relation.relation}>
          <Stack>
            <TextInput
              label="Name"
              value={relation.name}
            />
            <Select
              label="Status"
              value={relation.status}
              data={relationStatus}
            />
            <Button
              color='red'
              variant='light'
              onClick={notImplemented}
            >
              Delete
            </Button>
          </Stack>
        </Fieldset>
      );
    });

    return elements;
  }

  const nextStep = () => setPage((current: number) => (current < 9 ? current + 1 : current));
  const prevStep = () => setPage((current: number) => (current > 0 ? current - 1 : current));

  const relationStatus = ['Good', 'Estranged', 'Deceased', 'Lost', 'Unknown'];

  const progressButtons = (
    <Group>
      <Button onClick={prevStep} leftSection={<FontAwesomeIcon icon={faArrowLeft} />} disabled={page === 0}>Back</Button>
      <Button onClick={notImplemented} leftSection={<FontAwesomeIcon icon={faDice} />}>Randomize</Button>
      <Button onClick={nextStep} rightSection={<FontAwesomeIcon icon={faArrowRight} />}>Next</Button>
    </Group>
  )

  const finishedButtons = (
    <Group>
      <Button onClick={notImplemented} leftSection={<FontAwesomeIcon icon={faFloppyDisk} />}>Save</Button>
    </Group>
  )

  function actionButtons() {
    if (page === 9) {return finishedButtons;}
    return progressButtons;
  }

  return (
    <Flex
      gap="md"
      direction="column"
      h="100%"
    >
      <Stepper
        flex={1}
        active={page}
        onStepClick={setPage}
        styles={{
          content: {
            height: '70vh',
            overflow: 'scroll'
          },
          separator: {
            marginLeft: 4,
            marginRight: 4,
            height: 0,
          },
        }}
      >

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
              placeholder="Select up to two"
              data={['Hive', 'Ice', 'Leaf', 'Mud', 'Night', 'Rain', 'Sand', 'Sea', 'Silk', 'Sky']}
              clearable
              searchable
              nothingFoundMessage="Nothing found..."
              maxValues={2}
              value={dragon.tribe}
              comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
              onChange={(newTribes) => {
                setDragon((prev) => ({ ...prev, tribe: newTribes}))
              }}
            />
            <Group grow>
              <NumberInput
                label="Age"
                description="The age of the character"
                placeholder="Mature at age 6"
                value={dragon.age}
                onChange={(newAge) => {
                  setDragon((prev) => ({ ...prev, age: Number(newAge)}))
                }}
              />
              <TextInput
                label="Gender"
                description="The gender of the character"
                value={dragon.gender}
                onChange={(event) => {
                  setDragon((prev) => ({ ...prev, gender: event.currentTarget.value}))
                }}
              />
            </Group>

          </Stack>
        </Stepper.Step>

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
                onChange={(newColor) => {
                  setDragon((prev) => ({ ...prev, primaryColor: newColor}))
                }}
                description="Primary scales color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Secondary"
                value={dragon.secondaryColor}
                onChange={(newColor) => {
                  setDragon((prev) => ({ ...prev, secondaryColor: newColor}))
                }}
                description="Secondary scales color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Underscales"
                value={dragon.underscalesColor}
                onChange={(newColor) => {
                  setDragon((prev) => ({ ...prev, underscalesColor: newColor}))
                }}
                description="Underscales color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
            </SimpleGrid>
            <Title order={3}>Membrane</Title>
            <SimpleGrid cols={2}>
              <ColorInput
                label="Start Color"
                value={dragon.membraneColor1}
                onChange={(newColor) => {
                  setDragon((prev) => ({ ...prev, membraneColor1: newColor}))
                }}
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="End Color"
                value={dragon.membraneColor2}
                onChange={(newColor) => {
                  setDragon((prev) => ({ ...prev, membraneColor2: newColor}))
                }}
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
            </SimpleGrid>
            <Title order={3}>Other</Title>
            <SimpleGrid cols={2}>
              <ColorInput
                label="Eyes"
                value={dragon.eyeColor}
                onChange={(newColor) => {
                  setDragon((prev) => ({ ...prev, eyeColor: newColor}))
                }}
                description="Eye color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Spikes"
                value={dragon.spikesColor}
                onChange={(newColor) => {
                  setDragon((prev) => ({ ...prev, spikesColor: newColor}))
                }}
                description="Spikes and talons"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
            </SimpleGrid>

          </Stack>

        </Stepper.Step>

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
                  setDragon((prev) => ({ ...prev, name: event.target.value}))
                }}
              />
              <TextInput
                label="Pronouns"
                value={dragon.pronouns}
                onChange={(event) => {
                  setDragon((prev) => ({ ...prev, pronouns: event.target.value}))
                }}
              />
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon={faPeopleGroup} />}
          completedIcon={<FontAwesomeIcon icon={faPeopleGroup} />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Relations</Title>
              <Text>Dragons are social creatures!</Text>
            </Stack>
            <Flex
              gap="md"
              justify="flex-start"
              align="flex-end"
              direction="row"
              wrap="nowrap"
            >
              <Select
                flex={1}
                label="Add relation"
                placeholder="Pick value"
                data={['Mother', 'Father', 'Guardian', 'Grandmother', 'Grandfather', 'Adoptive Mother', 'Adoptive Father', 'Biological Mother', 'Biological Father', 'Stepmother', 'Stepfather', 'Sibling', 'Sister', 'Brother', 'Friend', 'Mentor', 'Ex-partner', 'Dragonet']}
                searchable
              />
              <Button onClick={notImplemented}>Add</Button>
            </Flex>

            <SimpleGrid cols={2}>
              {relations()}
            </SimpleGrid>

          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon={faLocationDot} />}
          completedIcon={<FontAwesomeIcon icon={faLocationDot} />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Locations</Title>
              <Text>Where??</Text>
            </Stack>
            <SimpleGrid cols={2}>
              <TextInput
                label="Hatching location"
                // This line below finds the location with identifier "Hatching location" and gets its value
                defaultValue={dragon.locations.find((location) => location.identifier === "Hatching location")?.name}
              // TODO: Display random placeholder
              />
              <TextInput
                label="Growing up location"
                defaultValue={dragon.locations.find((location) => location.identifier === "Growing up location")?.name}
              // TODO: Display random placeholder
              />
              <TextInput
                label="Home location"
                defaultValue={dragon.locations.find((location) => location.identifier === "Home location")?.name}
              // TODO: Display random placeholder
              />
              <TextInput
                label="Current location"
                defaultValue={dragon.locations.find((location) => location.identifier === "Current location")?.name}
              // TODO: Display random placeholder
              />
            </SimpleGrid>

          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon={faChartPie} />}
          completedIcon={<FontAwesomeIcon icon={faChartPie} />}
        >
          <Stack>
            <Title order={2}>Traits</Title>
            <Text>Tell me what this dragon is like.</Text>
            <SimpleGrid cols={2}>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Intelligence</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Intelligence")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Perception</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Perception")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Charisma</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Charisma")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Stealth</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Stealth")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Speed</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Speed")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Agility</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Agility")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Strength</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Strength")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Leadership</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Leadership")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Teamwork</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Teamwork")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Independence</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Independence")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Organization</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Organization")?.rating} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw="bold">Empathy</Text>
                <Rating fractions={2} defaultValue={dragon.traits.find((trait) => trait.name === "Empathy")?.rating} />
              </Flex>
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

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
              />
              <TextInput
                label="Occupation"
                defaultValue={dragon.occupation}
              // TODO: Display random placeholder
              />
            </SimpleGrid>

          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon={faGlasses} />}
          completedIcon={<FontAwesomeIcon icon={faGlasses} />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Appearance</Title>
              <Text>Customize! Accessorize! Decorate!</Text>
            </Stack>
            <Text size="sm" fw="bold">Size</Text>
            <Slider
              defaultValue={dragon.size}
              marks={[
                { value: 25, label: '25%' },
                { value: 50, label: '50%' },
                { value: 75, label: '75%' },
              ]}
            />
            <Title order={3}>Injuries</Title>
            <SimpleGrid cols={2}>
              <Switch
                label="Left arm"
                defaultChecked={dragon.injuries.leftArm}
              />
              <Switch
                label="Right arm"
                defaultChecked={dragon.injuries.rightArm}
              />
              <Switch
                label="Left leg"
                defaultChecked={dragon.injuries.leftLeg}
              />
              <Switch
                label="Right leg"
                defaultChecked={dragon.injuries.rightLeg}
              />
              <Switch
                label="Left wing"
                defaultChecked={dragon.injuries.leftWing}
              />
              <Switch
                label="Right wing"
                defaultChecked={dragon.injuries.rightWing}
              />
              <Switch
                label="Left eye"
                defaultChecked={dragon.injuries.leftEye}
              />
              <Switch
                label="Right eye"
                defaultChecked={dragon.injuries.rightEye}
              />
              <Switch
                label="Left horn"
                defaultChecked={dragon.injuries.leftHorn}
              />
              <Switch
                label="Right horn"
                defaultChecked={dragon.injuries.rightHorn}
              />
              <Switch
                label="Left ear"
                defaultChecked={dragon.injuries.leftEar}
              />
              <Switch
                label="Right ear"
                defaultChecked={dragon.injuries.rightEar}
              />
              <Switch
                label="Tail"
                defaultChecked={dragon.injuries.tail}
              />
            </SimpleGrid>

          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon={faCode} />}
          completedIcon={<FontAwesomeIcon icon={faCode} />}
        >
          <Stack>
            <Title order={2}>Metadata</Title>
            <Text>Credit where credit is due.</Text>
          </Stack>
          <SimpleGrid cols={2}>
            <TextInput
              label="Creator"
              description="The original creator of this character"
              defaultValue={dragon.creator}
            />
            <TextInput
              label="Builder"
              description="The individual who built this in Flight Forge (YOU)"
              defaultValue={dragon.builder}
            />
          </SimpleGrid>
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
      <Group justify='center'>
        {actionButtons()}
      </Group>
    </Flex>
  );
}