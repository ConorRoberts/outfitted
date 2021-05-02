import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Input,
  FormLabel,
  Textarea,
  Select,
  Button,
  Flex,
} from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import Header from "@components/Header";
import useAdminStatus from "@utils/useAdminStatus";
import Loading from "@components/Loading";
import Container from "@components/Container";
import styled from "styled-components";
import { theme, breakpoints } from "../../../globalStyles";
import _ from "lodash";
import useAllItems from "@utils/useAllItems";

const UPDATE_ARTICLE = gql`
  mutation updateArticle($id: String!, $updatedArticle: UpdateArticleInput!) {
    updateArticle(id: $id, updatedArticle: $updatedArticle) {
      _id
    }
  }
`;

const CREATE_ARTICLE = gql`
  mutation createArticle($articleInput: ArticleInput!) {
    createArticle(articleInput: $articleInput) {
      _id
    }
  }
`;

const GET_ARTICLE = gql`
  query getArticle($id: String!) {
    article(id: $id) {
      title
      body
      image
      author
      timestamp
      videoLinks
      featuredItems {
        _id
        name
        images
        description
        link
      }
      sections {
        title
        body
        image
      }
    }
  }
`;

const FeaturedItemPreview = ({ item = {} }) => {
  const { name, images, category, description } = item;

  return (
    <ItemPreviewContainer>
      <img src={images && images[0]} />
      <Flex direction="column" marginLeft="1rem">
        <h4>{name}</h4>
        <p>{category}</p>
        <p>{description}</p>
      </Flex>
    </ItemPreviewContainer>
  );
};

const CreateArticlePage = ({ method, id }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    body: "",
    image: "",
    author: "",
  });
  const [sections, setSections] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("none");
  const [videoLinks, setVideoLinks] = useState([]);

  const [getArticle, { data, loading }] = useLazyQuery(GET_ARTICLE);
  const items = useAllItems();

  const [updateArticle] = useMutation(UPDATE_ARTICLE);
  const [createArticle] = useMutation(CREATE_ARTICLE);

  const admin = useAdminStatus();

  useEffect(() => {
    // Setup for EDIT method
    if (method === "edit") getArticle({ variables: { id: `${id}` } });
  }, []);

  useEffect(() => {
    // Set default values for inputs
    if (data && !loading) {
      const { article } = data;
      setForm({
        title: article.title,
        body: article.body,
        image: article.image,
        author: article.author,
      });
      setSections(
        article?.sections?.map(({ title, body, image }) => ({
          title,
          body,
          image,
        }))
      );
      setFeaturedItems(article?.featuredItems);
      setVideoLinks(article?.videoLinks ?? []);
    }
  }, [data]);

  /**
   * onChange event handler for most of the form inputs
   * @param {*} e
   */
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleInputChange = (e, array, index) => {
    const { value } = e.target;
    let tmp = [...array];

    tmp[index] = value;

    return tmp;
  };

  const handleSectionChange = (e, index) => {
    const { name, value } = e.target;
    let tmp = [...sections];

    tmp[index] = { ...tmp[index], [name]: value };

    setSections([...tmp]);
  };

  /**
   * Remove a specific section from the sections array
   * @param {*} index
   */
  const popSections = (index) => {
    const tmp = [...sections];
    tmp.splice(index, 1);
    setSections([...tmp]);
  };

  /**
   * Append a template to sections array
   */
  const growSections = () => {
    const tmp = [...sections];
    tmp.push({ title: "Title", body: "Body", image: "Image" });
    setSections([...tmp]);
  };

  /**
   * Event handler for form submission
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const article = {
      ...form,
      sections,
      featuredItems: featuredItems.map(({ _id }) => _id),
      videoLinks,
    };
    if (method === "edit") {
      updateArticle({
        variables: { id: id, updatedArticle: article },
      });
    } else if (method === "new") {
      createArticle({
        variables: { articleInput: article },
      });
    }
    router.push("/articles");
  };

  /**
   * Add item (selectedItem id) to featuredItems array
   * @returns
   */
  const appendFeaturedItems = () => {
    const newItem = _.find(items, { _id: selectedItem });

    if (featuredItems.includes(newItem)) return;

    setFeaturedItems([...featuredItems, newItem]);
  };

  /**
   * Remove item from featuredItems array
   * @param {*} item
   */
  const popFeaturedItems = (item) => {
    setFeaturedItems(featuredItems.filter((e) => e !== item));
  };

  const arrayRemove = (array, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
  };

  // If the user is not admin OR the admin state hasn't been retrieved
  if (!admin) return <Loading />;

  return (
    <div>
      <Header title="Create Article" />
      <Container>
        <form onSubmit={handleSubmit}>
          <Heading>Head</Heading>
          {Object.entries(form).map(([key, val]) => {
            const props = {
              required: true,
              name: key,
              value: val,
              onChange: handleHeaderChange,
            };
            return (
              <FormGroup key={key}>
                <StyledFormLabel>{key}</StyledFormLabel>
                {key === "body" ? (
                  <Textarea {...props} />
                ) : (
                  <Input {...props} />
                )}
              </FormGroup>
            );
          })}

          <Heading>Sections</Heading>
          {sections?.map(({ title, body, image }, index) => {
            const key = `Section ${index + 1}`;

            return (
              <SectionGroup key={key}>
                <SectionLabel>{key}</SectionLabel>
                <Flex justify="center">
                  <Button margin="0 1rem" onClick={() => popSections(index)}>
                    <StyledMinusIcon />
                    Remove {key}
                  </Button>
                </Flex>
                <StyledFormLabel>Title</StyledFormLabel>
                <Input
                  name="title"
                  value={title}
                  required
                  onChange={(e) => handleSectionChange(e, index)}
                />
                <StyledFormLabel>Body</StyledFormLabel>
                <Textarea
                  name="body"
                  value={body}
                  required
                  onChange={(e) => handleSectionChange(e, index)}
                />
                <StyledFormLabel>Image</StyledFormLabel>
                <Input
                  name="image"
                  value={image}
                  required
                  onChange={(e) => handleSectionChange(e, index)}
                />
              </SectionGroup>
            );
          })}
          <Flex margin="1rem 0" justify="center">
            <Button margin="0 1rem" onClick={growSections}>
              <StyledPlusIcon /> New Section
            </Button>
          </Flex>

          <Heading>Select Items</Heading>
          <StyledFormLabel>Featured Items</StyledFormLabel>
          <Select
            onChange={(e) => setSelectedItem(e.target.value)}
            value={selectedItem}
          >
            <option value="none">None</option>
            {items?.map(({ name, _id }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </Select>
          {selectedItem !== "none" && (
            <Flex margin="1rem 0" justify="center">
              <Button margin="0 1rem" onClick={appendFeaturedItems}>
                <StyledPlusIcon /> Add
              </Button>
            </Flex>
          )}
          <FeaturedItemPreview item={_.find(items, { _id: selectedItem })} />
          {featuredItems?.length !== 0 && <Heading>Featured Items</Heading>}
          {featuredItems?.map((item, index) => (
            <FormGroup key={`featured-${index}`}>
              <Button margin="0 1rem" onClick={() => popFeaturedItems(item)}>
                <BiMinusCircle />
              </Button>
              <FeaturedItemPreview item={item} />
            </FormGroup>
          ))}

          <Heading>Video Links</Heading>
          {videoLinks?.map((link, index) => (
            <FormGroup key={`video-${index}`}>
              <Button
                margin="0 1rem"
                onClick={() => setVideoLinks(arrayRemove(videoLinks, index))}
              >
                <BiMinusCircle />
              </Button>
              <Input
                value={link}
                placeholder="Link"
                onChange={(e) =>
                  setVideoLinks(handleInputChange(e, videoLinks, index))
                }
              />
            </FormGroup>
          ))}
          <Flex margin="1rem 0" justify="center">
            <Button
              margin="0 1rem"
              onClick={() => setVideoLinks([...videoLinks, ""])}
              leftIcon={<StyledPlusIcon />}
            >
              Add
            </Button>
          </Flex>

          <Flex justify="center">
            <Button
              margin=".5rem 0"
              color="black"
              background="green.200"
              type="submit"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Container>
    </div>
  );
};

const ItemPreviewContainer = styled.div`
  display: flex;
  /* justify-content:space-between; */
  img {
    width: 15rem;
  }
  h4 {
    color: ${theme.accentMain};
    font-weight: 400;
    font-size: 1.2rem;
  }
`;

const FormGroup = styled.div``;
const SectionGroup = styled.div`
  margin: 1rem 0;
`;
const StyledFormLabel = styled(FormLabel)`
  text-transform: capitalize;
`;

const Heading = styled.h2`
  color: ${theme.accentMain};
  font-weight: 500;
  font-size: 2.5rem;
  text-align: center;
`;
const SectionLabel = styled.h3`
  color: ${theme.accentMain};
  font-weight: 400;
  font-size: 1.6rem;
  text-align: center;
`;

const StyledMinusIcon = styled(BiMinusCircle)`
  font-size: 1.4rem;
  margin-right: 0.2rem;
`;
const StyledPlusIcon = styled(BsPlusCircle)`
  font-size: 1.4rem;
  margin-right: 0.2rem;
`;

export const getServerSideProps = async (req, res) => {
  const {
    query: [method, id],
  } = req.query;

  return { props: { method, id: id ?? "" } };
};

export default CreateArticlePage;
