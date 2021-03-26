import Link from "next/link";
import styles from "@styles/Item.module.scss";

const Item = ({ item }) => {
  const { images, name, category } = item ?? {};
  return (
    <Link href={`/item/${item._id}`}>
      <div className={styles.item}>
        <img src={images ? images[0] : "https://via.placeholder.com/500"} />
        <div>
          <h4>{name}</h4>
          <p>{category}</p>
        </div>
      </div>
    </Link>
  );
};

export default Item;
