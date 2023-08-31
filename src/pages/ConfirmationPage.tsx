import { useEffect, useRef, useState } from "react";
import { useCustomerContext } from "../CustomerContext";
import { Cart, Order } from "../interfaces";
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
      if(cartsRef.current){
        removeCartFromLocalstorage();
    }
      orderRef.current = orderInLS;
      setOrderLoaded(true);
    }
  }, [customer]);

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
            <p>Ordernummer: {orderRef?.current?.orderNr}</p>
            <p>Leveransmetod: Instabox</p>
          </div>
        </div>

        <div className="w-1/2 p-3">
          
          <h2 className="font-bold">Leveransadress</h2>
          {orderLoaded ? (
            <div> 
                
                 <p>{orderRef.current?.customer.name}</p>
              <p>{orderRef.current?.customer.address}</p>
              <p>
                {orderRef.current?.customer.zipcode}{" "}
                {orderRef.current?.customer.city}
              </p>
      
            
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
          orderRef.current.cart.products.map((p) => (
            <div key={p.id} className="flex items-center mb-2 my-2">
              <img src={p.image} alt={p.title} className="w-10 h-10 mr-2" />
              <p>{p.title}</p>
            </div>
          ))
        ) : (
          <p>Väntar på att produkter ska laddas...</p>
        )}
      </div>
    </div>
  );
}
