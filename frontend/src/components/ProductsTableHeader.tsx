import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';

interface IProductsTableHeader {
  onAddClick: Function;
  filterByField: string;
  setFilterInput: Function;
}

/**
 * Header above Products table to display actions.
 * @param props
 * @param {Function} props.onAddClick - Function called when add btn is clicked.
 * @param {string} props.filterByField - Field in the DataTable to filter by.
 * @param {Function} props.setFilterInput - Setter for filterInput state.
 */
const ProductsTableHeader = (props: IProductsTableHeader) => {
  const { onAddClick, filterByField, setFilterInput: setFilterInputProp } = props;
  const [filterInput, setFilterInput] = useState<string>('');
  const [filterLabel, setFilterLabel] = useState<string>('');

  // Update filterLabel every time filterByField changes.
  useEffect(() => {
    setFilterInput('');
    switch (filterByField) {
      case 'productName':
        setFilterLabel('Product Name');
        break;
      case 'productOwnerName':
        setFilterLabel('Product Owner');
        break;
      case 'developers':
        setFilterLabel('Developers');
        break;
      case 'scrumMasterName':
        setFilterLabel('Scrum Master');
        break;
      case 'startDate':
        setFilterLabel('Start Date');
        break;
      case 'methodology':
        setFilterLabel('Methodology');
        break;
      default:
        setFilterLabel('');
    }
  }, [filterByField]);

  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
      {/* FROM THE LEFT */}
      <Stack direction="row">
        {filterByField === '' ? (
          <Typography sx={{ margin: 'auto', color: 'var(--info-blue)' }}>
            To select filter, click on a column header.
          </Typography>
        ) : (
          <>
            <Typography sx={{ margin: 'auto', marginRight: '15px', color: 'var(--info-blue)' }}>
              Filter:
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              label={filterLabel}
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={() => setFilterInputProp(filterInput)}
                sx={{ width: 35, height: 35, margin: '5px' }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Stack>

      {/* FROM THE RIGHT */}
      <Stack direction="row-reverse" spacing={1} sx={{ marginBottom: '10px' }}>
        <Button variant="contained" onClick={() => onAddClick()}>
          Add New Product
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProductsTableHeader;
