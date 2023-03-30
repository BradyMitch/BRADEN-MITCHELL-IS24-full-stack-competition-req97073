import { Box, Stack } from '@mui/material';
import { PageLayout } from 'layouts';
import { DataTable, ProductsTableHeader, productColumns } from 'components';
import useProductsService from 'services/useProductsService';
import { ProductState } from 'services/productsReducer';
import React, { useState, useEffect } from 'react';

const sx = {
  landingPage: { marginTop: '6.5vh' },
  section: {
    height: '85vh',
    backgroundColor: 'var(--white)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const LandingPage = () => {
  const { state: productsState, getProducts, removeProduct } = useProductsService();
  const [products, setProducts] = useState(productsState);

  // Get products on component mount.
  useEffect(() => {
    getProducts();
  }, []);

  // Update products when productsState changes.
  useEffect(() => {
    // Format the rows.
    const rowProducts = productsState.map((product: ProductState) => ({
      id: product.productId,
      productName: product.productName,
      productOwnerName: product.productOwnerName,
      developers: product.developers.join(', '),
      scrumMasterName: product.scrumMasterName,
      startDate: product.startDate,
      methodology: product.methodology,
      onEditClick,
      onDeleteClick: removeProduct,
    }));
    setProducts(rowProducts);
  }, [productsState]);

  const onAddClick = () => {
    //
  };

  const onEditClick = (productId: number) => {
    //
  };

  return (
    <Stack sx={sx.landingPage}>
      <Box sx={sx.section}>
        <PageLayout>
          <Stack spacing="5px">
            <ProductsTableHeader onAddClick={onAddClick} />
            <DataTable cols={productColumns} rows={products} pageSize={8} height={526} />
          </Stack>
        </PageLayout>
      </Box>
    </Stack>
  );
};

export default LandingPage;
