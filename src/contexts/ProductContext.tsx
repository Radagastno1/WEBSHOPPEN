import { ReactNode, createContext, useContext } from "react";
import useLocalStorageState from "../useLocalStorage";
import { Products } from "./CartContext";

interface ProductContextType {
  products: Products[];
  addProduct: (product: Products) => void;
  removeProduct: (product: Products) => void;
  editProduct: (product: Products) => void;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  editProduct: () => {},
});

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("productContext must be used within a CartProvider");
  }
  return context;
}

interface ProcutProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProcutProviderProps) {
  const [products, setProducts] = useLocalStorageState<Products[]>(
    [],
    "products"
  );

  const addProduct = (product: Products) => {};

  const removeProduct = (product: Products) => {
    const updatedProducts = [...products];
    const productIndex = updatedProducts.findIndex((p) => p.id === product.id);

    if (productIndex !== -1) {
      updatedProducts.splice(productIndex, 1);
      setProducts(updatedProducts);
    }
  };

  const editProduct = (product: Products) => {};

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        editProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
