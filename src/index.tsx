import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import RootLayout from './pages/RootLayout';
import IndexPage from './pages/IndexPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout/>}>

    {/* alla produkter syns här */}
      <Route index element={<IndexPage/>}></Route> 
      {/* en specifik produkt visas här */}
      <Route path="product/:id" element={<div>VISAR EN PRODUKT</div>}></Route>
      {/* här är sidan för kundvagnen */}
      <Route path="cart" element={<div>I DIN KUNDVAGN ....</div>}></Route>
      {/* formulär betalning */}
      <Route path="checkout" element={<div>KASSA FORMULÄR</div>}></Route>
      {/* bekräftelsesida */}
      <Route path="confirmation" element={<div>BEKRÄFTELSE</div>}></Route>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
);
