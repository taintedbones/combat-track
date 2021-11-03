import {
  DataGrid,
  GridSortModel,
  GridCellEditCommitParams,
  MuiEvent,
  GridCallbackDetails,
} from '@mui/x-data-grid';
import { columns } from './CombatColumns';
import { useState } from 'react';
import React from 'react';
import { Grid, Typography } from '@mui/material';

// export default function DataTable({ actors, turnNum, onCellEdit }) {
export default function CombatDataTable({ actors, styling, turnId}) {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'initiative',
      sort: 'desc',
    },
  ]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h4">Combat</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          className={styling}
          rows={actors}
          columns={columns}
          sortModel={sortModel}
          hideFooterPagination
          onCellEditCommit={(
            params: GridCellEditCommitParams,
            event: MuiEvent<React.SyntheticEvent>,
            details: GridCallbackDetails
          ) => {
            actors.forEach((value, index) => {
              if (value.id === params.id) {
                value.initiative = params.value;
              }
            });
          }}
          getRowClassName={(rowId) => { 
            return `rowTheme-selected-${rowId.id === turnId}`;
          }}
        />
      </Grid>
    </React.Fragment>
  );
}
