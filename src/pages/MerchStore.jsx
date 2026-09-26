import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/MerchStore/ProductCard/ProductCard";
import products from "../mock/mockProducts";


const fakeProducts = [
  {
    _id: "string",
    name: "string",
    description: "string",
    price: 0,
    image: undefined,
    stock: 0,
  },
];

export default function MerchStore()  {
  return (
    
      
      <div>
        <h1>Merch Store</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {products.map((product) => (
          <a href={`/#/merch-store/${product.slug}`}>
          <div key={product.id} style={{ border: "2px solid #92d1e2", padding: "8px", borderRadiuss: "8px" }}>
            <h2>{product.name}</h2>
            
            <p>${product.price.toFixed(2)}</p>
            <img src={product.image} alt={product.name} />
          </div>
          </a>
        ))}
      </div>

      
      </div >
      );
}
