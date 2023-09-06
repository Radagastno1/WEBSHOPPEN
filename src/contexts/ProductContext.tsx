import { ReactNode, createContext, useContext } from "react";
import useLocalStorageState from "../useLocalStorage";
import { Products } from "./CartContext";
import { mockedProducts } from "../mockedList";

interface ProductContextType {
  products: Products[];
  product: Products; // Lägg till product i kontexten
  setProduct: (product: Products) => void;
  addProduct: (product: Products) => void;
  removeProduct: (product: Products) => void;
  editProduct: (product: Products) => void;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  product: {
    id: "",
    title: "",
    description: "",
    price: 0,
    image: "string",
    quantity: 0,
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
  const [products, setProducts] = useLocalStorageState<Products[]>(
    mockedProducts,
    "products"
  );
  const [product, setProduct] = useLocalStorageState<Products>(
    {
      id: "",
      title: "",
      description: "",
      price: 0,
      image: "string",
      quantity: 0,
    },
    "product"
  );
  //gamla addproduct
  // const addProduct = (product: Products) => {
  //   const updatedProducts = [...products, product];
  //   setProducts(updatedProducts);
  // };

  //addproduct med ett updaterat id
  const addProduct = (newProduct: Products) => {
    const latestId = products.reduce((maxId, product) => {
      const productId = parseInt(product.id, 10);
      return productId > maxId ? productId : maxId;
    }, 0);
    const newId = `${latestId + 1}`;

    newProduct.id = newId;

    const updatedProducts = [...products, newProduct];
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
        product, // Lägg till product i kontextvärdet
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
