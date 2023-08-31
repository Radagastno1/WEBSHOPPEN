import React from "react";
import { mockedProducts } from "../mockedList";
import { Products } from "../interfaces";

export default function CartPage (){
  {
    return (
      <ul  className="flex flex-1 flex-col items-center w-80 bg-slate-300 rounded">
        {mockedProducts.map((product) => (
          <li key={product.id} data-cy={`product-${product.id}`}>
            <strong>ID:</strong> {product.id}, <strong>Title:</strong> {product.title}, <strong>Price:</strong> {product.price}
          </li>
        ))}
      </ul>
    );
  }
}

