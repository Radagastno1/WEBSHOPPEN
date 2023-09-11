export interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  inStock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [];
