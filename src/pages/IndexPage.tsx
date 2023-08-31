import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { addProductToLS } from "../localstorage";
import { mockedProducts } from "../mockedList";
import AddtoCartButton from "./AddtoCartButton";
import { Products } from "../interfaces";

export default function IndexPage() {
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  useEffect(() => {
    mockedProducts.forEach((product) => {
      addProductToLS(product);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <h1>SKORPA</h1>

      <ul>
        {mockedProducts.map((product) => (
          <div key={product.id}>
            <NavLink
              to={`/product/${String(product.id)}`}
              data-cy="product"
              onClick={() => setSelectedProduct(product)}
            >
              {product.title}
            </NavLink>
            <AddtoCartButton product={product} />
          </div>
        ))}
      </ul>
    </div>
  );
}
