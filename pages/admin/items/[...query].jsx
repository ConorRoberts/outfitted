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
  Flex,
} from "@chakra-ui/react";
import { BsPlus, BsPlusCircle } from "react-icons/bs";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useAdminStatus from "@utils/useAdminStatus";
import styled from "styled-components";
import Container from "@components/Container";
import GoTrashcan from "react-icons/go";

const COLOURS = [
  "green",
  "dark green",
  "white",
  "red",
  "cream",
  "black",
  "maroon",
  "burgundy",
  "lime",
  "pink",
  "magenta",
];

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
const CREATE_ITEM = gql`
  mutation createItem($item: ItemInput!) {
    createItem(item: $item) {
      _id
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
  const [createItem] = useMutation(CREATE_ITEM);

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
      setForm(Object.fromEntries(Object.entries(item).slice(2)));
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = Object.fromEntries(
      Object.entries(form).map(([key, val]) => {
        if (Array.isArray(val)) {
          return [key, val.map((e) => e.trim().toLowerCase())];
        }

        return [key, key === "price" ? +val : val];
      })
    );

    if (method === "edit") {
      updateItem({
        variables: {
          id: id,
          item: res,
        },
      });
    } else if (method === "new") {
      createItem({ variables: { item: res } });
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
  const handleArrayChange = (index) => (e) => {
    const { value, name } = e.target;
    let tmp = [...form[name]];
    tmp[index] = value;
    setForm({ ...form, [name]: tmp });
  };

  if (!admin) return <Loading />;
  return (
    <div>
      <Header title="Item" />
      <Container>
        <form onSubmit={handleSubmit}>
          <Flex justify="center">
            <Button
              leftIcon={GoTrashcan}
              type="submit"
              onClick={() => deleteItem({ variables: { id: id } })}
            >
              Delete Item
            </Button>
          </Flex>
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
          <Flex justify="center">
            <Button leftIcon={<BsPlusCircle />} onClick={appendArray("images")}>
              Add Image
            </Button>
          </Flex>
          {form.images.map((e, index) => (
            <Input
              margin=".5rem 0"
              key={`images-array-${index}`}
              onChange={handleArrayChange(index)}
              value={e}
              name="images"
              required
            />
          ))}

          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            placeholder="None"
            onChange={handleInputChange}
          >
            <option value="shoes">Shoes</option>
            <option value="hat">Hat</option>
            <option value="bottom">Bottom</option>
            <option value="top">Top</option>
            <option value="outerwear">Outerwear</option>
          </Select>

          <FormLabel>Colours</FormLabel>
          <Flex justify="center">
            <Button
              leftIcon={<BsPlusCircle />}
              onClick={appendArray("colours")}
            >
              Add Colour
            </Button>
          </Flex>
          {form.colours.map((e, index) => (
            <Input
              name="colours"
              value={e}
              onChange={handleArrayChange(index)}
              margin=".5rem 0"
              key={`colour-${index}`}
            />
          ))}

          <FormLabel>Occasions</FormLabel>
          <Flex justify="center">
            <Button
              leftIcon={<BsPlusCircle />}
              onClick={appendArray("occasions")}
            >
              Add Occasion
            </Button>
          </Flex>
          {form.occasions.map((e, index) => (
            <Input
              name="occasions"
              value={e}
              onChange={handleArrayChange(index)}
              margin=".5rem 0"
              key={`occasion-${index}`}
            />
          ))}

          <FormLabel>Season</FormLabel>
          <CheckboxGroup
            value={form.seasons}
            onChange={(e) => setForm({ ...form, seasons: e })}
          >
            <Flex justify="space-evenly">
              {["winter", "spring", "summer", "fall"].map((e) => (
                <Checkbox
                  key={`season-${e}`}
                  name="seasons"
                  value={e}
                  textTransform="capitalize"
                >
                  {e}
                </Checkbox>
              ))}
            </Flex>
          </CheckboxGroup>

          <FormLabel>Builds</FormLabel>
          <Flex justify="center">
            <Button leftIcon={<BsPlusCircle />} onClick={appendArray("builds")}>
              Add Build
            </Button>
          </Flex>
          {form.builds.map((e, index) => (
            <Input
              name="builds"
              value={e}
              onChange={handleArrayChange(index)}
              margin=".5rem 0"
              key={`build-${index}`}
            />
          ))}

          <FormLabel>Available Sizes</FormLabel>
          <CheckboxGroup
            value={form.sizes.map((e) => e.toUpperCase())}
            onChange={(e) => setForm({ ...form, sizes: e })}
          >
            <Flex justify="space-evenly">
              {["XS", "S", "MD", "L", "XL", "2XL+"].map((e, index) => (
                <Checkbox
                  key={`sizes-${index}`}
                  value={e}
                  textTransform="capitalize"
                >
                  {e}
                </Checkbox>
              ))}
            </Flex>
          </CheckboxGroup>

          <Flex justify="center" marginTop="1rem">
            <Button background="green.200" color="black" type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </Container>
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
