import { ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Products } from "../contexts/CartContext";

interface Props {
  products?: Products[] | Products;
  datacy?: string;
  titleDatacy?: string;
  priceDatacy?: string;
}

export default function PopupListComponent(props: Props) {
  const productsArray = Array.isArray(props.products)
    ? props.products
    : [props.products];

  return (
    <Grid item xs={12} md={2}>
      <List sx={{ backgroundColor: "white", opacity: "0.9" }}>
        {productsArray.map((product, index) => (
          <ListItem key={index} data-cy={`product`}>
            <ListItemIcon>
              <img src={product?.image} alt="produktbild" className="h-5 w-5" />
            </ListItemIcon>

            <ListItemIcon>
              <Typography
                variant="body2"
                sx={{
                  overflow: "visible",
                }}
                data-cy={props.titleDatacy}
              >
                {product?.title}
              </Typography>
            </ListItemIcon>

            <ListItemIcon>
              <Typography variant="body2">{`${product?.quantity}st`}</Typography>
            </ListItemIcon>

            <ListItemIcon>
              <Typography
                variant="body2"
                data-cy={props.priceDatacy}
              >{`${product?.price}kr`}</Typography>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
