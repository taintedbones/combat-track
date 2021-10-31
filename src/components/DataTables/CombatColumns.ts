import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
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
    field: "hp",
    headerName: "HP",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
  },
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
    field: "type",
    headerName: "type",
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
];
