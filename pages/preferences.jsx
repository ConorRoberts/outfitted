import React, { useState } from "react";
import Header from "../components/Header";
import Head from "next/head";
import styles from "../styles/Preferences.module.scss";
import {
  Input,
  Select,
  FormLabel,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberDecrementStepper,
  InputRightAddon,
  InputLeftAddon,
  InputGroup,
  Flex,
  Checkbox,
  CheckboxGroup,
  HStack,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($settingsInput: SettingsInput!) {
    updateSettings(settingsInput: $settingsInput) {
      gender
      build
      birthday
      height
    }
  }
`;

// Query for initial settings values
// const GET_SETTINGS

const Preferences = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const [session, loading] = useSession();
  if (!session && !loading) {
    router.push("/");
  }
  const [updateSettings, { data }] = useMutation(UPDATE_SETTINGS);
  const [form, setForm] = useState({
    favColours: [],
  });

  const onSubmit = ({
    build,
    gender,
    heightFt,
    heightIn,
    birthday,
    pantsSize,
    shirtSize,
    sweaterSize,
    shoeSize,
    styleIcons,
    favInfluencers,
    favBrands,
  }) => {
    const { favColours } = form;
    updateSettings({
      variables: {
        settingsInput: {
          _user: session.user.id.toString(),
          birthday,
          build,
          gender,
          pantsSize,
          shirtSize,
          sweaterSize,
          favColours,
          favBrands,
          styleIcons: styleIcons.split(",").map((e) => e.trim()),
          favInfluencers: favInfluencers.split(",").map((e) => e.trim()),
          shoeSize: +shoeSize,
          height: +heightFt * 12 + +heightIn,
        },
      },
    });
    router.push("/");
  };

  return (
    <div>
      <Header title="Preferences" />
      <main className={styles.main}>
        <h1 className={styles.title}>Preferences</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.heading}>Tell us about yourself</h2>
          <FormLabel>Birthday</FormLabel>
          <Input required type="date" name="birthday" ref={register} />
          <FormLabel>Gender</FormLabel>
          <Select name="gender" ref={register}>
            <option>Other</option>
            <option>Female</option>
            <option>Male</option>
          </Select>
          <FormLabel>Height</FormLabel>
          <Flex align="center">
            <InputGroup>
              <InputLeftAddon children="ft" />
              <Input
                required
                type="number"
                max={10}
                ref={register}
                name="heightFt"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="in" />
              <Input
                required
                type="number"
                max={11}
                ref={register}
                name="heightIn"
              />
            </InputGroup>
          </Flex>
          <FormLabel>Build</FormLabel>
          <Select ref={register} name="build">
            <option>Fit</option>
            <option>Skinny</option>
            <option>Muscular</option>
            <option>Husky</option>
          </Select>
          <FormLabel>Shoe Size (US)</FormLabel>
          <Input
            required
            name="shoeSize"
            ref={register}
            type="number"
            step={0.5}
          />
          <FormLabel>What are your 5 favourite clothing brands?</FormLabel>
          <Input required name="favBrands" ref={register} />
          <FormLabel>
            Do you value sustainability when purchasing clothing?
          </FormLabel>
          <Select name="sustainable" ref={register}>
            <option>Other</option>
            <option>Yes</option>
            <option>No</option>
          </Select>
          <FormLabel>
            Do you prefer loose/baggy or tight fitting clothes?
          </FormLabel>
          <Select name="fit" ref={register}>
            <option>Both</option>
            <option>Baggy</option>
            <option>Tight</option>
          </Select>
          <FormLabel>What are your favourite colours?</FormLabel>
          <CheckboxGroup
            onChange={(e) => setForm({ ...form, favColours: e })}
            colorScheme="green"
          >
            <div className={styles.checkGroupFlex}>
              <Stack>
                <Checkbox value="green">Green</Checkbox>
                <Checkbox value="blue">Blue</Checkbox>
                <Checkbox value="red">Red</Checkbox>
                <Checkbox value="magenta">Magenta</Checkbox>
              </Stack>
              <Stack>
                <Checkbox value="pink">Pink</Checkbox>
                <Checkbox value="yellow">Yellow</Checkbox>
                <Checkbox value="orange">Orange</Checkbox>
                <Checkbox value="purple">Purple</Checkbox>
                <Checkbox value="burgundy">Burgundy</Checkbox>
              </Stack>
              <Stack>
                <Checkbox value="cream">Cream</Checkbox>
                <Checkbox value="white">White</Checkbox>
                <Checkbox value="black">Black</Checkbox>
                <Checkbox value="brown">Brown</Checkbox>
              </Stack>
            </div>
          </CheckboxGroup>
          <FormLabel>Pants Size</FormLabel>
          <Select name="pantsSize" ref={register}>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </Select>
          <FormLabel>Sweater Size</FormLabel>
          <Select name="sweaterSize" ref={register}>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </Select>
          <FormLabel>Shirt Size</FormLabel>
          <Select name="shirtSize" ref={register}>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
            <option>3XL+</option>
          </Select>
          <FormLabel>Who are your style icons?</FormLabel>
          <Input required name="styleIcons" ref={register} />
          <FormLabel>Who are your favourite influencers?</FormLabel>
          <Input required name="favInfluencers" ref={register} />
          <div className={styles.submit}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Button background="green.200" type="submit">
                Save
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default Preferences;
