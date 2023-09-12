import { ReactNode, createContext, useContext } from "react";
import { Product } from "../../data/index";
import { mockedProducts } from "../mockedList";
import useLocalStorageState from "../useLocalStorage";

interface ProductContextType {
  products: Product[];
  product: Product;
  setProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
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
  const [products, setProducts] = useLocalStorageState<Product[]>(
    mockedProducts,
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
  //gamla addproduct
  // const addProduct = (product: Products) => {
  //   const updatedProducts = [...products, product];
  //   setProducts(updatedProducts);
  // };

  //addproduct med ett updaterat i
  const addProduct = (newProduct: Products) => {
    const milliseconds = Date.now() % 1000;


    newProduct.id = milliseconds.toString(); 

    const updatedProducts = [...products, newProduct];
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
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
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
