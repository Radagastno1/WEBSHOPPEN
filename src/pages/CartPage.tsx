import { getProductsFromLS } from '../localstorage';


export default function CartPage() {
    const productsInCart = getProductsFromLS();
  
    const total = productsInCart.reduce((accumulator, product) => accumulator + product.price, 0);
  
    return (
      <div className="flex flex-1 flex-col items-center">
        <ul>
          {productsInCart.map((product) => (
            <li key={product.id} data-cy={`product-${product.id}`} className="product-item">
              <div className="product-info" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div className="product-title" style={{ marginRight: '75px' }}>{product.title}</div>
                <div className="product-price">
                  <strong>Pris:</strong> {product.price}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p>Totalt pris: {total}</p>
      </div>
    );
  }
  
  