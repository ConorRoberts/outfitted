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
import { BsPlus, BsPlusCircle } from "react-icons/bs";
import Header from "@components/Header";
import useAdminStatus from "@utils/useAdminStatus";
import Loading from "@components/Loading";
import Container from "@components/Container";
import styled from "styled-components";
import { theme, breakpoints } from "../../../globalStyles";

const UPDATE_ARTICLE = gql`
  mutation updateArticle($id: String!, $article: UpdateArticleInput!) {
    updateArticle(id: $id, updateArticleInput: $article) {
      _id
    }
  }
`;

const CREATE_ARTICLE = gql`
  mutation createArticle($article: ArticleInput!) {
    createArticle(articleInput: $article) {
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

const UpdateItemPage = ({ method, id }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    body: "",
    image: "",
    author: "",
  });
  const [sections, setSections] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);

  const [getArticle, { data, loading }] = useLazyQuery(GET_ARTICLE);
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
      setSections(article.sections);
    }
  }, [data]);

  /**
   * onChange event handler for most of the form inputs
   * @param {*} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSectionChange = (e, index) => {
    const { name, value } = e.target;
    let tmp = [...sections];

    tmp[index] = { ...tmp[index], [name]: value };

    setSections([...tmp]);
  };

  const shrinkSections = () => {
    const tmp = [...sections];
    tmp.pop();
    setSections([...tmp]);
  };
  const growSections = () => {
    const tmp = [...sections];
    tmp.push({ title: "Title", body: "Body", image: "Image" });
    setSections([...tmp]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = { ...form, sections, featuredItems };
    if (method === "edit") {
      updateArticle({
        variables: { id: id, article: article },
      });
    } else if (method === "new") {
      createArticle({
        variables: { article: article },
      });
    }
    router.push("/articles");
  };

  if (!admin) return <Loading />;

  return (
    <div>
      <Header title="Create Article" />
      <Container>
        <form onSubmit={handleSubmit}>
          <Heading>Head</Heading>
          {Object.entries(form).map(([key, val]) => {
            return (
              <FormGroup key={key}>
                <StyledFormLabel>{key}</StyledFormLabel>
                <Input
                  required
                  name={key}
                  value={val}
                  onChange={handleChange}
                />
              </FormGroup>
            );
          })}

          <Heading>Sections</Heading>
          {sections.map(({ title, body, image }, index) => {
            const key = `Section ${index + 1}`;

            return (
              <FormGroup key={key}>
                <SectionLabel>{key}</SectionLabel>
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
              </FormGroup>
            );
          })}

          <Flex margin="1rem 0" justify="center">
            <Button margin="0 1rem" onClick={growSections}>
              <BsPlusCircle />
            </Button>
            <Button margin="0 1rem" onClick={shrinkSections}>
              Remove
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

const FormGroup = styled.div``;
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

export const getServerSideProps = async (req, res) => {
  const {
    query: [method, id],
  } = req.query;

  return { props: { method, id } };
};

export default UpdateItemPage;
