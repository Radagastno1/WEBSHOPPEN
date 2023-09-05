import { useCart } from "../contexts/CartContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function CartPage() {
  const { cart, totalPrice, addToCart, removeFromCart } = useCart();

  return (
    <div className="flex flex-1 flex-col items-center">
      {cart.length > 0 ? (
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titel</TableCell>
                  <TableCell>Pris</TableCell>
                  <TableCell>Antal</TableCell>
                  <TableCell>Produktbild</TableCell>
                  <TableCell>Ändra Antal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((p) => (
                  <TableRow key={p.id} data-cy="cart-item">
                    <TableCell data-cy="product-title">{p.title}</TableCell>
                    <TableCell data-cy="product-price">
                      {p.price * p.quantity} kr
                    </TableCell>
                    <TableCell data-cy="product-quantity">
                      {p.quantity} st
                    </TableCell>
                    <TableCell className="w-10 h-10">
                      <div style={{ overflow: "visible" }}>
                        <img
                          src={p.image}
                          alt="Product"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => addToCart(p)}
                        data-cy={`increase-quantity-button`}
                      >
                        <AddCircleIcon style={{ color: "darkgrey" }} />
                      </Button>
                      <Button
                        onClick={() => removeFromCart(p)}
                        data-cy={`decrease-quantity-button`}
                      >
                        <RemoveCircleIcon style={{ color: "darkgrey" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
