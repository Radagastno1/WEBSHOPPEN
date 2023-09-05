import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useCart } from "../contexts/CartContext";

import {
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export default function CartPage() {
  const { cart, totalPrice, addToCart, removeFromCart } = useCart();

  return (
    <div className="flex flex-1 flex-col items-center">
      {cart.length > 0 ? (
        <div>
          <List>
            {cart.map((p) => (
              <ListItem
                key={p.id}
                data-cy="cart-item"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  width: "100%",
                  padding: "8",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Card className="w-10 h-10">
                  <div style={{ overflow: "visible" }}>
                    <img
                      src={p.image}
                      alt="Product"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </Card>
                <ListItemText
                  primary={<Typography variant="body2">{p.title}</Typography>}
                  data-cy="product-title"
                  sx={{ padding: "4px" }}
                />
                <ListItemText
                  primary={
                    <Typography variant="body2">{`${
                      p.price * p.quantity
                    } kr`}</Typography>
                  }
                  data-cy="product-price"
                  sx={{ padding: "4px" }}
                />
                <ListItemText
                  primary={
                    <Typography variant="body2">{`${p.quantity} st`}</Typography>
                  }
                  data-cy="product-quantity"
                  sx={{ padding: "4px" }}
                />
                <div>
                  <Button
                    onClick={() => addToCart(p)}
                    data-cy={`increase-quantity-button`}
                    sx={{ color: "darkgray" }}
                  >
                    <AddCircleIcon />
                  </Button>
                  <Button
                    onClick={() => removeFromCart(p)}
                    data-cy={`decrease-quantity-button`}
                    sx={{ color: "darkgray" }}
                  >
                    <RemoveCircleIcon />
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" data-cy="total-price">
            Totalt pris: {totalPrice}
          </Typography>
        </div>
      ) : (
        <Typography variant="body1">Tomt i plånkan?</Typography>
      )}
    </div>
  );
}
