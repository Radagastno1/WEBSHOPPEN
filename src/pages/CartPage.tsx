import { useCart } from "../CartContext";

export default function CartPage() {
  const { cart, totalPrice } = useCart();

  return (
    <div className="flex flex-1 flex-col items-center">
      <ul>
        {cart.map((product) => (
          <li key={product.id} data-cy="cart-item" className="product-item">
            <div
              className="product-info"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className="product-title" style={{ marginRight: "75px" }}>
                {product.title}
              </div>
              <div className="product-price">
                <strong>Pris:</strong> {product.price}
              </div>
              <img src={product.image} alt="produkt" className="w-5 h-5" />
            </div>
          </li>
        ))}
      </ul>
      <p>Totalt pris: {totalPrice}</p>
    </div>
  );
}
