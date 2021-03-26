import React, { useState } from "react";
import styles from "@styles/UserPreview.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import ItemPreview from "@components/ItemPreview";
import { Select, Button } from "@chakra-ui/react";
import useAllItems from "@utils/useAllItems";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import Link from "next/link";

const Item = ({ item }) => {
  const { images, name, category } = item ?? {};
  return (
    <Link href={`/item/${item._id}`}>
      <div className={styles.item}>
        <img src={images[0]} />
        <div>
          <h4>{name}</h4>
          <p>{category}</p>
        </div>
      </div>
    </Link>
  );
};

const UserPreview = ({ user }) => {
  const {
    _user: { name, image, email },
    _id,
    likes,
    gender,
    build,
    height,
    birthday,
    shoeSize,
    favBrands,
    sustainable,
    fit,
    favColours,
    pantsSize,
    sweaterSize,
    shirtSize,
    styleIcons,
    favInfluencers,
    recommendations,
  } = user ?? {};

  const itemList = useAllItems();

  const addRecommendation = () => null;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} />
      </div>
      <h2>{name}</h2>
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
              <Td>{name}</Td>
            </Tr>
            <Tr>
              <Td>Email</Td>
              <Td>{email}</Td>
            </Tr>
            <Tr>
              <Td>Birthday</Td>
              <Td>{new Date(birthday).toLocaleDateString()}</Td>
            </Tr>
            <Tr>
              <Td>Age</Td>
              <Td>
                {new Date().getFullYear() - new Date(birthday).getFullYear()}
              </Td>
            </Tr>
            <Tr>
              <Td>Gender</Td>
              <Td>{gender}</Td>
            </Tr>
            <Tr>
              <Td>Height</Td>
              <Td>{height}</Td>
            </Tr>
            <Tr>
              <Td>Build</Td>
              <Td>{build}</Td>
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
              <Td>{pantsSize}</Td>
            </Tr>
            <Tr>
              <Td>Shirt</Td>
              <Td>{shirtSize}</Td>
            </Tr>
            <Tr>
              <Td>Sweater</Td>
              <Td>{sweaterSize}</Td>
            </Tr>
            <Tr>
              <Td>Shoe</Td>
              <Td>{shoeSize}</Td>
            </Tr>
            <Tr>
              <Td>Preferred Fit</Td>
              <Td>{fit}</Td>
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
              <Td>{favColours.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td>Influencers</Td>
              <Td>{favInfluencers.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td>Brands</Td>
              <Td>{favBrands.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td>Style Icons</Td>
              <Td>{styleIcons.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td>Value Sustainability</Td>
              <Td>{sustainable}</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>

      <p>
        <span className={styles.label}>Likes: </span>
      </p>
      <div className={styles.itemList}>
        {likes?.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
      <p>
        <span className={styles.label}>Previous Recommendations: </span>
      </p>
      <div className={styles.itemList}>
        {likes?.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
      <div className={styles.selectContainer}>
        {itemList && (
          <>
            <Select>
              <option value="None">None</option>
              {itemList?.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
            <Button onClick={() => addRecommendation()}>
              Submit Recommendation
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPreview;
