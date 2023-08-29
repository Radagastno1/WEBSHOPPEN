import { mockedProducts } from "../mockedList";
import { parsePath, useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();

  
  const selectedProduct = mockedProducts.find(product => String(product.id) == id );

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div data-cy="product-id">
      <h2>{selectedProduct.title}</h2>
      <p>{selectedProduct.description}</p>
      <p>Price: {selectedProduct.price}</p>
    </div>
  );
}


