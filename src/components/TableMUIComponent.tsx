import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@mui/material';
import React from 'react';

interface TableMUIProps {
  titleRow: string[];    
  cellRows: any[];      
}

const TableMUI: React.FC<TableMUIProps> = ({ titleRow, cellRows }) => {
  return (
    <TableContainer elevation={2} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {titleRow.map((title) => (
              <TableCell  sx={{
                backgroundColor: "#c9c7c7", 
              }} key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cellRows.map((row, rowIndex) => (
            <TableRow key={rowIndex} data-cy="cart-item">
              {row.map((cell:string, cellIndex: number) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableMUI;
