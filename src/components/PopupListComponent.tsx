import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useCart } from "../CartContext";

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
            <ListItemText primary={`${product.title} ${product.quantity}st`} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
