import { mockedProducts } from "../mockedList";
import { NavLink } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="flex flex-col">
      <h1>SKORPA</h1>

      <ul>
        {mockedProducts.map((product) => (
          <NavLink key={product.id} to={`product/${String(product.id)}`}>
            {product.title}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
