import { Button, Stack } from '@mui/material';
import React from 'react';

interface IProductsTableHeader {
  onAddClick: Function;
}

/**
 * Header above Products table to display actions.
 * @param props
 * @param {Function} props.onAddClick - Function called when add btn is clicked.
 */
const ProductsTableHeader = (props: IProductsTableHeader) => {
  const { onAddClick } = props;
  return (
    <Stack direction="row-reverse" spacing={1} sx={{ marginBottom: '10px' }}>
      <Button variant="contained" onClick={() => onAddClick()}>
        Add New Product
      </Button>
    </Stack>
  );
};

export default ProductsTableHeader;
