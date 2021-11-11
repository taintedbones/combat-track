import { useState } from "react";
import { useStyles } from "../../ThemeProvider";

import { DataGrid, GridSortModel, GridRowId } from "@mui/x-data-grid";
import { GiAxeSword } from "react-icons/gi";
import { columns } from "./CombatColumns";
import { Grid, Typography, ClickAwayListener } from "@mui/material";

export default function CombatDataTable({ actors, turnId, onActorSelect, onCellCommit }) {
  const classes = useStyles();
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "initiative",
      sort: "desc",
    },
  ]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">
          <GiAxeSword /> Combat <GiAxeSword />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ClickAwayListener onClickAway={() => setSelectionModel([])}>
          <DataGrid
            className={classes.dataGrid}
            rows={actors}
            columns={columns}
            // sortModel={sortModel}
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
    </>
  );
}
