import { useEffect, useRef, useState } from "react";
import { Customer, useCustomerContext } from "../CustomerContext";
import {
  addCustomerToLS,
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
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <h2>Din leveransadress</h2>

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

      <div className="flex flex-col my-2">
        <h2>Din order</h2>

        {productsLoaded ? (
          productsInCartRef.current.map((p) => <p key={p.id}>{p.title}</p>)
        ) : (
          <p>Väntar på att produkter ska laddas...</p>
        )}
      </div>
    </div>
  );
}
