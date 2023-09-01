import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


import { mockedProducts } from "../mockedList";
import AddtoCartButton from "../components/AddtoCartButton";
import { useCounterContext } from "../CounterProvider";

export default function IndexPage() {
  const {Count} = useCounterContext();
 

  return (
    <div className="flex flex-col items-center">
      <h1>SKORPA</h1>
      <ul>
        {mockedProducts.map((product) => (
          <div key={product.id} data-cy="product" className="flex flex-1 flex-col my-0">
            <NavLink className="flex flex-1 flex-col"
              to={`/product/${String(product.id)}`}
              
            >
              <h1 className="text-2xl flex-1">{product.title}</h1>
              <img src={product.image} alt="En katt" className="h-20 w-30"/>
            </NavLink>
            <div data-cy="cart-items-count-badge">
          <div data-cy="product-buy-button" className="flex-1">
            <AddtoCartButton product={product} />
          </div>
        </div>
         
          </div>
        ))}
      </ul>
    </div>
  );
}
