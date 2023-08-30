import { Customer } from "./CustomerContext";
import { Order } from "./interfaces";
import { Cart, Products } from "./interfaces";


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

  export const generateNewOrderToLS = (ordernr: string, customer : Customer, cart: Cart) => {
      const newOrder : Order = {orderNr: ordernr, customer : customer, cart: cart}
      addOrderToLS(newOrder);
  };

  export const addOrderToLS = (order: Order) => {
    localStorage.removeItem('order'); 
    localStorage.setItem('order', JSON.stringify(order));
  };

  export const getOrderFromLS = (): Order => {
    const orderString = localStorage.getItem('order');
    const order: Order = orderString ? JSON.parse(orderString) : null;
    return order;
  };