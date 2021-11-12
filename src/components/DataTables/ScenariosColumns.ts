import { GridColDef } from "@mui/x-data-grid";

//TODO: CHANGE THIS FOR ACTOR COLUMNS
export const columns: GridColDef[] = [
  {
    field: "ac",
    headerName: "AC",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
  },
  {
    field: "dc",
    headerName: "DC",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
  },
  {
    field: "hp",
    headerName: "HP",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
  },
  {
    field: "initiative",
    headerName: "Initiative",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
  },
];
