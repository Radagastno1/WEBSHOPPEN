import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import OrderPage from './pages/CheckoutPage';
import IndexPage from './pages/IndexPage';
import RootLayout from './pages/RootLayout';


import { CustomerProvider } from './CustomerContext';
import ConfirmationPage from './pages/ConfirmationPage';

import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';

import {CounterProvider} from './CounterProvider';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<CounterProvider><RootLayout/></CounterProvider>}>

    {/* alla produkter syns här */}
   
      <Route index element={<IndexPage/>}></Route> 
      {/* en specifik produkt visas här */}
      <Route path="product/:id" element={<ProductPage/>}></Route>
      {/* formulär betalning */}
      <Route path="checkout" element={<CustomerProvider><OrderPage/></CustomerProvider>}></Route>
      {/* bekräftelsesida */}
      <Route path="confirmation" element={<CustomerProvider><ConfirmationPage/></CustomerProvider>}></Route>
      <Route path="admin" element={<AdminPage/>}></Route>

    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
);
