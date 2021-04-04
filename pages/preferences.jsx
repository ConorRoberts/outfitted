import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/Preferences.module.scss";
import {
  Input,
  Select,
  FormLabel,
  InputLeftAddon,
  InputGroup,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import useUserSettings from "@utils/useUserSettings";

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

const Preferences = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const [session, loading] = useSession();
  if (!session && !loading) {
    router.push("/");
  }
  const [updateSettings] = useMutation(UPDATE_SETTINGS);

  const settings = useUserSettings(session?.user.id);

  useEffect(() => {
    if (settings) {
      Object.entries(settings).forEach(([key, val]) => {
        setValue(key, val);
      });

      setValue("favColours", settings?.favColours.join(", "));
      setValue(
        "birthday",
        new Date(settings.birthday).toISOString().slice(0, 10)
      );
      setValue("favBrands", settings?.favBrands.join(", "));
      setValue("favInfluencers", settings?.favInfluencers.join(", "));
      setValue("heightIn", settings?.height % 12);
      setValue("heightFt", Math.round(settings?.height / 12));
    }
  }, [settings]);

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
    favColours,
  }) => {
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
          favBrands: favBrands.split(",").map((e) => e.trim()),
          favColours: favColours.split(",").map((e) => e.trim()),
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
          <Input ref={register} name="favColours" />
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
