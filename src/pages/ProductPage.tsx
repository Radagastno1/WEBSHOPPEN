import React from "react";
import { mockedProducts } from "../mockedList";
import { useParams } from "react-router-dom";
import AddtoCartButton from "./AddtoCartButton";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>(); // Använd generic för typen av id
  const selectedProduct = mockedProducts.find((product) => String(product.id) === id);

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <div data-cy="product-id">
        <h2 data-cy="product-title">{selectedProduct.title}</h2>
        <p data-cy="product-description">{selectedProduct.description}</p>
        <p data-cy="product-price">Price: {selectedProduct.price}</p>
        <AddtoCartButton product={selectedProduct} />
      </div>
      <img
        src={selectedProduct.image}
        alt={selectedProduct.title}
        className="mt-4 w-32 h-auto"
      />
    </div>
  );
}









