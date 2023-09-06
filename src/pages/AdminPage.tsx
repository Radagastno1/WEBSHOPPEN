import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import TableMUI from "../components/TableMUIComponent";
import { Products } from "../contexts/CartContext";
import { useProductContext } from "../contexts/ProductContext";

export default function AdminPage() {
  //här behöver vi använda oss av product state sen och det ska ju handla om mockedproducts med
  // const products = mockedProducts;
  const { products, removeProduct, addProduct } = useProductContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  function handleAction(product: Products) {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  }

  function handleAddProduct(product: Products) {
    addProduct(product);
    setIsPopupOpen(false);
  }

  function handleRemoveProduct(product: Products) {
    removeProduct(product);
    setIsPopupOpen(false);
  }

  const titleRows = ["Produkt", "Id", "Titel", "Pris", "Radera"];

  const productRows = products.map((p) => [
    <img src={p.image} alt="Product" width="20" height="20" />,
    <p data-cy="product-id">{p.id}</p>,
    <p data-cy="product-title">{p.title}</p>,
    <p data-cy="product-price">{p.price}</p>,
    <Button
      variant="contained"
      data-cy="admin-remove-product"
      color="primary"
      onClick={() => handleAction(p)}
    >
      Ta bort produkten
    </Button>,
  ]);

  return (
    <div className="flex flex-col flex-1">
      <Box mb={1}>
        <NavLink to="/admin/product/ny" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            data-cy="admin-add-product"
          >
            Lägg till produkt
          </Button>
        </NavLink>
      </Box>

      <TableMUI titleRow={titleRows} cellRows={productRows} datacy="product" />

      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <div data-cy="product">
              <p data-cy="product-title">ID: {selectedProduct.id}</p>
              <p>Title: {selectedProduct.title}</p>
              <p>Description: {selectedProduct.description}</p>
              <p>Price: {selectedProduct.price}</p>
              {
                <Button
                  variant="contained"
                  data-cy="confirm-delete-button"
                  color="primary"
                  onClick={() => handleRemoveProduct(selectedProduct)}
                >
                  Ta bort produkten
                </Button>
              }
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
