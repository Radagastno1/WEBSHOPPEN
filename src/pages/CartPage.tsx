import { useCart } from "../CartContext";
import TableMUI from "../components/TableMUIComponent";

export default function CartPage() {
  const { cart, totalPrice } = useCart();

  const titleRows = [
    "Titel",
    "Antal",
    "Pris",
    "ProduktBild",
  ];

  interface ProductRow {
    0: JSX.Element;
    1: JSX.Element;
    2: JSX.Element;
    3: JSX.Element; // bilden
  }

    let productRows: ProductRow[] = [];

      productRows = cart.map((p) => [
        <span data-cy="product-title">{p.title}</span>,
       <span data-cy="product-price">{ p.price} kr</span>,
       <span data-cy="product-quantity">{p.quantity} st</span>,
        <img src={p.image} alt="Product" className="h-10 w-10"/>,
      ]);


    


  return (
    <div className="flex flex-1 flex-col items-center">
            <TableMUI titleRow={titleRows} cellRows={productRows} />
      <p>Totalt pris:</p>
      <p data-cy="total-price"> {totalPrice}</p>
    </div>
  );
}
