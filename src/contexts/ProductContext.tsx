import { ReactNode, createContext, useContext } from "react";
import { Product, products } from "../../data/index";

import useLocalStorageState from "../useLocalStorage";

interface ProductContextType {
  allProducts: Product[];
  product: Product;
  setProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType>({
  allProducts: [],
  product: {
    id: "",
    title: "",
    description: "",
    price: 0,
    image: "string",
    inStock: 0,
  },
  setProduct: () => {},
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
  const [allProducts, setProducts] = useLocalStorageState<Product[]>(
    products,
    "products"
  );
  const [product, setProduct] = useLocalStorageState<Product>(
    {
      id: "",
      title: "",
      description: "",
      price: 0,
      image: "string",
      inStock: 0,
    },
    "product"
  );

  //addproduct med ett updaterat id med 4 sista från millesec datum
  const addProduct = (newProduct: Product) => {
    const milliseconds = Date.now().toString();
    const id = milliseconds.slice(-4);

    newProduct.id = id;

    const updatedProducts = [...allProducts, newProduct];
    setProducts(updatedProducts);
  };

  const removeProduct = (product: Product) => {
    const updatedProducts = [...products];
    const productIndex = updatedProducts.findIndex((p) => p.id === product.id);

    if (productIndex !== -1) {
      updatedProducts.splice(productIndex, 1);
      setProducts(updatedProducts);
    }
  };

  const editProduct = (editedProduct: Product) => {
    const updatedProducts = allProducts.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        product,
        setProduct,
        addProduct,
        removeProduct,
        editProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
