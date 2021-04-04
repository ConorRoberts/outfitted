import Header from "@components/Header";
import { useRouter } from "next/router";
import useUserSettings from "@utils/useUserSettings";
import useAdminStatus from "@utils/useAdminStatus";
import Loading from "@components/Loading";
import React, { useState } from "react";
import styles from "@styles/UserPage.module.scss";
import Item from "@components/Item";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import useAllItems from "@utils/useAllItems";
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
} from "@chakra-ui/react";

const RECOMMEND_ITEM = gql`
  mutation Recommend($recommendationInput: RecommendationInput!) {
    createRecommendation(recommendationInput: $recommendationInput) {
      _id
    }
  }
`;

const UserPage = () => {
  const [recommendItem] = useMutation(RECOMMEND_ITEM);

  const itemList = useAllItems();

  const router = useRouter();
  const { id } = router.query;
  const settings = useUserSettings(id);
  const admin = useAdminStatus();

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
  };

  if (!admin) return <Loading />;

  return (
    <div>
      <Header title={settings?._user?.name ?? "User"} />
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={settings?._user?.image} />
        </div>
        <h2>{settings?._user?.name}</h2>
        <div className={styles.tables}>
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
                <Td>{settings?._user?.name}</Td>
              </Tr>
              <Tr>
                <Td>Email</Td>
                <Td>{settings?._user?.email}</Td>
              </Tr>
              <Tr>
                <Td>Birthday</Td>
                <Td>{new Date(settings?.birthday).toLocaleDateString()}</Td>
              </Tr>
              <Tr>
                <Td>Age</Td>
                <Td>
                  {`${
                    new Date().getFullYear() -
                    new Date(settings?.birthday).getFullYear()
                  }`}
                </Td>
              </Tr>
              <Tr>
                <Td>Gender</Td>
                <Td>{settings?.gender}</Td>
              </Tr>
              <Tr>
                <Td>Height</Td>
                <Td>{`${Math.round(settings?.height / 12)}ft ${
                  settings?.height % 12
                }in`}</Td>
              </Tr>
              <Tr>
                <Td>Build</Td>
                <Td>{settings?.build}</Td>
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
                <Td>{settings?.pantsSize}</Td>
              </Tr>
              <Tr>
                <Td>Shirt</Td>
                <Td>{settings?.shirtSize}</Td>
              </Tr>
              <Tr>
                <Td>Sweater</Td>
                <Td>{settings?.sweaterSize}</Td>
              </Tr>
              <Tr>
                <Td>Shoe</Td>
                <Td>{`${settings?.shoeSize}`}</Td>
              </Tr>
              <Tr>
                <Td>Preferred Fit</Td>
                <Td>{settings?.fit}</Td>
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
                <Td>{settings?.favColours.join(", ")}</Td>
              </Tr>
              <Tr>
                <Td>Influencers</Td>
                <Td>{settings?.favInfluencers.join(", ")}</Td>
              </Tr>
              <Tr>
                <Td>Brands</Td>
                <Td>{settings?.favBrands.join(", ")}</Td>
              </Tr>
              <Tr>
                <Td>Style Icons</Td>
                <Td>{settings?.styleIcons.join(", ")}</Td>
              </Tr>
              <Tr>
                <Td>Value Sustainability</Td>
                <Td>{settings?.sustainable}</Td>
              </Tr>
            </Tbody>
          </Table>
        </div>

        <p>
          <span className={styles.label}>Likes: </span>
        </p>
        <div className={styles.itemList}>
          {settings?.likes?.map((item) => (
            <Item key={`likes-${item._id}`} item={item} />
          ))}
        </div>
        <p>
          <span className={styles.label}>Recommendations: </span>
        </p>
        <div className={styles.itemList}>
          {settings?.recommendations?.map(({ item }) => (
            <Item key={`recommend-${item._id}`} item={item} />
          ))}
        </div>
        <h3>Create Recommendation</h3>
        <div className={styles.selectContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>Body</FormLabel>
            <Input ref={register} name="body" />
            <FormLabel>Item</FormLabel>
            <Select ref={register} name="item">
              <option value="None">None</option>
              {itemList &&
                itemList?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </Select>
            {watch("item") !== "None" && (
              <Item
                item={itemList?.find(({ _id }) => _id === watch("item")) ?? {}}
              />
            )}
            <FormLabel>When should we show this?</FormLabel>
            <Input required type="date" name="timeLive" ref={register} />
            <Flex justify="center">
              <Button type="submit">Submit</Button>
            </Flex>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
