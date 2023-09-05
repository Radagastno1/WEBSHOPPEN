import { Paper, Typography } from "@mui/material";
import { Products } from "../contexts/CartContext";

interface Props {
  title: string;
  product?: Products;
}

export default function AdminProductPage(props: Props) {
  return (
    <Paper>
      <Typography>Titel: {props.title}</Typography>
      <Typography>Och här nedanför ska vara ett formulär sen då</Typography>
    </Paper>
  );
}
