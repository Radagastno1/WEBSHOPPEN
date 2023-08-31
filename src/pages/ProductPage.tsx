import React from "react";
import { mockedProducts } from "../mockedList";
import { useParams } from "react-router-dom";
import AddtoCartButton from "./AddtoCartButton";

interface CartItem {
  id: string;
  quantity: number;
}

function getCartItemsFromLocalStorage(): CartItem[] {
  const cartItemsJSON = localStorage.getItem("cartItems");
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const selectedProduct = mockedProducts.find((product) => String(product.id) === id);

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  const cartItems = getCartItemsFromLocalStorage();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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











