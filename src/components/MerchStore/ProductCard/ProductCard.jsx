

import styles from "./ProductCard.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function ProductCard({ product }) {
  const [addedToCart, setAddedToCart] = useState(false);

  /*const dispatch = useDispatch();
  const cart = useSelector((state) => state);

  const handleAddToCart = (product) => {
    setAddedToCart(true);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };*/

  const isOutOfStock = product.stock === 0;

  const cardClassName = isOutOfStock
    ? `${styles["product-card"]} ${styles["product-card--out-of-stock"]}`
    : addedToCart
      ? `${styles["product-card"]} ${styles["product-card--added-to-cart"]}`
      : styles["product-card"];

  return (
    <a href={`/product/${product._id}`} className={cardClassName}>
      {product?.image && (
        <div className={styles["product-card__image-wrapper"]}>
          <img
            //src={urlFor(product.image).url()}
            alt={product.name ?? "Product image"}
            className={styles["product-card__image"]}
          />
        </div>
      )}

      <div className={styles["product-card__body"]}>
        <h2 className={styles["product-card__title"]}>{product.name}</h2>
        {isOutOfStock && (
          <span className={styles["product-card__stock-badge"]}>
            Out of stock
          </span>
        )}
        {product.description && (
          <p className={styles["product-card__description"]}>
            {product.description}
          </p>
        )}

        <div className={styles["product-card__footer"]}>
          <span className={styles["product-card__price"]}>
            {product.price ? `$${product.price}` : "—"}
          </span>
          {/*<button
            className={styles["product-card__add-to-cart-button"]}
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(product);
            }}
            // disabled={isOutOfStock || addedToCart}
          >
            {addedToCart ? "Added" : "Add to Cart"}
          </button>
*/}
          <span className={styles["product-card__arrow"]}>Ver →</span>
        </div>
      </div>
    </a>
  );
}
