import { Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TableMUI from "../components/TableMUIComponent";
import { Order } from "../interfaces";
import { getOrderFromLS } from "../localstorage";
import "../styles.css";

export default function ConfirmationPage() {
  const [orderLoaded, setOrderLoaded] = useState(false);
  const orderRef = useRef<Order>();

  useEffect(() => {
    const orderInLS = getOrderFromLS();
    orderRef.current = orderInLS;
    if (orderRef.current) {
      setOrderLoaded(true);
      console.log(orderLoaded);
    }
  }, []);

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

  const productTitleRows = ["Produkt", "Titel", "Antal", "Pris"];

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
      p.quantity,
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
          width: "99%",
          backgroundColor: "#1f1f1f",
        }}
      >
        <Typography variant="h6" className="text-white">
          Order och leverans
        </Typography>
      </Paper>

      <div className="flex bg-neutral-500 w-screen bg-opacity-5">
        <div className="w-1/2 p-3">
          <div>
            <TableMUI
              titleRow={orderTitleRows}
              cellRows={orderRow}
              datacy="cart-item"
            />
          </div>
        </div>

        <div className="w-1/2 p-3">
          {orderLoaded ? (
            <div>
              <TableMUI
                titleRow={addressTitleRow}
                cellRows={addressRow}
                datacy="cart-item"
              />
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
          width: "99%",
          backgroundColor: "#1f1f1f",
        }}
      >
        <Typography variant="h6" className="text-white">
          Beställda produkter
        </Typography>
      </Paper>

      <div className="flex flex-col bg-neutral-500 w-screen overflow-y-auto p-3 bg-opacity-5">
        {orderLoaded && orderRef.current?.cart ? (
          <div>
            <TableMUI
              titleRow={productTitleRows}
              cellRows={productRows}
              datacy="cart-item"
            />
          </div>
        ) : (
          <Typography>Väntar på att produkter ska laddas...</Typography>
        )}
      </div>
    </div>
  );
}
