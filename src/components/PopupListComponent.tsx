import { Box, ListItemIcon, ListItemText, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { CartItem } from "../../data";

interface Props {
  products?: CartItem[] | CartItem;
  datacy?: string;
  titleDatacy?: string;
  priceDatacy?: string;
  totalPrice?: string;
}

export default function PopupListComponent(props: Props) {
  const productsArray = Array.isArray(props.products) ? props.products : null;

  return (
    <List sx={{ backgroundColor: "white", marginTop: 2, borderRadius: 1 }}>
      {Array.isArray(props.products) && props.products.length > 0 ? (
        productsArray?.map((p) => (
          <ListItem
            key={p?.id}
            data-cy="product"
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              flexWrap: "wrap",
            }}
          >
            <ListItemIcon className="w-15 h-10">
              <Box sx={{ overflow: "visible" }}>
                <img
                  src={p?.image}
                  alt="bild"
                  className="w-full h-full object-cover object-center"
                />
              </Box>
            </ListItemIcon>

            <ListItemText data-cy="product-title" primary={p?.title} />
            <ListItemText sx={{ padding: 2 }}>x{p.quantity}</ListItemText>
          </ListItem>
        ))
      ) : (
        <ListItem>Din varukorg är tom</ListItem>
      )}
      {props.totalPrice && Array.isArray(props.products) && (
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: "bold" }}>Summa</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {props.totalPrice} kr
          </Typography>
        </ListItem>
      )}
    </List>
  );
}
