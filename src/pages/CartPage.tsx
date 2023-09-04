import { useCart } from "../CartContext";
import TableMUI from "../components/TableMUIComponent";
import { Button } from "@mui/material";

export default function CartPage() {
  const { cart, totalPrice, addToCart, removeFromCart } = useCart();

  const titleRows = [
    "Titel",
    "Pris",
    "Antal",
    "Produktbild",
    "Ändra Antal"
  ];

  interface ProductRow {
    0: JSX.Element;
    1: JSX.Element;
    2: JSX.Element;
    3: JSX.Element; // bilden
    4: JSX.Element;
  }

    let productRows: ProductRow[] = [];

      productRows = cart.map((p) => [
        <span data-cy="product-title">{p.title}</span>,
       <span data-cy="product-price">{ p.price * p.quantity} kr</span>,
       <span data-cy="product-quantity">{p.quantity} st</span>,
       <span>
         <img src={p.image} alt="Product" className="h-20 w-20"/> 
          </span>,
        <span>
          <Button onClick={() => addToCart(p)} data-cy="increase-quantity-button">+</Button>
        <Button onClick={() => removeFromCart(p)} data-cy="decrease-quantity-button">-</Button>
        </span>
        
      ]);
  return ( 
 
    <div className="flex flex-1 flex-col items-center">
      {productRows.length > 0 ? (
        <div>
<TableMUI titleRow={titleRows} cellRows={productRows} />
      <p data-cy="total-price">  <p>Totalt pris:</p> {totalPrice}</p> 
        </div>
      
      ) : (<p>Tomt i plånkan?</p>) }
            
      
    </div>
  );
}
