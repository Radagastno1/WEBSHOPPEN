import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import CheckoutPage from "./pages/CheckoutPage";
import IndexPage from "./pages/IndexPage";
import RootLayout from "./pages/RootLayout";

import { CustomerProvider } from "./contexts/CustomerContext";
import ConfirmationPage from "./pages/ConfirmationPage";

import AdminPage from "./pages/AdminPage";
import AdminProductPage from "./pages/AdminProductPage";
import ProductPage from "./pages/ProductPage";

import { Box, Typography } from "@mui/material";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ProductProvider } from "./contexts/ProductContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<IndexPage />}></Route>

      <Route path="product/:id" element={<ProductPage />}></Route>

      <Route path="checkout" element={<CheckoutPage />}></Route>

      <Route path="confirmation" element={<ConfirmationPage />}></Route>

      <Route path="admin" element={<AdminPage />}></Route>
      <Route path="admin/product/:param" element={<AdminProductPage />}></Route>
      <Route
        path="*"
        element={
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            Ojdå, det verkar som att denna sida inte finns.
            <Link to="/">
              <Typography
                fontWeight={"bold"}
                sx={{
                  backgroundColor: "lightgrey",
                  borderRadius: "2px",
                  padding: 1,
                }}
              >
                Till startsidan
              </Typography>
            </Link>
          </Box>
        }
      ></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <CustomerProvider>
        <ProductProvider>
          <OrderProvider>
            <RouterProvider router={router} />
          </OrderProvider>
        </ProductProvider>
      </CustomerProvider>
    </CartProvider>
  </React.StrictMode>
);
