import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "../../data/index";

interface DatagridProps {
  rows: Product[];
  columns: GridColDef<Product>[];
}

export default function DatagridComponent({ rows, columns }: DatagridProps) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 12 },
          },
        }}
        pageSizeOptions={[25, 50]}
        checkboxSelection
      />
    </div>
  );
}
