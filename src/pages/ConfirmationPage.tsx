import { Paper, Typography } from "@mui/material";
import TableMUI from "../components/TableMUIComponent";
import { useOrderContext } from "../contexts/OrderContext";
import "../styles.css";

export default function ConfirmationPage() {
  const { order } = useOrderContext();

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
      { property: order.customer.name },
      {
        property: `${order.customer.address} ${order.customer.city} ${order.customer.zipcode} `,
      },
      { property: order.customer.email },
      { property: order.customer.phone },
    ],
  ];

  const orderRow = [
    [
      { property: order.orderNr },
      { property: "Instabox" },
      { property: "Faktura" },
      { property: order.totalPrice },
    ],
  ];

  const productTitleRows = ["Produkt", "Titel", "Antal", "Pris"];

  const productRows = order.cart.map((p) => [
    { property: <img src={p.image} alt="Product" width="20" height="20" /> },
    { property: p.title },
    { property: p.quantity },
    { property: p.price },
  ]);

  return (
    <div
      className="flex flex-col items-center"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <Paper
        elevation={4}
        sx={{
          mt: 1,
          p: 1,
          width: "99%",
          backgroundColor: "#e5e0e0",
        }}
      >
        <Typography sx={{ color: "black", fontSize: "12" }}>
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
          {order ? (
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
          backgroundColor: "#e5e0e0",
        }}
      >
        <Typography sx={{ color: "black", fontSize: "12" }}>
          Beställda produkter
        </Typography>
      </Paper>

      <div className="flex flex-col bg-neutral-500 w-screen overflow-y-auto p-3 bg-opacity-5">
        {order && order.cart ? (
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
