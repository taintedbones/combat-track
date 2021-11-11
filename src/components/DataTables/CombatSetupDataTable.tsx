import { useStyles } from "../../ThemeProvider";

import { Grid, Typography } from "@mui/material";
import { DataGrid, GridCellEditCommitParams } from "@mui/x-data-grid";
import { GiDiceShield } from "react-icons/gi";
import { columns } from "./CombatSetupColumns";

export default function CombatSetupDataTable({ actors, loading, onActorSelect, onCellCommit }) {
  const classes = useStyles();
  return (
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">
          <GiDiceShield /> Combat Setup <GiDiceShield />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          className={classes.dataGrid}
          rows={actors}
          columns={columns}
          loading={loading}
          onCellEditCommit={(params: GridCellEditCommitParams) => {
            onCellCommit(params);
          }}
          onRowClick={onActorSelect}
          hideFooterPagination
        />
      </Grid>
    </Grid>
  );
}
