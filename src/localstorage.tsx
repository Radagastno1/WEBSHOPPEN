import { Customer } from "./CustomerContext";
import { Order } from "./interfaces";
import { Products } from "./CartContext";

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

export const generateNewOrderToLS = (
  ordernr: string,
  customer: Customer,
  cart: Products[],
  totalPrice: number
) => {
  localStorage.removeItem("order");

  const newOrder: Order = {
    orderNr: ordernr,
    customer: customer,
    cart: cart,
    totalPrice: totalPrice,
  };
  localStorage.setItem("order", JSON.stringify(newOrder));
  return newOrder;
};

export const getOrderFromLS = (): Order => {
  const orderString = localStorage.getItem("order");
  const order: Order = orderString ? JSON.parse(orderString) : null;
  return order;
};
