import React from 'react';
import { DataGrid, GridRowsProp, GridColDef, gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
// import FirebaseDataStore from '../FirebaseDataStore';

// temp values. will be replaced with data from firebase
const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'The answer to the universe is', col2: '42' },
  { id: 3, col1: 'onion', col2: 'bless' },
];

// temp values. will be replaced with data from firebase
const columns: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'Column 1',
    flex: 1,
    headerClassName: 'col-header',
    editable: true,
  },
  {
    field: 'col2',
    headerName: 'Column 2',
    flex: 1,
    headerClassName: 'col-header',
    editable: true,
  },
  // experimenting with placing component in table cell
  {
    field: 'col3',
    headerName: 'Column 3',
    flex: 1,
    headerClassName: 'col-header',
    renderCell: () => (
      <TextField
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
        placeholder="0"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
    ),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 500,
  },
  dataGrid: {
    color: 'white',
    '& .col-header': {
      backgroundColor: 'purple',
    },
  },
});

export default function DataTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooterPagination
        className={classes.dataGrid}
      />
    </div>
  );
} 