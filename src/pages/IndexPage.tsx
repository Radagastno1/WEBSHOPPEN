import { useEffect } from "react";
import { mockedProducts } from "../mockedList";
import { NavLink } from "react-router-dom";
import { addProductToLS } from "../localstorage";

export default function IndexPage() {
  const saveProductsToLocalStorage = () => {
    mockedProducts.forEach((product) => {
      addProductToLS(product);
    });
  };

  useEffect(() => {
    saveProductsToLocalStorage();
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
