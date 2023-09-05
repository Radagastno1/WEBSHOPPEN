import { Products } from "./contexts/CartContext";
import { Order } from "./interfaces";

export const addProductToLS = (product: Products) => {
  const existingProducts = JSON.parse(
    localStorage.getItem("products") || "[]"
  ) as Products[];

  const productExists = existingProducts.some(
    (existingProduct) => existingProduct.id === product.id
  );

  if (!productExists) {
    existingProducts.push(product);
    localStorage.setItem("products", JSON.stringify(existingProducts));
  }
};

export const getProductsFromLS = (): Products[] => {
  const productsString = localStorage.getItem("products");
  const products = productsString ? JSON.parse(productsString) : [];
  return products;
};

export const generateNewOrderToLS = (order: Order) => {
  localStorage.removeItem("order");

  const newOrder: Order = {
    orderNr: order.orderNr,
    customer: order.customer,
    cart: order.cart,
    totalPrice: order.totalPrice,
  };
  localStorage.setItem("order", JSON.stringify(newOrder));
  return newOrder;
};

export const getOrderFromLS = (): Order => {
  const orderString = localStorage.getItem("order");
  const order: Order = orderString ? JSON.parse(orderString) : null;
  return order;
};
