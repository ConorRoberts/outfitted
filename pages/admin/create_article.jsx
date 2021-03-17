import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import { Button, Input, FormLabel, Flex, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router";
import Article from "../../components/Article";
import Header from "../../components/Header";
import styles from "../../styles/Create_Article.module.scss";

const CREATE_ARTICLE = gql`
    mutation CreateArticle($articleInput:ArticleInput!){
        createArticle(articleInput:$articleInput){
            title
            body
            sections{
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
        image: ""
        // sectionTitle: "",
        // sectionBody: "",
        // sectionImage: ""
    });
    const [sections, setSections] = useState([]);
    const router = useRouter();

    const onSubmit = (formData) => {
        const { title, body, image } = formData;

        createArticle({ variables: { articleInput: { title, body, image, sections } } });
        router.push("/newsletter");
    }
    const onPreview = (formData) => {
        setPreview({ title: formData.title, body: formData.body, image: formData.image });
        // sectionTitle: formData.sectionTitle, sectionBody: formData.sectionBody, sectionImage: formData.sectionImage
    }

    const onSectionAdd = (sectionData) => {
        const { sectionTitle, sectionBody, sectionImage } = sectionData;
        setSections([...sections, { title: sectionTitle, body: sectionBody, image: sectionImage }]);
    }

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)}>

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
                        <Button className={styles.addSectionButton} onClick={handleSubmit(onSectionAdd)}>
                            Add Section
                         </Button>
                    </section>

                    <section className={styles.buttonContainer}>
                        <Button type="submit" backgroundColor="green.300">
                            Submit
                    </Button>
                        <Button onClick={handleSubmit(onPreview)}>
                            Preview
                     </Button>
                    </section>

                </form>
                <div className={styles.previewContainer}>
                    <Article title={preview.title} body={preview.body} sections={sections} />
                </div>
            </div>
        </div>
    );
};

export default CreateArticle;