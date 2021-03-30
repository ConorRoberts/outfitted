import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
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
import { BsPlusCircle } from "react-icons/bs";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "@styles/UpdateItemPage.module.scss";
import Header from "@components/Header";
import Head from "next/head";

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

const UPDATE_ITEM = gql`
  mutation updateItem($id: String!, $updateItemInput: UpdateItemInput!) {
    updateItem(id: $id, updateItemInput: $updateItemInput) {
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

const UpdateItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GET_ITEM, { variables: { id: `${id}` } });
  const [updateItem] = useMutation(UPDATE_ITEM);
  const { register, handleSubmit, control, formState, setValue } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "images",
  });

  useEffect(() => {
    data &&
      Object.entries(data?.item).forEach(([key, val]) => setValue(key, val));

    // data && data?.item.images.forEach((e) => append({ link: "stinky" }));
    // append({link:"hi"});
  }, [data]);
  const onSubmit = (formData) => {
    updateItem({
      variables: {id:id,
        updateItemInput: {
          ...formData,
          price: +formData.price,
          images: formData.images && formData.images.map(({ link }) => link),
        },
      },
    });
    router.push("/");
  };
  return (
    <div>
      <Head>
        <title>Create an Item</title>
      </Head>
      <Header />
      <main>
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
          <BsPlusCircle onClick={() => append({ link: "" })} />
          {/* {fields.map((item, index) => (
            <Input
              key={item.id}
              ref={register}
              name={`images[${index}].link`}
              required
            />
          ))} */}

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
      </main>
    </div>
  );
};

export default UpdateItemPage;
