import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Products } from '../interfaces';

interface DatagridProps {
    rows: Products[];
    columns: GridColDef<Products>[]; 
  }
  

export default function DatagridComponent({ rows, columns }: DatagridProps){

    return(
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            },
          }}
          pageSizeOptions={[6, 12]}
          checkboxSelection
        />
      </div>
    );
}