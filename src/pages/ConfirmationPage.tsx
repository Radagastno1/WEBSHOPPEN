import { useEffect, useRef, useState } from "react";
import { Customer, useCustomerContext } from "../CustomerContext";
import {
    addProductToCart,
    addProductToLS,
    getCartFromLocalStorage,
    getCustomerFromLS,
    getProductsFromLS,
} from "../localstorage";
import { Products, mockedProducts } from "../mockedList";

export default function ConfirmationPage() {
  const { customer } = useCustomerContext();

  const [customerLoaded, setCustomerLoaded] = useState(false);

  const customerRef = useRef<Customer>();

  useEffect(() => {
    // kunden till ref om det inte finns än i current då. för att se så den är inladdad från ls
    if (!customerRef.current) {
      const customerInLS = getCustomerFromLS();
      customerRef.current = customerInLS;
      setCustomerLoaded(true);
    }
  }, [customer]);

  //använder ref nu sålänge för att jag lägger till i ls i useeffect, så att produkterna finns deklararerade innan
  // useeffect körs (genom livscykeln på ref) samt att man kan anropa dom utanför useeffect
  const productsRef = useRef<Products[]>([]);
  const productsInCartRef = useRef<Products[]>([]);

  //håller state om produkterna har laddats in från LS
  const [productsLoaded, setProductsLoaded] = useState(false);

  //hämtar alla produkter från ls och lägger i cart nu innan cart finns bara:
  useEffect(() => {
    mockedProducts.forEach((p) => addProductToLS(p));
    const productsFromLS = getProductsFromLS();
    if (getCartFromLocalStorage().products.length === 0) {
      productsFromLS.forEach((p) => addProductToCart(p));
    }
    productsRef.current = productsFromLS;
    const cartFromLS = getCartFromLocalStorage();
    productsInCartRef.current = cartFromLS.products;
    setProductsLoaded(true);
  }, []);

  
  /////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex flex-col items-center" style={{ maxHeight: "calc(100vh - 200px)" }}>
      <div className="mt-2 p-3 w-screen bg-neutral-700 bg-opacity-50">
        <h2>Order och leverans</h2>
      </div>

      <div className="flex bg-neutral-500 w-screen bg-opacity-5">
        <div className="w-1/2 p-3">
          <h2 className="font-bold">Order</h2>
          <div>
            <p>Ordernummer: 010101</p>
            <p>Leveransmetod: Instabox</p>
          </div>
        </div>

        <div className="w-1/2 p-3">
          <h2 className="font-bold">Leverans</h2>
          {customerLoaded ? (
            <div>
              <p>{customerRef.current?.name}</p>
              <p>{customerRef.current?.address}</p>
              <p>
                {customerRef.current?.zipcode} {customerRef.current?.city}
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
        {productsLoaded ? (
          productsInCartRef.current.map((p) => (
            <div key={p.id} className="flex items-center mb-2 my-2">
              <img src={p.url} alt={p.title} className="w-10 h-10 mr-2" />
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
