import React, { useEffect } from "react";
import Header from "../components/Header";
import Head from "next/head";
import styles from "../styles/Preferences.module.scss";
import { Input, Select, FormLabel, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberInputField, NumberDecrementStepper, InputRightAddon, InputLeftAddon, InputGroup, Flex, Checkbox, CheckboxGroup, HStack, Stack, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const UPDATE_PREFS = gql`
  mutation UpdatePrefs($id:ID!,$gender:String!,$build:String!,$height:Float!,$birthday:String!){
    updateUserPrefs(id:$id,gender:$gender,build:$build,height:$height,birthday:$birthday){
        name
        gender
        build
        birthday
        height
    }
}
`;

const Preferences = () => {
    const router = useRouter();
    const { register, handleSubmit, watch, errors } = useForm();
    const [session, loading] = useSession();
    const [updatePrefs, { data }] = useMutation(UPDATE_PREFS);

    const onSubmit = ({ birthday, heightFt, heightIn, gender, build }) => {
        updatePrefs({ variables: { id: session.user.id.toString(), gender: gender, build: build, birthday: birthday, height: (heightFt * 30.48) + (heightIn / 12 * 30.48) } });
        router.push("/");
    };

    return (
        <div>
            <Head>
                <title>Preferences</title>
                <link rel="icon" type="image/png" href="/logo.jpg"/>
            </Head>
            <Header />
            <main className={styles.main}>
                <h1 className={styles.title}>Preferences</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={styles.heading}>Tell us about yourself</h2>
                    <FormLabel>Birthday</FormLabel>
                    <Input required type="date" name="birthday" ref={register} placeholder="DD/MM/YYYY" />
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
                            <Input required type="number" max={10} ref={register} name="heightFt" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children="in" />
                            <Input required type="number" max={11} ref={register} name="heightIn" />
                        </InputGroup>
                    </Flex>
                    <FormLabel>Build</FormLabel>
                    <Select ref={register} name="build">
                        <option>Other</option>
                        <option>Skinny</option>
                        <option>Muscular</option>
                        <option>Husky</option>
                    </Select>
                    <h2 className={styles.heading}>Types of clothing</h2>
                    <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
                        <FormLabel>Casual</FormLabel>
                        <Stack>
                            <Checkbox value="casual-longsleeve">Long sleeve</Checkbox>
                            <Checkbox value="casual-shortsleeve">T-Shirt</Checkbox>
                            <Checkbox value="casual-hoodie">Hoodie</Checkbox>
                        </Stack>
                        <FormLabel>Smart Casual</FormLabel>
                        <Stack>
                            <Checkbox value="smart-longsleeve">Long sleeve</Checkbox>
                            <Checkbox value="smart-shortsleeve">T-Shirt</Checkbox>
                            <Checkbox value="smart-hoodie">Hoodie</Checkbox>
                        </Stack>
                    </CheckboxGroup>
                    <h2 className={styles.heading}>Colours</h2>
                    <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
                        <Stack>
                            <Checkbox value="casual-longsleeve">Green</Checkbox>
                            <Checkbox value="casual-shortsleeve">Blue</Checkbox>
                            <Checkbox value="casual-hoodie">Pink</Checkbox>
                        </Stack>
                    </CheckboxGroup>
                    <Flex justify="center">
                        {loading ? <p>Loading...</p> : <Button className={styles.submit} type="submit">Save</Button>}
                    </Flex>
                </form>
            </main>
        </div>
    );
};

export default Preferences;