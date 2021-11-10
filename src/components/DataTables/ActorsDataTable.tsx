import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext";
import { useActors, useCustomActors, useUsers } from "../../hooks/useDatabase";
import { columns } from "./ActorsColumns";


export default function DataTable({ classes }) {
  const authContext = useContext(AuthContext);
  const { error, loading, customActors, setUserId } = useCustomActors(authContext.user);

  useEffect(() => {
    // check specifically for !== false because user object is false or holds user
    if(authContext.user !== false) {
      setUserId(authContext.user.uid);
    }
  }, [authContext]); // useEffect for combat events

  return (
    <div className={classes.container}>
      <DataGrid
        rows={customActors}
        columns={columns}
        loading={loading}
        hideFooterPagination
        className={classes.dataGrid}
      />
    </div>
  );
}
