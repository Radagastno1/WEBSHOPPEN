import React, { useState } from "react";
import { addProductToCart } from "../localstorage";
import { Products } from "../mockedList";

interface Props {
  product: Products; 
}

const AddtoCartButton: React.FC<Props> = ({ product }) => {
  const [productAddedToCart, setProductAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (!productAddedToCart) {
      addProductToCart(product);
      setProductAddedToCart(true);
      console.log("Produkt tillagd i kundvagnen");
    }
  };

  return (
    <a
      data-cy="product-buy-button"
      onClick={handleAddToCart}
      className={`bg-blue-500 border border-black rounded h-12 w-32 text-white ${
        productAddedToCart ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {productAddedToCart ? "Tillagd i kundvagn" : "Lägg till i kundvagn"}
    </a>
  );
};

export default AddtoCartButton;











    






 
