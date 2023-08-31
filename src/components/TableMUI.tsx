import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

interface AddressRow{
    name:string;
    address: string;
    zipcode: string;
    city: string;
  }
  
  interface OrderRow {
    orderNr?: string;
    delivery: string;
  }
  
  interface TableMUIProps {
    addressRow: AddressRow[];
    orderRow: OrderRow[];
  }

  const TableMUI: React.FC<TableMUIProps> = ({ addressRow, orderRow }) => {
    return(
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>För och efternamn</TableCell>
              <TableCell>Adress</TableCell>
              <TableCell>Stad och postkod</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {addressRow.map((row) => (
      <TableRow>
          <TableCell>{row.name}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{`${row.city} ${row.zipcode}`}</TableCell>
      </TableRow>
    ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default TableMUI;