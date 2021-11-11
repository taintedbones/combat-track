import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext";
import { useActors, useCustomActors, useUsers } from "../../hooks/useDatabase";
import { columns } from "./ActorsColumns";


export default function DataTable({ classes, actors, loading, onSelect }) {
  return (
    <div className={classes.container}>
      <DataGrid
        rows={actors}
        columns={columns}
        loading={loading}
        hideFooterPagination
        className={classes.dataGrid}
        onRowClick={onSelect}
      />
    </div>
  );
}
