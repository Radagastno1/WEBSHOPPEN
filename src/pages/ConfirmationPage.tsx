import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import TableMUI from "../components/TableMUIComponent";
import { useOrderContext } from "../contexts/OrderContext";

export default function ConfirmationPage() {
  const { order } = useOrderContext();
  const isMobileOrTabletScreen = useMediaQuery("(max-width: 820px)");

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height={
        isMobileOrTabletScreen ? "calc(100vh - 150px)" : "calc(100vh - 200px)"
      }
      sx={{
        overflowY: "auto",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          mt: 1,
          p: 1,
          width: "99%",
        }}
      >
        <Typography sx={{ color: "black", fontSize: "12" }}>
          Order och leverans
        </Typography>
      </Paper>

      <Box
        display={"flex"}
        flexDirection={isMobileOrTabletScreen ? "column" : "row"}
        sx={{ width: "100%" }}
      >
        <Box
          width={isMobileOrTabletScreen ? "100%" : "50%"}
          sx={{ paddingY: 1.5, paddingX: 1 }}
        >
          <TableMUI
            titleRow={orderTitleRows}
            cellRows={orderRow}
            datacy="cart-item"
          />
        </Box>

        <Box
          width={isMobileOrTabletScreen ? "100%" : "50%"}
          sx={{ paddingY: 1.5, paddingX: 1 }}
        >
          {order ? (
            <TableMUI
              titleRow={addressTitleRow}
              cellRows={addressRow}
              datacy="cart-item"
            />
          ) : (
            <Typography>Laddar uppgifter....</Typography>
          )}
        </Box>
      </Box>

      <Paper
        elevation={4}
        sx={{
          mt: 1,
          p: 1.5,
          width: "99%",
        }}
      >
        <Typography sx={{ color: "black", fontSize: "12" }}>
          Beställda produkter
        </Typography>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "neutral-500",
          width: "100vw",
          overflowY: "auto",
          backdropFilter: "blur(10px)",
          paddingY: 1.5,
          paddingX: 1,
        }}
      >
        {order && order.cart ? (
          <TableMUI
            titleRow={productTitleRows}
            cellRows={productRows}
            datacy="cart-item"
          />
        ) : (
          <Typography>Väntar på att produkter ska laddas...</Typography>
        )}
      </Box>
    </Box>
  );
}
