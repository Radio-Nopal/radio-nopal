import react from "react";
import { useParams } from "react-router-dom";
import products from "../mock/mockProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <img src={product.image} alt={product.name} />
     
      <button type="button">Buy</button>
    </div>
  );
}
