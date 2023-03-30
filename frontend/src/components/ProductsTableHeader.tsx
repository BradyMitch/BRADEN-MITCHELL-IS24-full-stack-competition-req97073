import { Box, Button, Stack } from '@mui/material';
import React from 'react';

interface IProductsTableHeader {
  onAddClick: Function;
}

/**
 * Header above Products table to display actions.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param props
 */
const ProductsTableHeader = (props: IProductsTableHeader) => {
  const { onAddClick } = props;
  return (
    <Stack direction="row-reverse" spacing={1}>
      <Button onClick={() => onAddClick}>Add New Product</Button>
    </Stack>
  );
};

export default ProductsTableHeader;
