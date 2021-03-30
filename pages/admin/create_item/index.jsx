import React from "react";
import {
  Input,
  FormLabel,
  Textarea,
  Select,
  CheckboxGroup,
  Stack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import styles from "@styles/Create_Item.module.scss";
import Header from "@components/Header";
import Head from "next/head";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import useAdminStatus from "@utils/useAdminStatus";
import Loading from "@components/Loading";
import { BsPlusCircle } from "react-icons/bs";

const CREATE_ITEM = gql`
  mutation CreateItem($id: String, $newItemInput: NewItemInput!) {
    createItem(id: $id, newItemInput: $newItemInput) {
      _id
    }
  }
`;

const GET_ITEM = gql`
  query getItem($id: String!) {
    item(id: $id) {
      _id
      name
      brand
      description
      seasons
      category
      occasions
      colours
      material
      price
      images
      builds
      sizes
      link
    }
  }
`;

const CreateItem = () => {
  const admin = useAdminStatus();
  const router = useRouter();
  const { id } = router.query;

  const [createItem] = useMutation(CREATE_ITEM);
  const { data } = useQuery(GET_ITEM, { variables: { id: `${id}` } });

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      images: [{ link: "" }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "images",
  });
  const onSubmit = (formData) => {
    createItem({
      variables: {
        newItemInput: {
          ...formData,
          price: +formData.price,
          images: formData.images.map(({ link }) => link),
        },
      },
    });
    router.push("/");
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

        <FormLabel>Images</FormLabel>
        <BsPlusCircle onClick={() => append({ name: "" })} />
        {fields.map((item, index) => (
          <Input
            key={item.id}
            ref={register}
            name={`images[${index}].link`}
            required
          />
        ))}

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
        <CheckboxGroup colorScheme="green">
          <div className={styles.checkGroupFlex}>
            <Stack>
              {[
                "black",
                "blue",
                "brown",
                "cream",
                "green",
                "red",
                "magenta",
              ].map((e) => (
                <Checkbox key={e} name="colours" ref={register} value={e}>
                  {e}
                </Checkbox>
              ))}
            </Stack>
            <Stack>
              {["pink", "yellow", "orange", "purple", "burgundy"].map((e) => (
                <Checkbox key={e} name="colours" ref={register} value={e}>
                  {e}
                </Checkbox>
              ))}
            </Stack>
            <Stack>
              {["navy", "khaki", "gray", "lime", "white"].map((e) => (
                <Checkbox key={e} name="colours" ref={register} value={e}>
                  {e}
                </Checkbox>
              ))}
            </Stack>
          </div>
        </CheckboxGroup>

        <FormLabel>Occasion</FormLabel>
        <CheckboxGroup colorScheme="green">
          <div className={styles.checkGroupFlex}>
            <Stack>
              {["formal", "casual", "streetwear", "business-casual"].map(
                (e) => (
                  <Checkbox key={e} name="occasions" ref={register} value={e}>
                    {e}
                  </Checkbox>
                )
              )}
            </Stack>
          </div>
        </CheckboxGroup>

        <FormLabel>Season</FormLabel>
        <CheckboxGroup colorScheme="green">
          <div className={styles.checkGroupFlex}>
            <Stack>
              {["winter", "spring", "summer", "fall"].map((e) => (
                <Checkbox key={e} name="seasons" ref={register} value={e}>
                  {e}
                </Checkbox>
              ))}
            </Stack>
          </div>
        </CheckboxGroup>

        <FormLabel>Build</FormLabel>
        <CheckboxGroup colorScheme="green">
          <div className={styles.checkGroupFlex}>
            <Stack>
              {["husky", "skinny", "muscular", "fit"].map((e) => (
                <Checkbox key={e} name="builds" ref={register} value={e}>
                  {e}
                </Checkbox>
              ))}
            </Stack>
          </div>
        </CheckboxGroup>

        <FormLabel>Available Sizes</FormLabel>
        <CheckboxGroup colorScheme="green">
          <div className={styles.checkGroupFlex}>
            <Stack>
              {["XS", "S", "M"].map((e) => (
                <Checkbox key={e} name="sizes" ref={register} value={e}>
                  {e}
                </Checkbox>
              ))}
            </Stack>
            <Stack>
              {["L", "XL", "XXL", "3XL+"].map((e) => (
                <Checkbox key={e} name="sizes" ref={register} value={e}>
                  {e}
                </Checkbox>
              ))}
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

