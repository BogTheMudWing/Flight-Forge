import { React, useState } from 'react';

import notImplemented from '../AppUtils.jsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

import { Stepper, Stack, Title, Text, Group, Button, MultiSelect, NumberInput, TextInput, ColorInput, Switch, Select, Slider, Flex, SimpleGrid, Rating, Fieldset } from '@mantine/core'

import "./Configurator.css"

Configurator.propTypes = {
  dragon: PropTypes.string.isRequired
}
export default function Configurator({dragon}) {

  function relations() {

    var elements = [];

    dragon.relations.forEach((relation) => {
      elements.push(
        <Fieldset legend={relation.relation}>
          <Stack>
            <TextInput label="Name" defaultValue={relation.name} />
            <Select label="Status" defaultValue={relation.status} data={relationStatus} />
            <Button color='red' variant='light' onClick={notImplemented}>Delete</Button>
          </Stack>
        </Fieldset>
      )
    });

    console.log(elements);

    return elements;
  }

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 9 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const relationStatus = ['Good', 'Estranged', 'Deceased', 'Lost', 'Unknown'];

  const progressButtons = (
    <Group>
      <Button onClick={prevStep} leftSection={<FontAwesomeIcon icon="fa-solid fa-arrow-left" />} disabled={active == 0}>Back</Button>
      <Button onclick={notImplemented} leftSection={<FontAwesomeIcon icon="fa-solid fa-dice" />}>Randomize</Button>
      <Button onClick={nextStep} rightSection={<FontAwesomeIcon icon="fa-solid fa-arrow-right" />}>Next</Button>
    </Group>
  )

  const finishedButtons = (
    <Group>
      <Button onClick={prevStep} variant='light' leftSection={<FontAwesomeIcon icon="fa-solid fa-plus" />}>New</Button>
      <Button onClick={nextStep} variant='light' leftSection={<FontAwesomeIcon icon="fa-solid fa-floppy-disk" />}>Save</Button>
    </Group>
  )

  function actionButtons() {
    if (active == 9) return finishedButtons;
    return progressButtons;
  }

  return (
    <Flex
      gap="md"
      direction="column"
      h={'100%'}
    >
      <Stepper
        flex={1}
        active={active}
        onStepClick={setActive}
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
          icon={<FontAwesomeIcon icon='fa-info' />}
          completedIcon={<FontAwesomeIcon icon='fa-info' />}
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
              defaultValue={dragon.tribe}
              comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
            />
            <Group grow>
              <NumberInput
                label="Age"
                description="The age of the character"
                placeholder="Mature at age 6"
                defaultValue={dragon.age}
              />
              <TextInput
                label="Gender"
                description="The gender of the character"
                defaultValue={dragon.gender}
              />
            </Group>

          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon="fa-solid fa-palette" />}
          completedIcon={<FontAwesomeIcon icon="fa-solid fa-palette" />}
        >
          <Stack>
            <Title order={2}>Colors</Title>
            <Text>Choose the colors for this dragon.</Text>
            <Title order={3}>Scales</Title>
            <SimpleGrid cols={2}>
              <ColorInput
                label="Primary"
                defaultValue={dragon.primaryColor}
                description="Primary scales color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Secondary"
                defaultValue={dragon.secondaryColor}
                description="Secondary scales color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Underscales"
                defaultValue={dragon.underscalesColor}
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
                defaultValue={dragon.membraneColor1}
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="End Color"
                defaultValue={dragon.membraneColor2}
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
            </SimpleGrid>
            <Title order={3}>Other</Title>
            <SimpleGrid cols={2}>
              <ColorInput
                label="Eyes"
                defaultValue={dragon.eyeColor}
                description="Eye color"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
              <ColorInput
                label="Spikes"
                defaultValue={dragon.spikesColor}
                description="Spikes and talons"
                popoverProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              // TODO: Dyanmically change swatches based on tribe
              />
            </SimpleGrid>

          </Stack>

        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon="fa-solid fa-address-card" />}
          completedIcon={<FontAwesomeIcon icon="fa-solid fa-address-card" />}
        >
          <Stack>
            <Title order={2}>Identification</Title>
            <Text>What do we call this dragon?</Text>
            <SimpleGrid cols={2}>
              <TextInput
                label="Name"
                defaultValue={dragon.name}
              />
              <TextInput
                label="Pronouns"
                defaultValue={dragon.pronouns}
              />
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon="fa-solid fa-people-group" />}
          completedIcon={<FontAwesomeIcon icon="fa-solid fa-people-group" />}
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
          icon={<FontAwesomeIcon icon="fa-solid fa-map" />}
          completedIcon={<FontAwesomeIcon icon="fa-solid fa-map" />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Locations</Title>
              <Text>Where??</Text>
            </Stack>
            <SimpleGrid cols={2}>
              <TextInput
                label="Hatching location"
              // TODO: Display random placeholder
              />
              <TextInput
                label="Growing up location"
              // TODO: Display random placeholder
              />
              <TextInput
                label="Home location"
              // TODO: Display random placeholder
              />
              <TextInput
                label="Current location"
              // TODO: Display random placeholder
              />
            </SimpleGrid>

          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon="fa-solid fa-chart-pie" />}
          completedIcon={<FontAwesomeIcon icon="fa-solid fa-chart-pie" />}
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
                <Text size='sm' fw={'bold'}>Intelligence</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Perception</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Charisma</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Stealth</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Speed</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Agility</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Strength</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Leadership</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Teamwork</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Independence</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Organization</Text>
                <Rating fractions={2} />
              </Flex>
              <Flex
                gap="md"
                justify="flex-end"
                align="flex-end"
                direction="row"
                wrap="nowrap"
              >
                <Text size='sm' fw={'bold'}>Empathy</Text>
                <Rating fractions={2} />
              </Flex>
            </SimpleGrid>
          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon="fa-solid fa-heart-pulse" />}
          completedIcon={<FontAwesomeIcon icon="fa-solid fa-heart-pulse" />}
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
              />
              <TextInput
                label="Occupation"
              // TODO: Display random placeholder
              />
            </SimpleGrid>

          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon="fa-solid fa-ring" />}
          completedIcon={<FontAwesomeIcon icon="fa-solid fa-ring" />}
        >
          <Stack>
            <Stack>
              <Title order={2}>Appearance</Title>
              <Text>Customize! Accessorize! Decorate!</Text>
            </Stack>
            <Text size="sm" fw={'bold'}>Size</Text>
            <Slider
              defaultValue={50}
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
              />
              <Switch
                label="Right arm"
              />
              <Switch
                label="Left leg"
              />
              <Switch
                label="Right leg"
              />
              <Switch
                label="Left wing"
              />
              <Switch
                label="Right wing"
              />
              <Switch
                label="Left eye"
              />
              <Switch
                label="Right eye"
              />
              <Switch
                label="Left horn"
              />
              <Switch
                label="Right horn"
              />
              <Switch
                label="Left ear"
              />
              <Switch
                label="Right ear"
              />
              <Switch
                label="Tail"
              />
            </SimpleGrid>

          </Stack>
        </Stepper.Step>

        <Stepper.Step
          icon={<FontAwesomeIcon icon="fa-solid fa-code" />}
          completedIcon={<FontAwesomeIcon icon="fa-solid fa-code" />}
        >
          <Stack>
            <Title order={2}>Metadata</Title>
            <Text>Credit where credit is due.</Text>
          </Stack>
          <SimpleGrid cols={2}>
            <TextInput
              label="Creator"
              description="The original creator of this character"
            />
            <TextInput
              label="Builder"
              description="The individual who built this in Flight Forge (YOU)"
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