import { ReactNode, createContext, useContext } from "react";
import useLocalStorageState from "../useLocalStorage";
import { Products } from "./CartContext";
import { mockedProducts } from "../mockedList";

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
    mockedProducts,
    "products"
  );

  const addProduct = (product: Products) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
  };

  


  const removeProduct = (product: Products) => {
    const updatedProducts = [...products];
    const productIndex = updatedProducts.findIndex((p) => p.id === product.id);

    if (productIndex !== -1) {
      updatedProducts.splice(productIndex, 1);
      setProducts(updatedProducts);
    }
  };

  const editProduct = (editedProduct: Products) => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
  };
  


 


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
