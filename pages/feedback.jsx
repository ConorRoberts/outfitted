import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  FormLabel,
  Select,
  Radio,
  RadioGroup,
  Stack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { theme, breakpoints } from "../globalStyles";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const FIELDS = [
  {
    label: "Which week are you providing feedback for?",
    key: "weekNumber",
    type: "input",
  },
  {
    label:
      "What did you think of our outfit choice? give us some info on each piece we sent you and how you felt about it!",
    key: "outfitChoice",
    type: "input",
  },
  {
    label: "What did you think of the price range of our items this week?",
    key: "priceRange",
    options: ["Too Expensive", "Perfect", "Below My Taste/Means"],
    type: "select",
  },
  {
    label:
      "Did you purchase our top(shirt, sweater, hoodie, etc.) selection for you this week?",
    key: "topPurchased",
    type: "boolean",
  },
  {
    label:
      "Did you purchase our bottoms(pants, shorts) selection for you this week?",
    key: "bottomPurchased",
    type: "boolean",
  },
  {
    label: "Did you purchase our footwear selection for you this week?",
    key: "shoesPurchased",
    type: "boolean",
  },
  {
    label: "Did we pick the right style icon for you this week?",
    key: "wasGoodIcon",
    type: "boolean",
  },
  {
    label:
      "If you answered no, who or what kind of person would you have rather seen?",
    key: "iconFeedback",
    type: "input",
  },
  {
    label:
      "Did you buy any of the pieces we suggested from your weekly style icon?",
    key: "didPurchasedIconPiece",
    type: "boolean",
  },
  {
    label: "If you answered yes to the above question, what did you buy?",
    key: "iconPiecesPurchased",
    options: ["Coat/Outerwear", "Top", "Bottoms", "Footwear", "Accessories"],
    type: "checkboxes",
  },
  {
    label: "What did you think of our local pick for you?",
    key: "localFeedback",
    type: "input",
  },
  {
    label: "Did our local pick fit your style?",
    key: "goodLocalPick",
    type: "boolean",
  },
];

const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($createFeedbackInput: CreateFeedbackInput!) {
    createFeedback(createFeedbackInput: $createFeedbackInput) {
      weekNumber
    }
  }
`;

const Feedback = () => {
  const [session, loading] = useSession();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [createFeedback] = useMutation(CREATE_FEEDBACK);

  const onSubmit = (form) => {
    createFeedback({
      variables: {
        createFeedbackInput: {
          ...form,
          weekNumber: +form.weekNumber,
          creator: session?.user?.id,
        },
      },
    });
    router.push("/");
  };

  return (
    <Container>
      <Header title="Feedback" />
      <Title>Feedback</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {FIELDS.map(({ type, label, key, options = [] }) => {
          if (type === "input") {
            return (
              <FormGroup key={key}>
                <FormLabel>{label}</FormLabel>
                <Input required ref={register} name={key} />
              </FormGroup>
            );
          }

          if (type === "checkboxes") {
            return (
              <FormGroup key={key}>
                <FormLabel>{label}</FormLabel>
                <CheckboxGroup required>
                  <Stack>
                    {options.map((option, index) => (
                      <Checkbox
                        key={`${key}-${index}`}
                        ref={register}
                        name={key}
                        value={option}
                      >
                        {option}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormGroup>
            );
          }

          if (type === "select") {
            return (
              <FormGroup key={key}>
                <FormLabel>{label}</FormLabel>
                <Select required name={key} ref={register}>
                  {options.map((option, index) => (
                    <option key={`${key}-${index}`} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            );
          }

          if (type === "boolean") {
            return (
              <FormGroup key={key}>
                <FormLabel>{label}</FormLabel>
                <RadioGroup required ref={register} name={key}>
                  <Stack padding="1rem">
                    <Radio value={"yes"}>Yes</Radio>
                    <Radio value={"no"}>No</Radio>
                  </Stack>
                </RadioGroup>
              </FormGroup>
            );
          }
        })}
        <ButtonContainer>
          <Button background="green.200" color="black" type="submit">
            Submit
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.accentMain};
  font-weight: 500;
  text-align: center;
  font-family: "Roboto";
`;

const FormGroup = styled.div`
  margin: 1rem 0;
  font-family: "Roboto";
`;

const Container = styled.div`
  /* background: ${theme.bgMain}; */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  color: white;
  min-height: 100vh;
  font-size: 2rem;
  margin: 1rem 5vw;

  @media ${breakpoints.S} {
    margin: 1rem 15vw;
  }
  @media ${breakpoints.M} {
    margin: 1rem 25vw;
  }
  @media ${breakpoints.L} {
    margin: 1rem 30vw;
  }
`;

export default Feedback;
