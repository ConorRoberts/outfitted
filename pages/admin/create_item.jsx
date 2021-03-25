import React, { useState } from "react";
import {
  Input,
  FormLabel,
  Textarea,
  Select,
  CheckboxGroup,
  Stack,
  Checkbox,
  Divider,
  Button,
} from "@chakra-ui/react";
import styles from "../../styles/Create_Item.module.scss";
import Header from "../../components/Header";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useAdminStatus from "../../utils/useAdminStatus";
import Loading from "../../components/Loading";

const CREATE_ITEM = gql`
  mutation CreateItem($newItemInput: NewItemInput!) {
    createItem(newItemInput: $newItemInput) {
      name
      brand
      season
    }
  }
`;

const CreateItem = () => {
  const admin = useAdminStatus();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [form, setForm] = useState({
    colours: [],
    build: [],
    occasions: [],
    sizes: [],
    images: [],
  });
  const [createItem, { data }] = useMutation(CREATE_ITEM);
  const onSubmit = (formData) => {
    createItem({
      variables: {
        newItemInput: {
          ...formData,
          ...form,
          images: form.images,
          price: +formData.price,
        },
      },
    });
    router.push("/");
  };

  const onImageAdd = ({ images }) => {
    setForm({ ...form, images: [...form.images, images] });
  };

  if (!admin) return <Loading />;
  return (
    <div>
      <Head>
        <title>Create an Item</title>
      </Head>
      <Header />
      <h1 className={styles.title}>Create an Item</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormLabel>Name</FormLabel>
        <Input ref={register} required name="name" />

        <FormLabel>Description</FormLabel>
        <Textarea ref={register} name="description" required />

        <FormLabel>Brand</FormLabel>
        <Input ref={register} name="brand" required />

        <FormLabel>Price</FormLabel>
        <Input ref={register} name="price" required />

        <FormLabel>Image</FormLabel>
        <Input ref={register} name="images" required />
        <Button onClick={handleSubmit(onImageAdd)}>Add Image</Button>

        <FormLabel>Link</FormLabel>
        <Input ref={register} name="link" required />

        <FormLabel>Material</FormLabel>
        <Input ref={register} name="material" required />

        <FormLabel>Category</FormLabel>
        <Select ref={register} name="category" placeholder="None">
          <option value="shoes">Shoes</option>
          <option value="hat">Hat</option>
          <option value="bottom">Bottom</option>
          <option value="top">Top</option>
          <option value="outerwear">Outerwear</option>
        </Select>

        <FormLabel>Colours</FormLabel>
        <CheckboxGroup
          onChange={(e) => setForm({ ...form, colours: e })}
          colorScheme="green"
        >
          <div className={styles.checkGroupFlex}>
            <Stack>
              <Checkbox value="black">Black</Checkbox>
              <Checkbox value="blue">Blue</Checkbox>
              <Checkbox value="brown">Brown</Checkbox>
              <Checkbox value="cream">Cream</Checkbox>
              <Checkbox value="green">Green</Checkbox>
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
              <Checkbox value="navy">Nav</Checkbox>
              <Checkbox value="khaki">Khaki</Checkbox>
              <Checkbox value="gray">Gray</Checkbox>
              <Checkbox value="lime">Line</Checkbox>
              <Checkbox value="white">White</Checkbox>
            </Stack>
          </div>
        </CheckboxGroup>

        <FormLabel>Occasion</FormLabel>
        <CheckboxGroup
          onChange={(e) => setForm({ ...form, occasions: e })}
          colorScheme="green"
        >
          <div className={styles.checkGroupFlex}>
            <Stack>
              <Checkbox value="formal">Formal</Checkbox>
              <Checkbox value="casual">Casual</Checkbox>
              <Checkbox value="streetwear">Streetwear</Checkbox>
              <Checkbox value="business-casual">Business Casual</Checkbox>
            </Stack>
          </div>
        </CheckboxGroup>

        <FormLabel>Season</FormLabel>
        <Select placeholder="None" name="season" ref={register}>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
        </Select>
        <Divider />

        <FormLabel>Build</FormLabel>
        <CheckboxGroup
          onChange={(e) => setForm({ ...form, build: e })}
          colorScheme="green"
        >
          <div className={styles.checkGroupFlex}>
            <Stack>
              <Checkbox value="husky">Husky</Checkbox>
              <Checkbox value="skinny">Skinny</Checkbox>
              <Checkbox value="muscular">Muscular</Checkbox>
              <Checkbox value="fit">Fit</Checkbox>
            </Stack>
          </div>
        </CheckboxGroup>

        <Divider />
        <FormLabel>Available Sizes</FormLabel>
        <CheckboxGroup
          onChange={(e) => setForm({ ...form, sizes: e })}
          colorScheme="green"
        >
          <div className={styles.checkGroupFlex}>
            <Stack>
              <Checkbox value="XS">XS</Checkbox>
              <Checkbox value="S">S</Checkbox>
              <Checkbox value="M">M</Checkbox>
            </Stack>
            <Stack>
              <Checkbox value="L">L</Checkbox>
              <Checkbox value="XL">XL</Checkbox>
              <Checkbox value="XXL">XXL</Checkbox>
              <Checkbox value="3XL+">3XL+</Checkbox>
            </Stack>
          </div>
        </CheckboxGroup>

        <div className={styles.buttonContainer}>
          <Button background="green.200" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
