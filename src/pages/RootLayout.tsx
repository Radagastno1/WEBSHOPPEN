import { NavLink, Outlet } from "react-router-dom";
import  ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';


export default function RootLayout(){
    return(
        <div className="flex flex-col h-screen">
          <header
        className="flex h-40 min-h-700 bg-neutral-600 items-center justify-center"
        style={{
          backgroundImage: `url('https://i.imgur.com/nh4oD1B.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <NavLink to="/checkout" className="ml-auto mr-12" data-cy="cart-link">
            <ShoppingCartIcon className="text-black cursor-pointer" fontSize="large" />
            </NavLink>

        </header>

        <main className="bg-neutral-100 flex flex-1 flex-col"><div className="flex flex-col flex-1"><Outlet/></div></main>
        <footer className="h-10 bg-neutral-400"></footer>
    </div>

    );
  }