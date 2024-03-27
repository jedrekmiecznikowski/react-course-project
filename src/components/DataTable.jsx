import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';


export default function DataTable({ filteredField = null, rows = null, onButtonClick }) {

    const filteredRows = filteredField ? rows.filter(row => row['carried-by'] === filteredField) : rows;


    const columns = [
        { field: 'name', headerName: 'Item', width: 200, editable: true},
        { field: 'cost', headerName: 'Cost', width: 100, type: 'number', editable: true},
        { field: 'quantity', headerName: 'Quantity', width: 130, type: 'number', editable: true},
        { field: 'weight', headerName: 'Weight', width: 130, type: 'number', editable: true},
        { field: 'carried-by', headerName: 'Carried By', width: 150, editable: true},
        { field: 'rarity-name', headerName: 'Rarity', width: 130, editable: true},
        {
          field: 'deleteButton',
          headerName: 'Actions',
          description: 'Actions column.',
          sortable: false,
          width: 160,
          renderCell: (params) => {
            return (
              <Button
                onClick={(e) => onButtonClick(e, params.row)}
                variant="contained"
              >
                Delete
              </Button>
            );
          },
        },
        { field: 'notes', headerName: 'Notes', width: 500, editable: true},
      ];
      

    if (!(filteredRows && columns)) {
        return (
            <div>No items found :(</div>
        );
    }

    return (
        <div style={{ height: filteredField ? 'calc(40vh)' : 'calc(80vh)', width: '100%' }}>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10, 50, rows.length > 50 ? rows.length : 100]}                
            />
        </div>
    );
}