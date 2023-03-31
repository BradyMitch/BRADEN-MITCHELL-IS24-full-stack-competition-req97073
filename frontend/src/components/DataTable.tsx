import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

interface IDataTable {
  cols: GridColDef[];
  rows: object[];
  pageSize?: number;
  height?: string | number;
  checkboxSelection?: boolean;
  onColumnHeaderClick?: Function;
}

/**
 * Reusable component to display json data in a table.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param props
 * @param {GridColDef[]} props.cols - Definitions of the table columns.
 * @param {object[]} props.rows - Definitions of the table rows.
 * @param {number} props.pageSize - (optional) How many items to display per page.
 * @param {string | number} props.height - (optional) Custom height of the DataTable.
 * @param {boolean} props.checkboxSelection - (optional) If checkbox selection should be enabled.
 * @param {Function} props.onColumnHeaderClick - (optional) Function called when column header is clicked.
 */
const DataTable = (props: IDataTable) => {
  const {
    cols,
    rows,
    pageSize = 10,
    height = 630,
    checkboxSelection = false,
    onColumnHeaderClick = () => {},
  } = props;

  return (
    <Box sx={{ height, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        onColumnHeaderClick={(params) => onColumnHeaderClick(params)}
      />
    </Box>
  );
};

export default DataTable;
