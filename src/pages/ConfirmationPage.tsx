import { Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../CartContext";
import { useCounterContext } from "../CounterProvider";
import { useCustomerContext } from "../CustomerContext";
import TableMUI from "../components/TableMUIComponent";
import { Order } from "../interfaces";
import { generateNewOrderToLS, getOrderFromLS } from "../localstorage";
import "../styles.css";

function generateRandomNumber() {
  const randomNumbers = Math.floor(Math.random() * 9000) + 1000;

  const timestamp = new Date().getTime();
  const last6Digits = timestamp.toString().slice(-6);

  const orderNumber = `${last6Digits}-${randomNumbers}`;

  return String(orderNumber);
}

export default function ConfirmationPage() {
  const { customer, resetCustomer } = useCustomerContext();
  const { resetCount } = useCounterContext();
  const { cart, resetCart, totalPrice } = useCart();

  //kanske skulle order kunna bli en context men kanske ej behövs för dett änadå
  const [orderLoaded, setOrderLoaded] = useState(false);
  const orderRef = useRef<Order>();

  useEffect(() => {
    const hasOrderBeenGenerated = localStorage.getItem("orderGenerated");

    if (!hasOrderBeenGenerated) {
      generateNewOrderToLS(generateRandomNumber(), customer, cart, totalPrice);
      localStorage.setItem("orderGenerated", "true");
    }

    const orderInLS = getOrderFromLS();
    orderRef.current = orderInLS;
    if (orderRef.current) {
      setOrderLoaded(true);
      console.log(orderLoaded);
    }
  }, []);

  useEffect(() => {
    if (orderLoaded) {
      resetCount();
      resetCustomer();
      resetCart();
    }
  }, [orderLoaded]);

  const addressTitleRow = [
    "Namn",
    "Leveransadress",
    "Mailadress",
    "Telefonnummer",
  ];
  const orderTitleRows = [
    "Ordernummer",
    "Leverans",
    "Betalning",
    "Totalt belopp",
  ];

  const addressRow = [
    [
      orderRef.current?.customer.name,
      `${orderRef.current?.customer.address} ${orderRef.current?.customer.city} ${orderRef.current?.customer.zipcode} `,
      orderRef.current?.customer.email,
      orderRef.current?.customer.phone,
    ],
  ];

  const orderRow = [
    [
      orderRef.current?.orderNr,
      "Instabox",
      "Faktura",
      orderRef.current?.totalPrice,
    ],
  ];

  const productTitleRows = ["Produkt", "Titel", "Pris"];

  interface ProductRow {
    0: JSX.Element; // bilden
    1: string; // titeln
    2: number; // priset
  }

  let productRows: ProductRow[] = [];

  if (orderRef.current?.cart) {
    productRows = orderRef.current.cart.map((p) => [
      <img src={p.image} alt="Product" width="20" height="20" />,
      p.title,
      p.price,
    ]);
  }

  return (
    <div
      className="flex flex-col items-center"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <Paper
        elevation={4}
        sx={{
          mt: 1,
          p: 1.5,
          width: "100%",
          backgroundColor: "#707070",
        }}
      >
        <Typography variant="h6" className="text-white">
          Order och leverans
        </Typography>
      </Paper>

      <div className="flex bg-neutral-500 w-screen bg-opacity-5">
        <div className="w-1/2 p-3">
          <div>
            <TableMUI titleRow={orderTitleRows} cellRows={orderRow} />
          </div>
        </div>

        <div className="w-1/2 p-3">
          {orderLoaded ? (
            <div>
              <TableMUI titleRow={addressTitleRow} cellRows={addressRow} />
            </div>
          ) : (
            <Typography>Laddar uppgifter....</Typography>
          )}
        </div>
      </div>

      <Paper
        elevation={4}
        sx={{
          mt: 0,
          p: 1.5,
          width: "100%",
          backgroundColor: "#707070",
        }}
      >
        <Typography variant="h6" className="text-white">
          Beställda produkter
        </Typography>
      </Paper>

      <div className="flex flex-col bg-neutral-500 w-screen overflow-y-auto p-3 bg-opacity-5">
        {orderLoaded && orderRef.current?.cart ? (
          <div>
            <TableMUI titleRow={productTitleRows} cellRows={productRows} />
          </div>
        ) : (
          <Typography>Väntar på att produkter ska laddas...</Typography>
        )}
      </div>
    </div>
  );
}
