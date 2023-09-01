import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, Outlet } from "react-router-dom";
import { CounterProvider, useCounterContext } from "../CounterProvider";

export default function RootLayout() {
  const { Count } = useCounterContext();

  return (
    <div className="flex flex-col h-screen">
      <header
        className="flex h-40 min-h-700 bg-neutral-600 items-end justify-end"
        style={{
          backgroundImage: `url('https://i.imgur.com/nh4oD1B.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <NavLink to="/admin" data-cy="admin-link">
          <AdminPanelSettingsIcon className="cursor-pointer" fontSize="large" />
        </NavLink>
        <div>
          <NavLink to="/checkout" data-cy="cart-link" className="mr-10" >
            <ShoppingCartIcon  
              className="text-black cursor-pointer"
              fontSize="large"
              data-cy="cart-items-count-badge"
              
            />
           {Count}
          </NavLink>
          
        </div>
      </header>

      <main className="bg-neutral-100 flex flex-1 flex-col">
        <div className="flex flex-col flex-1">
        
          <Outlet />
  
        </div>
      </main>
      <footer className="h-10 bg-neutral-400"></footer>
    </div>
  );
}
