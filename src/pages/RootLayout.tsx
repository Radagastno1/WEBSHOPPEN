import { Outlet } from "react-router-dom";

export default function RootLayout(){
    return(
        <div className="flex flex-col h-screen">
        <header className="h-40 min-h-700 bg-neutral-600">
        <h1 className="text-2xl font-bold text-pink-400 my">Keramika</h1>
        </header>
        <main className="bg-neutral-400 flex flex-1 flex-col"><div><Outlet/></div></main>
        <footer className="h-10 bg-neutral-800"></footer>
        
    </div>
    );
}