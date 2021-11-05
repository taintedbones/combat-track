import { DataGrid } from "@mui/x-data-grid";
import { useActors, useUsers } from "../../hooks/useDatabase";
import { columns } from "./ActorsColumns";

export default function DataTable({ classes }) {
  const { error, loading, actors } = useActors();
  const { users } = useUsers();

  return (
    <div className={classes.container}>
      <DataGrid rows={actors} columns={columns} hideFooterPagination className={classes.dataGrid} />
    </div>
  );
}
