import { ListItemIcon, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Products } from "../contexts/CartContext";

interface Props {
  products?: Products[] | Products;
  datacy?: string;
  titleDatacy?: string;
  priceDatacy?: string;
}

//här ska in gå till checkouut/kundvagn knapp då för nästa nya test

export default function PopupListComponent(props: Props) {
  const productsArray = Array.isArray(props.products)
    ? props.products
    : [props.products];

  return (
    <List>
      {productsArray.map((p) => (
        <ListItem
          key={p?.id}
          data-cy="product"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
            flexWrap: "wrap",
            marginTop: "10px",
            backgroundColor: "white",
          }}
        >
          <ListItemIcon className="w-15 h-10">
            <div style={{ overflow: "visible" }}>
              <img
                src={p?.image}
                alt="bild"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </ListItemIcon>

          <ListItemText data-cy="product-title" primary={p?.title} />
        </ListItem>
      ))}
    </List>
  );
}
