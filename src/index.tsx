import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import RootLayout from './pages/RootLayout';
import IndexPage from './pages/IndexPage';
import OrderPage from './pages/CheckoutPage';
// import CartPage from './pages/CartPage';

import ConfirmationPage from './pages/ConfirmationPage';
import { CustomerProvider } from './CustomerContext';

import ProductPage from './pages/ProductPage';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout/>}>

    {/* alla produkter syns här */}
      <Route index element={<IndexPage/>}></Route> 
      {/* en specifik produkt visas här */}
      <Route path="product/:id" element={<ProductPage/>}></Route>
      {/* här är sidan för kundvagnen */}
      {/* <Route path="cart" element={<CartPage/>}></Route> */}
      {/* formulär betalning */}
      <Route path="checkout" element={<CustomerProvider><OrderPage/></CustomerProvider>}></Route>
      {/* bekräftelsesida */}
      <Route path="confirmation" element={<CustomerProvider><ConfirmationPage/></CustomerProvider>}></Route>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
);
