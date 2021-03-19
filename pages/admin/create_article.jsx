import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  FormLabel,
  Flex,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Article from "../../components/Article";
import ArticlePreview from "../../components/ArticlePreview";
import Header from "../../components/Header";
import styles from "../../styles/Create_Article.module.scss";
import Head from "next/head";
import { useSession } from 'next-auth/client'

const CREATE_ARTICLE = gql`
  mutation CreateArticle($articleInput: ArticleInput!) {
    createArticle(articleInput: $articleInput) {
      title
      body
      author
      sections {
        title
        body
        image
      }
    }
  }
`;

const CreateArticle = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [createArticle, { data }] = useMutation(CREATE_ARTICLE);
  const [preview, setPreview] = useState({
    title: "",
    body: "",
    image: "",
    author:"",
    sections: [],
  });
  const [sections, setSections] = useState([]);
  const router = useRouter();
    const [session, loading] = useSession();

  // Event on form submit
  const onSubmit = (formData) => {
    const { title, body, image } = formData;

    createArticle({
      variables: { articleInput: { title, body, image,author:session.user.name, sections } },
    });
    router.push("/newsletter");
  };

  // Event on form preview
  const onPreview = (formData) => {
    setPreview({
      title: formData.title,
      body: formData.body,
      image: formData.image,
      author:session.user.name,
      sections: sections,
    });
  };

  // Event on section add
  const onSectionAdd = (sectionData) => {
    const { sectionTitle, sectionBody, sectionImage } = sectionData;
    setSections([
      ...sections,
      { title: sectionTitle, body: sectionBody, image: sectionImage },
    ]);
  };

  return (
    <div>
      <Head>
        <title>Create an Article</title>
        <link rel="icon" type="image/png" href="/logo.jpg"/>
      </Head>
      <Header />
      <div className={styles.container}>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.headerSection}>
            <h3 className={styles.title}>Header</h3>
            <FormLabel>Title</FormLabel>
            <Input name="title" ref={register} />
            <FormLabel>Body</FormLabel>
            <Textarea name="body" ref={register} />
            <FormLabel>Image</FormLabel>
            <Input name="image" ref={register} />
          </section>

          <section className={styles.formSection}>
            <h3 className={styles.title}>Sections</h3>
            <FormLabel>Section Title</FormLabel>
            <Input name="sectionTitle" ref={register} />
            <FormLabel>Section Body</FormLabel>
            <Textarea name="sectionBody" ref={register} />
            <FormLabel>Section Image</FormLabel>
            <Input name="sectionImage" ref={register} />
            <Button
              className={styles.addSectionButton}
              onClick={handleSubmit(onSectionAdd)}
            >
              Add Section
            </Button>
          </section>

          <section className={styles.buttonContainer}>
            <Button type="submit" backgroundColor="green.300">
              Submit
            </Button>
            <Button onClick={handleSubmit(onPreview)}>Preview</Button>
          </section>
        </form>
        <Divider className={styles.divider}/>
        <div className={styles.previewContainer}>
          <ArticlePreview
            article={preview}
          />
          <Article
            article={preview}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
