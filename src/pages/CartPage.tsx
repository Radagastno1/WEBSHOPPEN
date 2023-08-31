import React from "react";
import { getCartFromLocalStorage } from '../localstorage'; 



export default function CartPage() {

    const cart = getCartFromLocalStorage();

    const total = cart.products.reduce((accumulator, product) => accumulator + product.price, 0);

    cart.totalPrice = total;

    localStorage.setItem('cart', JSON.stringify(cart));
    //uppdatera det till ls
  
    return (
      <div className="flex flex-1 flex-col items-center">
        <ul>
          {cart.products.map((product) => (
            <li key={product.id} data-cy={`product-${product.id}`} className="product-item">
              <div className="product-info" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div className="product-title" style={{ marginRight: '75px' }}>{product.title}</div>
                <div className="product-price">
                  <strong>Pris:</strong> {product.price}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p>Totalt pris: {total}</p>
      </div>
    );
  }
  
  