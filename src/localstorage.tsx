import { Customer } from "./CustomerContext";
import { Cart, Products } from "./mockedList";


export const addProductToLS = (product: Products) => {
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]') as Products[];

  const isProductInList = existingProducts.some(existingProduct => existingProduct.id === product.id);

  if (!isProductInList) {
    existingProducts.push(product);
    localStorage.setItem('products', JSON.stringify(existingProducts));
  }
};
  

 export const getProductsFromLS= (): Products[] => {
    const productsString = localStorage.getItem('products');
    const products = productsString ? JSON.parse(productsString) : [];
    return products;
  };

export const addProductToCart = (product: Products) => {
    const cart: Cart = JSON.parse(localStorage.getItem('cart') || '{"products":[],"totalPrice":0}');
  
    cart.products.push(product);
  
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const getCartFromLocalStorage = (): Cart => {
    const cartString = localStorage.getItem('cart');
    const cart: Cart = cartString ? JSON.parse(cartString) : { products: [], totalPrice: 0 };
    return cart;
  };
  
  //när ska jag radera customer från ls, tänker att jag gör det varje gång den  läggs till för det händer
  //ju vid formuläret ändå så?
  export const addCustomerToLS = (customer: Customer) => {
    localStorage.removeItem('customer'); 
    localStorage.setItem('customer', JSON.stringify(customer));
  };

  export const getCustomerFromLS = (): Customer | null => {
    const customerString = localStorage.getItem('customer');
    const customer: Customer = customerString ? JSON.parse(customerString) : null;
    return customer;
  };
  