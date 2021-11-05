import { DataGrid, GridSortModel, GridRowParams, MuiEvent, GridCallbackDetails, GridRowId } from "@mui/x-data-grid";
import { GiAxeSword } from "react-icons/gi";
import { columns } from "./CombatColumns";
import { useState } from "react";
import React from "react";
import { Grid, Typography, ClickAwayListener } from "@mui/material";

export default function CombatDataTable({ actors, styling, turnId, onActorSelect, onCellCommit }) {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "initiative",
      sort: "desc",
    },
  ]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h4">
          <GiAxeSword /> Combat <GiAxeSword />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ClickAwayListener onClickAway={() => setSelectionModel([])}>
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
            selectionModel={selectionModel}
            onSelectionModelChange={(selectionModel) => setSelectionModel(selectionModel)}
          />
        </ClickAwayListener>
      </Grid>
    </React.Fragment>
  );
}
