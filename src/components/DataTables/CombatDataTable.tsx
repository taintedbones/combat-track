import { DataGrid, GridSortModel } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { columns } from "./CombatColumns";
import { useState } from "react";

const useStyles = makeStyles(() => {
  return {
    root: {
      width: "100%",
      height: "60vh",
      marginBottom: "5vh",
      "& .rowTheme-selected-true": {
        backgroundColor: "#ED6C02",
      },
    },
    dataGrid: {
      color: "white",
      "& .col-header": {
        backgroundColor: "purple",
      },
    },
  };
});

export default function DataTable({ actors, turnNum, onCellEdit }) {
  const classes = useStyles();

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "initiative",
      sort: "desc",
    },
  ]);

  return (
    <div className={classes.root}>
      <DataGrid
        rows={actors}
        getRowId={(row) => row.index}
        columns={columns}
        sortModel={sortModel}
        hideFooterPagination
        className={classes.dataGrid}
        getRowClassName={(rowId) => `rowTheme-selected-${rowId.id === turnNum}`}
      />
    </div>
  );
}
