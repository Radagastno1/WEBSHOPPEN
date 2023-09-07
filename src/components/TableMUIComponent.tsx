import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

interface TableMUIProps {
  titleRow: string[];
  cellRows: any[];
  datacy: string;
}

const TableMUI: React.FC<TableMUIProps> = ({ titleRow, cellRows, datacy }) => {
  return (
    <TableContainer elevation={2} component={Paper} >
      <Table aria-label="simple table">
        <TableHead data-cy="product-form">
          <TableRow>
            {titleRow.map((title) => (
              <TableCell
                sx={{
                  backgroundColor: "#c9c7c7",
                }}
                key={title}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cellRows.map((row, rowIndex) => (
            <TableRow key={rowIndex} data-cy={datacy}>
              {row.map((cell: string, cellIndex: number) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMUI;
