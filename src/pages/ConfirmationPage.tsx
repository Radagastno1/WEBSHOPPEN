import { useEffect, useRef, useState } from "react";
import { useCustomerContext } from "../CustomerContext";
import { Cart, Order } from "../interfaces";
import TableMUI from "../components/TableMUI";

import {
  generateNewOrderToLS,
  getCartFromLocalStorage,
  getOrderFromLS,
  removeCartFromLocalstorage,
} from "../localstorage";

function generateRandomNumber() {
  const randomNumbers = Math.floor(Math.random() * 9000) + 1000;

  const timestamp = new Date().getTime();
  const last6Digits = timestamp.toString().slice(-6);

  const orderNumber = `${last6Digits}-${randomNumbers}`;

  return String(orderNumber);
}

export default function ConfirmationPage() {
  const { customer } = useCustomerContext();

  const [orderLoaded, setOrderLoaded] = useState(false);
  const orderRef = useRef<Order>();

  const cartsRef = useRef<Cart>();

  useEffect(() => {
    if (!orderRef.current) {
      const orderInLS = getOrderFromLS();
      if (orderInLS == null) {
        cartsRef.current = getCartFromLocalStorage();
        generateNewOrderToLS(
          generateRandomNumber(),
          customer,
          cartsRef.current
        );
      }
      if (cartsRef.current) {
        removeCartFromLocalstorage();
      }
      orderRef.current = orderInLS;
      setOrderLoaded(true);
    }
  }, [customer]);

  const addressTitleRow = [
    "För och efternamn",
    "Gatuadress",
    "Stad och postkod",
  ];
  const orderTitleRows = ["Ordernummer", "Leverans", "Betalning"];

  const addressRow = [
    [customer.name, customer.address, `${customer.city} ${customer.zipcode}`],
  ];

  const orderRow = [[orderRef.current?.orderNr, "Instabox", "Faktura"]];

  const productTitleRows = ["Produkt", "Titel", "Pris"];

  let productRows: any[] = [];

  orderRef.current?.cart.products.forEach((p) => {
    productRows.push([
      <img src={p.image} alt="Product" width="20" height="20" />,
      p.title,
      p.price
    ]);
  });
  
  return (
    <div
      className="flex flex-col items-center"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <div className="mt-2 p-3 w-screen bg-neutral-700 bg-opacity-50">
        <h2>Order och leverans</h2>
      </div>

      <div className="flex bg-neutral-500 w-screen bg-opacity-5">
        <div className="w-1/2 p-3">
          <h2 className="font-bold">Order</h2>
          <div>
            <TableMUI titleRow={orderTitleRows} cellRows={orderRow} />
          </div>
        </div>

        <div className="w-1/2 p-3">
          <h2 className="font-bold">Leveransadress</h2>
          {orderLoaded ? (
            <div>
              <TableMUI titleRow={addressTitleRow} cellRows={addressRow} />
            </div>
          ) : (
            <p>Laddar uppgifter....</p>
          )}
        </div>
      </div>

      <div className="p-3 w-screen bg-neutral-700 bg-opacity-50">
        <h2>Beställda produkter</h2>
      </div>

      <div className="flex flex-col bg-neutral-500 w-screen overflow-y-auto p-3 bg-opacity-5">
        {orderLoaded && orderRef.current?.cart?.products ? (
          <div>
          <TableMUI titleRow={productTitleRows} cellRows={productRows} />
        </div>
        ) : (
          <p>Väntar på att produkter ska laddas...</p>
        )}
      </div>
    </div>
  );
}
