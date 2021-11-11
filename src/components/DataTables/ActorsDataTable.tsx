import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext";
import { useActors, useCustomActors, useUsers } from "../../hooks/useDatabase";
import { columns } from "./ActorsColumns";

// const style = {
//   grid: {

//   }
// };

export default function DataTable({ classes, actors, loading, onSelect, selected }) {
  return (
    <div className={classes.container}>
      <DataGrid
        rows={actors}
        columns={columns}
        loading={loading}
        hideFooter
        className={classes.dataGrid}
        onRowClick={onSelect}
        getRowClassName={(rowId) => {
          let theme = `rowTheme-selected-false`;
          if(selected !== undefined) {
            theme = `rowTheme-selected-${rowId.id === selected.id}`;
          }
          return theme;
        }}
      />
    </div>
  );
}
