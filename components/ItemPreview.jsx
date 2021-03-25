import React from "react";
import styles from "@styles/ItemPreview.module.scss";
import { FaHeart } from "react-icons/fa";

const ItemPreview = ({ item }) => {
  const {
    name = "Item Name",
    description = "Item Description",
    images = [],
    link,
  } = item ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <a href={link}>
        <img src={`${(images && images[0]) ?? "https://via.placeholder.com/500"}`} />
        </a>
      </div>
      <div className={styles.textContainer}>
        <h4 className={styles.title}>{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ItemPreview;
