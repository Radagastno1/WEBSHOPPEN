import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useCart } from "../CartContext";
import { Typography } from "@mui/material";

export default function PopupListComponent() {
  const { cart } = useCart();

  return (
    <Grid item xs={12} md={2}>
      <List sx={{ backgroundColor: "white", opacity: "0.9" }}>
        {cart.map((product, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <img src={product.image} alt="produktbild" className="h-5 w-5" />
            </ListItemIcon>
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", fontWeight: 400 }}
            >
              {`${product.title} ${product.quantity}st`}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
