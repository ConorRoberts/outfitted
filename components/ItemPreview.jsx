import React from "react";
import styles from "../styles/ItemPreview.module.scss";

const ItemPreview = ({ item }) => {
  const { name = "Item Name", description = "Item Description", images = [] } =
    item ?? {};
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={images[0]} />
      </div>
      <div className={styles.textContainer}>
        <h4 className={styles.title}>{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ItemPreview;
