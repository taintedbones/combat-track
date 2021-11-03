import { GridColDef } from "@mui/x-data-grid";
import { renderSpinner } from "../../views/Combat/Combat";

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerClassName: "col-header",
    editable: true,
    sortable: false,
  },
  {
    field: "initiative",
    headerName: "Initiative",
    flex: 1,
    headerClassName: "col-header",
    editable: false,
    sortable: false,
    type: "number",
  },
  {
    field: "hp",
    headerName: "HP",
    flex: 1,
    headerClassName: "col-header",
    editable: false,
    sortable: false,
    type: "number",
    renderCell: renderSpinner,
  },
  {
    field: "ac",
    headerName: "AC",
    flex: 1,
    headerClassName: "col-header",
    editable: false,
    sortable: false,
    renderCell: renderSpinner,
    type: "number",
  },
  {
    field: "dc",
    headerName: "DC",
    flex: 1,
    headerClassName: "col-header",
    editable: false,
    sortable: false,
    renderCell: renderSpinner,
    type: "number",
  },
  {
    field: "type",
    headerName: "type",
    flex: 1,
    headerClassName: "col-header",
    editable: false,
    sortable: false,
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 3,
    headerClassName: "col-header",
    editable: false,
    sortable: false,
  },
];
