import { GridColDef } from '@mui/x-data-grid';

// Used in DataTable for displaying products.
const productColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 10 },
  {
    field: 'productName',
    headerName: 'Product Name',
    type: 'string',
    width: 220,
  },
  {
    field: 'productOwnerName',
    headerName: 'Product Owner',
    type: 'string',
    width: 150,
  },
  {
    field: 'developers',
    headerName: 'Developers',
    type: 'string',
    width: 250,
  },
  {
    field: 'scrumMasterName',
    headerName: 'Scrum Master',
    type: 'string',
    width: 150,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    type: 'string',
    width: 120,
  },
  {
    field: 'methodology',
    headerName: 'Methodology',
    type: 'string',
    width: 120,
  },
];

export default productColumns;
