import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { columns } from "./CombatColumns";

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

export default function DataTable({ actors, turnNum }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DataGrid
        rows={actors}
        columns={columns}
        hideFooterPagination
        className={classes.dataGrid}
        getRowClassName={(rowId) => `rowTheme-selected-${rowId.id === turnNum}`}
      />
    </div>
  );
}
