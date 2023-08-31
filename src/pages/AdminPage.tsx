import { Button } from '@mui/material';
import { GridColDef } from "@mui/x-data-grid";
import DatagridComponent from "../components/DatagridComponent";
import { Products } from "../interfaces";
import { addProductToLS, getProductsFromLS } from "../localstorage";
import { mockedProducts } from '../mockedList';


export default function AdminPage(){
    // const products = getProductsFromLS();
    const products = mockedProducts;

    function handleAction(id:any){
        const newProductList = products.filter(p => p.id !== id);

        //eller hur vi nu ska ta bort dom när man klickar? verkar som det ska komma en till - är du säker?
        localStorage.removeItem("products");
        newProductList.forEach(p => addProductToLS(p));
    }

    const columns: GridColDef[] = [ 
    { field: 'id', headerName: 'Id' },
    {
        field: 'image', 
        headerName: 'Bild',
        renderCell: (params:any) => (
            <img src={params.value} alt="Product" style={{ width: 100 }} /> 
        ),
    },
    { field: 'title', headerName: 'Titel' },
    { field: 'description', headerName: 'Beskrivning' },
    { field: 'price', headerName: 'Pris' },
    {
        field: 'action', 
        headerName: 'Radera',
        renderCell: (params:any) => (
            <Button    variant="contained" data-cy="admin-remove-product"
            color="primary" 
            onClick={() => handleAction(params.row.id)}
        >
            Ta bort
            </Button>
        ),
    },
];
    let rows: Products[] = [];

    products.forEach((p) => {
        rows.push({
            id: p.id,
            image: p.image,
            title: p.title,
          description: p.description,
          price: p.price,
        });
      });

    return(
        <div>
            <DatagridComponent rows={rows} columns={columns}/>
        </div>
    );
}