import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Input,
  FormLabel,
  Select,
  Button,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import styles from "@styles/UpdateItemPage.module.scss";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useAdminStatus from "@utils/useAdminStatus";
import styled from "styled-components";

const COLOURS = ["green","dark green","white","red","cream","black","maroon","burgundy","lime","pink","magenta",]

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
  mutation updateItem($id: String!, $item: ItemInput!) {
    updateItem(id: $id, item: $item) {
      _id
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($id: String!) {
    deleteItem(id: $id) {
      _id
    }
  }
`;

const UpdateItemPage = ({ method, id }) => {
  const router = useRouter();
  const [getItem, { data, loading }] = useLazyQuery(GET_ITEM);
  const [updateItem] = useMutation(UPDATE_ITEM);
  const [deleteItem] = useMutation(DELETE_ITEM);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    seasons: [],
    category: "",
    occasions: [],
    colours: [],
    material: "",
    price: "",
    images: [],
    builds: [],
    sizes: [],
    link: "",
  });

  const admin = useAdminStatus();

  useEffect(() => {
    if (method === "edit") {
      getItem({ variables: { id: `${id}` } });
    }
  }, []);

  useEffect(() => {
    // Set default values for inputs
    if (data && !loading) {
      const { item } = data;
      console.log(item);
      setForm({
        ...item,
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    return;
    if (method === "edit") {
      updateItem({
        variables: {
          id: id,
          item: {
            ...form,
            price: +form.price,
            colours: form.colours.split(",").map((e) => e.trim()),
            builds: form.builds.split(",").map((e) => e.trim()),
            occasions: form.occasions.split(",").map((e) => e.trim()),
            seasons: form.seasons.split(",").map((e) => e.trim()),
            sizes: form.sizes.split(",").map((e) => e.trim()),
          },
        },
      });
    }
    router.push("/admin");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const appendArray = (name) => (e) => {
    setForm({ ...form, [name]: [...form[name], ""] });
  };
  const handleArrayChange = (index, name) => (e) => {
    const { value } = e.target;
    let tmp = [...form[name]];
    tmp[index] = value;
    setForm({ ...form, [name]: tmp });
  };

  if (!admin) return <Loading />;
  return (
    <div className={styles.container}>
      <Header title="Item" />
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Button type="submit" onClick={() => deleteItem(id)}>
            Delete Item
          </Button>
          {["name", "description", "brand", "price", "link", "material"].map(
            (e, index) => (
              <div key={`input-field-${index}`}>
                <StyledFormLabel>{e}</StyledFormLabel>
                <Input
                  required
                  name={e}
                  value={form[e]}
                  onChange={handleInputChange}
                />
              </div>
            )
          )}

          <FormLabel>Images</FormLabel>
          <Button leftIcon={<BsPlusCircle />} onClick={appendArray("images")}>
            Add Image
          </Button>
          {form.images.map((e, index) => (
            <Input
              key={`images-array-${index}`}
              onChange={handleArrayChange(index, "images")}
              value={e}
              required
            />
          ))}

          <FormLabel>Category</FormLabel>
          <Select name="category" placeholder="None">
            <option value="shoes">Shoes</option>
            <option value="hat">Hat</option>
            <option value="bottom">Bottom</option>
            <option value="top">Top</option>
            <option value="outerwear">Outerwear</option>
          </Select>

          <FormLabel>Colours</FormLabel>
          <Input name="colours" />

          <FormLabel>Occasion</FormLabel>
          {form.occasions.map(e=>
            
          <Input name="occasions" />
            )}

          <FormLabel>Season</FormLabel>
          <Input name="seasons" />

          <FormLabel>Build</FormLabel>
          <Input name="builds" />

          <FormLabel>Available Sizes</FormLabel>
          <Input name="sizes" />

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

const StyledFormLabel = styled(FormLabel)`
  text-transform: capitalize;
`;

export const getServerSideProps = async (req, res) => {
  const {
    query: [method, id],
  } = req.query;

  return { props: { method, id: id ?? "" } };
};

export default UpdateItemPage;
