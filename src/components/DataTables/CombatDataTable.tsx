import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { useActors, useScenarios, useUsers } from "../../hooks/useDatabase";
import { columns } from "./CombatColumns";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 500,
  },
  dataGrid: {
    color: "white",
    "& .col-header": {
      backgroundColor: "purple",
    },
  },
});

export default function DataTable() {
  const classes = useStyles();
  const { error, loading, actors } = useActors();
  const { scenarios } = useScenarios();
  const { users } = useUsers();
  console.log("scenarios ", scenarios);
  console.log("users", users);

  return (
    <div className={classes.root}>
      <DataGrid rows={actors} columns={columns} hideFooterPagination className={classes.dataGrid} />
    </div>
  );
}
