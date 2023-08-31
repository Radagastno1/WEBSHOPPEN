import { getProductsFromLS } from "../localstorage";

export default function AdminPage(){
    const products = getProductsFromLS();
    const columns = ["Produkt", "Titel", "Beskrivning", "Pris"];
    let rows = [];
    products.map(p => rows.push(p));

    return(
        <div></div>
    );
}