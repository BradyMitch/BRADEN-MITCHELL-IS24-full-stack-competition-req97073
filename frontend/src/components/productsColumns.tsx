import { GridColDef, GridCellParams } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

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
  {
    field: 'edit',
    renderHeader: () => <></>,
    hideSortIcons: true,
    width: 10,
    renderCell: (params: GridCellParams) => (
      <IconButton onClick={() => params.row.onEditClick(params.row)}>
        <Tooltip title="Edit">
          <EditIcon />
        </Tooltip>
      </IconButton>
    ),
  },
  {
    field: 'delete',
    renderHeader: () => <></>,
    hideSortIcons: true,
    width: 10,
    renderCell: (params: GridCellParams) => (
      <IconButton onClick={() => params.row.onDeleteClick(params.row.id)}>
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
    ),
  },
];

export default productColumns;
