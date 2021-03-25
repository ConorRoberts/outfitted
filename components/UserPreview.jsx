import React, { useState } from "react";
import styles from "@styles/UserPreview.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import ItemPreview from "@components/ItemPreview";

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
  } = user ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.imageContainer}>
            <img src={image} />
          </div>
          <div>
            <p>
              <span className={styles.label}>Name: </span>
              {name}
            </p>
            <p>
              <span className={styles.label}>Email: </span>
              {email}
            </p>
            <p>
              <span className={styles.label}>Birthday: </span>
              {new Date(birthday).toLocaleDateString()} (
              {new Date().getFullYear() - new Date(birthday).getFullYear()}{" "}
              years)
            </p>
            <p>
              <span className={styles.label}>Gender: </span>
              {gender}
            </p>
          </div>
        </div>
        <div className={styles.plusContainer}>
          <AiOutlinePlus />
        </div>
      </div>
      <div className={styles.detailed}>
        <p>
          <span className={styles.label}>Height: </span>
          {height}
        </p>
        <p>
          <span className={styles.label}>Build: </span>
          {build}
        </p>
        <p>
          <span className={styles.label}>Favourite Colours: </span>
          {favColours.join(", ")}
        </p>
        <p>
          <span className={styles.label}>Favourite Influencers: </span>
          {favInfluencers.join(", ")}
        </p>
        <p>
          <span className={styles.label}>Favourite Brands: </span>
          {favBrands.join(", ")}
        </p>
        <p>
          <span className={styles.label}>Shoe Size: </span>
          {shoeSize}
        </p>
        <p>
          <span className={styles.label}>Pants Size: </span>
          {pantsSize}
        </p>
        <p>
          <span className={styles.label}>Sweater Size: </span>
          {sweaterSize}
        </p>
        <p>
          <span className={styles.label}>Shirt Size: </span>
          {shirtSize}
        </p>
        <p>
          <span className={styles.label}>Shirt Size: </span>
          {styleIcons.join(", ")}
        </p>
        <p>
          <span className={styles.label}>Preferred Fit: </span>
          {fit}
        </p>
        <p>
          <span className={styles.label}>Prefer Sustainable: </span>
          {sustainable}
        </p>
        <p>
          <span className={styles.label}>Likes: </span>
        </p>
        <div className={styles.likes}>
          {likes?.map((item) => (
            <div key={item._id} className={styles.likedItem}>
              <ItemPreview item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPreview;
