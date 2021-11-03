import { Grid, Typography } from '@mui/material';
import {
  DataGrid,
  GridCellEditCommitParams,
  MuiEvent,
  GridCallbackDetails,
} from '@mui/x-data-grid';
import { columns } from './CombatSetupColumns';
import React from 'react';
import '../../styles/App.css';

export default function CombatSetupDataTable({ actors, loading, styling }) {
  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <Typography variant="h4">Combat Setup</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          className={styling}
          rows={actors}
          columns={columns}
          hideFooterPagination
          style={{ width: '100%', height: '60vh', color: 'white' }}
          loading={loading}
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
            console.log(actors);
          }}
        />
      </Grid>
    </Grid>
  );
}
