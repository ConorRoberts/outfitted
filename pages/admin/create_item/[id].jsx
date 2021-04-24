import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Input, FormLabel, Textarea, Select, Button } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "@styles/UpdateItemPage.module.scss";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Loading from "@components/Loading";
import useAdminStatus from "@utils/useAdminStatus";

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
  const { register, handleSubmit, control, setValue } = useForm();
  // const { fields, append } = useFieldArray({
  //   control,
  //   name: "images",
  // });

  const admin = useAdminStatus();

  // if (!admin) return <Loading />;

  useEffect(() => {
    if (data){
      Object.entries(data?.item).forEach(([key, val]) => setValue(key, val));
      setValue("colours",data.item.colours.join(", "));
      setValue("builds",data.item.builds.join(", "));
      setValue("occasions",data.item.occasions.join(", "));
      setValue("seasons",data.item.seasons.join(", "));
      setValue("sizes",data.item.sizes.join(", "));

    }

    // data && data?.item.images.forEach((e) => append({ link: e }));
    // append({link:"hi"});
  }, []);
  const onSubmit = (formData) => {
    updateItem({
      variables: {
        id: id,
        updateItemInput: {
          ...formData,
          price: +formData.price,
          // images: formData.images && formData.images.map(({ link }) => link),
          colours: formData.colours.split(",").map((e) => e.trim()),
          builds: formData.builds.split(",").map((e) => e.trim()),
          occasions: formData.occasions.split(",").map((e) => e.trim()),
          seasons: formData.seasons.split(",").map((e) => e.trim()),
          sizes: formData.sizes.split(",").map((e) => e.trim()),
        },
      },
    });
    router.push("/admin");
  };
  return (
    <div className={styles.container}>
      <Header title="Create Item" />
      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FormLabel>Name</FormLabel>
          <Input ref={register} required name="name" />

          <FormLabel>Description</FormLabel>
          <Textarea ref={register} name="description" required />

          <FormLabel>Brand</FormLabel>
          <Input ref={register} name="brand" required />

          <FormLabel>Price</FormLabel>
          <Input ref={register} name="price" required />

          {/* <FormLabel>Images</FormLabel>
          <BsPlusCircle onClick={() => append({ link: "" })} />
          {fields.map((item, index) => (
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
          <Input name="colours" ref={register} />

          <FormLabel>Occasion</FormLabel>
          <Input name="occasions" ref={register} />

          <FormLabel>Season</FormLabel>
          <Input name="seasons" ref={register} />

          <FormLabel>Build</FormLabel>
          <Input name="builds" ref={register} />

          <FormLabel>Available Sizes</FormLabel>
          <Input name="sizes" ref={register} />

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
