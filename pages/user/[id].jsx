import Header from "@components/Header";
import { useRouter } from "next/router";
import useAdminStatus from "@utils/useAdminStatus";
import Loading from "@components/Loading";
import React, { useState } from "react";
import Item from "@components/Item";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { useMutation, gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import useAllItems from "@utils/useAllItems";
import ItemPreviewCard from "@components/ItemPreviewCard";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Input,
  Select,
  FormLabel,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";
import Container from "@components/Container";

const RECOMMEND_ITEM = gql`
  mutation Recommend($recommendationInput: RecommendationInput!) {
    createRecommendation(recommendationInput: $recommendationInput) {
      _id
    }
  }
`;

const GET_USER_SETTINGS = gql`
  query GetUserSettings($id: String!) {
    settings(id: $id) {
      _id
      _user {
        _id
        name
        email
        image
      }
      likes {
        _id
        name
        description
        images
        category
      }
      gender
      build
      height
      birthday
      shoeSize
      favBrands
      sustainable
      fit
      favColours
      pantsSize
      sweaterSize
      shirtSize
      styleIcons
      favInfluencers
      recommendations {
        _id
        timeLive
        timeRecommended
        body
        item {
          _id
          name
          description
          images
          category
        }
      }
    }
  }
`;

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const admin = useAdminStatus();

  const [recommendItem] = useMutation(RECOMMEND_ITEM);
  const { data, refetch } = useQuery(GET_USER_SETTINGS, {
    variables: { id: `${id}` },
  });

  const [itemFilter, setItemFilter] = useState("");
  const itemList = useAllItems();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      item: "None",
    },
  });

  const onSubmit = ({ item, timeLive, body }) => {
    recommendItem({
      variables: {
        recommendationInput: {
          user: id,
          item: item,
          timeLive: timeLive,
          timeRecommended: new Date().toISOString(),
          body: body,
        },
      },
    });

    refetch();
  };

  if (!admin || !data.settings) return <Loading />;

  return (
    <div>
      <Header title={data.settings?._user?.name ?? "User"} />
      <Container>
        <Flex align="center" direction="column">
          <img src={data.settings?._user?.image} />
          <h2>{data.settings?._user?.name}</h2>
        </Flex>
        <Table variant="simple">
          <TableCaption placement="top">User Data</TableCaption>
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Name</Td>
              <Td>{data.settings?._user?.name}</Td>
            </Tr>
            <Tr>
              <Td>Email</Td>
              <Td>{data.settings?._user?.email}</Td>
            </Tr>
            <Tr>
              <Td>Birthday</Td>
              <Td>{new Date(data.settings?.birthday).toLocaleDateString()}</Td>
            </Tr>
            <Tr>
              <Td>Age</Td>
              <Td>
                {`${
                  new Date().getFullYear() -
                  new Date(data.settings?.birthday).getFullYear()
                }`}
              </Td>
            </Tr>
            <Tr>
              <Td>Gender</Td>
              <Td>{data.settings?.gender}</Td>
            </Tr>
            <Tr>
              <Td>Height</Td>
              <Td>{`${Math.round(data.settings?.height / 12)}ft ${
                data.settings?.height % 12
              }in`}</Td>
            </Tr>
            <Tr>
              <Td>Build</Td>
              <Td>{data.settings?.build}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Table>
          <TableCaption placement="top">Sizes</TableCaption>
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Pants</Td>
              <Td>{data.settings?.pantsSize}</Td>
            </Tr>
            <Tr>
              <Td>Shirt</Td>
              <Td>{data.settings?.shirtSize}</Td>
            </Tr>
            <Tr>
              <Td>Sweater</Td>
              <Td>{data.settings?.sweaterSize}</Td>
            </Tr>
            <Tr>
              <Td>Shoe</Td>
              <Td>{`${data.settings?.shoeSize}`}</Td>
            </Tr>
            <Tr>
              <Td>Preferred Fit</Td>
              <Td>{data.settings?.fit}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Table>
          <TableCaption placement="top">Personal Taste</TableCaption>
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Colours</Td>
              <Td>{data.settings?.favColours?.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td>Influencers</Td>
              <Td>{data.settings?.favInfluencers?.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td>Brands</Td>
              <Td>{data.settings?.favBrands?.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td>Style Icons</Td>
              <Td>{data.settings?.styleIcons?.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td>Value Sustainability</Td>
              <Td>{data.settings?.sustainable}</Td>
            </Tr>
          </Tbody>
        </Table>

        {data.settings?.likes?.length > 0 && (
          <>
            <SectionHeader>Likes:</SectionHeader>
            <div>
              {data.settings?.likes?.map((item) => (
                <Item key={`likes-${item._id}`} item={item} />
              ))}
            </div>
          </>
        )}
        <SectionHeader>Recommendations:</SectionHeader>
        <Flex wrap="wrap" gridGap="5" justify="center">
          {data.settings?.recommendations?.map(({ item }) => (
            <ItemPreviewCard key={`recommend-${item._id}`} {...item} />
          ))}
        </Flex>
        <SectionHeader>Create Recommendation</SectionHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Divider />
            <FormLabel marginTop="0.5rem">Item Filter</FormLabel>
            <Input
              onChange={(e) => setItemFilter(e.target.value)}
              value={itemFilter}
              marginBottom="0.5rem"
            />
            <Divider />
            <FormLabel>Body</FormLabel>
            <Input ref={register} name="body" />
            <FormLabel>Item</FormLabel>
            <Select ref={register} name="item">
              <option value="None">None</option>
              {itemList &&
                itemList
                  ?.filter((item) => {
                    const name = item.name.toLowerCase();
                    const category = item.category.toLowerCase();
                    const filterText = itemFilter.toLowerCase();
                    return (
                      name.includes(filterText) || category.includes(filterText)
                    );
                  })
                  .map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
            </Select>
            {watch("item") !== "None" && (
              <ItemPreviewCard
                {...(itemList?.find(({ _id }) => _id === watch("item")) ?? {})}
              />
            )}
            <FormLabel>When should we show this?</FormLabel>
            <Input required type="date" name="timeLive" ref={register} />
            <Flex justify="center">
              <Button type="submit">Submit</Button>
            </Flex>
          </form>
        </div>
      </Container>
    </div>
  );
};

const SectionHeader = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;

export default UserPage;
