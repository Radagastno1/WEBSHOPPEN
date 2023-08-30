import { NavLink, Outlet } from "react-router-dom";
import  ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';


export default function RootLayout(){
    return(
        <div className="flex flex-col h-screen">
        <header className="flex h-40 min-h-700 bg-neutral-600 items-center justify-center">
            <img src="https://i.imgur.com/nh4oD1B.jpg" alt="Picture with some plates and a vase" />
        </header>
        <main className="bg-neutral-100 flex flex-1 flex-col"><div className="flex flex-col flex-1"><Outlet/></div></main>
        <footer className="h-10 bg-neutral-400"></footer>
    </div>

    );
  }