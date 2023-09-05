import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import DatagridComponent from "../components/DatagridComponent";
import { Products } from "../contexts/CartContext";
import { useProductContext } from "../contexts/ProductContext";

export default function AdminPage() {
  //här behöver vi använda oss av product state sen och det ska ju handla om mockedproducts med
  // const products = mockedProducts;
  const { products, removeProduct } = useProductContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  function handleAction(product: Products) {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  }

  function handleRemoveProduct(product: Products) {
    removeProduct(product);
    setIsPopupOpen(false);
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      renderCell: (params: any) => <div data-cy="product"></div>,
    },
    {
      field: "image",
      headerName: "Bild",
      renderCell: (params: any) => (
        <img src={params.value} alt="Product" style={{ width: 100 }} />
      ),
    },
    {
      field: "title",
      headerName: "Titel",
    },
    { field: "description", headerName: "Beskrivning" },
    { field: "price", headerName: "Pris" },
    {
      field: "action",
      headerName: "Radera",
      renderCell: (params: any) => (
        <Button
          variant="contained"
          data-cy="admin-remove-product"
          color="primary"
          onClick={() => handleAction(params.row)}
        >
          Ta bort
        </Button>
      ),
    },
  ];
  let rows: Products[] = [];

  if (!products) {
  }
  products.forEach((p) => {
    rows.push({
      id: p.id,
      image: p.image,
      title: p.title,
      description: p.description,
      price: p.price,
      quantity: p.quantity,
    });
  });

  return (
    <div className="flex flex-1">
      <DatagridComponent rows={rows} columns={columns} />
      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <div>
              <p>ID: {selectedProduct.id}</p>
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
