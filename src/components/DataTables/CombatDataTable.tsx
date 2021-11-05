import {
  DataGrid,
  GridSortModel,
  GridRowParams,
  MuiEvent,
  GridCallbackDetails,
} from '@mui/x-data-grid';
import { GiAxeSword } from "react-icons/gi";
import { columns } from './CombatColumns';
import { useState } from 'react';
import React from 'react';
import { Grid, Typography } from '@mui/material';

export default function CombatDataTable({
  actors,
  styling,
  turnId,
  onActorSelect,
  onCellCommit,
}) {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'initiative',
      sort: 'desc',
    },
  ]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h4"><GiAxeSword /> Combat <GiAxeSword /></Typography>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          className={styling}
          rows={actors}
          columns={columns}
          sortModel={sortModel}
          hideFooterPagination
          onCellEditCommit={onCellCommit}
          getRowClassName={(rowId) => {
            return `rowTheme-selected-${rowId.id === turnId}`;
          }}
          onRowClick={onActorSelect}
        />
      </Grid>
    </React.Fragment>
  );
}
