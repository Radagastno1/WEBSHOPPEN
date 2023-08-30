import React, { useEffect } from "react";
import { mockedProducts } from "../mockedList";
import { NavLink } from "react-router-dom";
import { addProductToLS } from "../localstorage";

export default function IndexPage() {
  useEffect(() => {
    // Endast kör detta när komponenten monteras för första gången
    mockedProducts.forEach((product) => {
      addProductToLS(product);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <h1>SKORPA</h1>

      <ul>
        {mockedProducts.map((product) => (
          <NavLink
            key={product.id}
            to={`/product/${String(product.id)}`}
            data-cy="product"
          >
            {product.title}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

