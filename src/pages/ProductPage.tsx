import React from "react";
import { mockedProducts } from "../mockedList";
import { useParams } from "react-router-dom";
import AddtoCartButton from "./AddtoCartButton";

export default function ProductPage() {
  const { id } = useParams();
  const selectedProduct = mockedProducts.find((product) => String(product.id) === id);

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div data-cy="product-id">
      <h2 data-cy="product-title">{selectedProduct.title}</h2>
      <p data-cy="product-description">{selectedProduct.description}</p>
      <p data-cy="product-price">Price: {selectedProduct.price}</p>
      <AddtoCartButton product={selectedProduct} />
    </div>
  );
}








