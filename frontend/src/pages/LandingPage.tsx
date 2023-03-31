import { Box, Stack } from '@mui/material';
import { PageLayout } from 'layouts';
import {
  AddProductForm,
  DataTable,
  EditProductForm,
  Modal,
  ProductsTableHeader,
  productColumns,
} from 'components';
import useProductsService from 'services/useProductsService';
import { ProductsState, ProductState } from 'services/productsReducer';
import React, { useState, useEffect } from 'react';
import { GridColumnHeaderParams } from '@mui/x-data-grid';

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

interface IProductRow {
  id: number;
  productName: string;
  productOwnerName: string;
  developers: string;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
  onEditClick: Function;
  onDeleteClick: Function;
}

const LandingPage = () => {
  const {
    state: productsState,
    getProducts,
    addProduct,
    removeProduct,
    editProduct,
  } = useProductsService();

  // State.
  const [editProductModalOpen, setEditProductModalOpen] = useState<boolean>(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductsState>(productsState);
  const [productRowToEdit, setProductRowToEdit] = useState<IProductRow | undefined>(undefined);
  const [filterByField, setFilterByField] = useState<string>('');
  const [filterInput, setFilterInput] = useState<string>('');

  // Get products on component mount.
  useEffect(() => {
    getProducts();
  }, []);

  // Update products when productsState or filterInput changes.
  useEffect(() => {
    // Format the rows.
    let rowProducts = productsState.map((product: ProductState) => ({
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

    // Filter the displayed products.
    if (filterInput !== '')
      rowProducts = rowProducts.filter((product: any) =>
        product[filterByField].includes(filterInput),
      );

    setProducts(rowProducts);
  }, [productsState, filterInput]);

  // Open Edit modal and set edit product state.
  const onEditClick = (row: IProductRow) => {
    setProductRowToEdit(row);
    setEditProductModalOpen(true);
  };

  // Edit product when modal is submitted.
  const handleEditModalSubmit = (productId: number, product: Partial<ProductState>) => {
    editProduct(productId, product);
    setEditProductModalOpen(false);
  };

  // Add product when modal is submitted.
  const handleAddModalSubmit = (product: ProductState) => {
    addProduct(product);
    setAddProductModalOpen(false);
  };

  // Set filter to clicked column.
  const handleColumnHeaderClick = (params: GridColumnHeaderParams) => {
    setFilterInput('');
    if (params.field === 'id') {
      setFilterInput('');
      return;
    }
    setFilterByField(params.field);
  };

  return (
    <Stack sx={sx.landingPage}>
      <Box sx={sx.section}>
        <PageLayout>
          <Stack spacing="5px">
            <ProductsTableHeader
              onAddClick={() => setAddProductModalOpen(true)}
              filterByField={filterByField}
              setFilterInput={setFilterInput}
            />
            <DataTable
              cols={productColumns}
              rows={products}
              pageSize={8}
              height={526}
              onColumnHeaderClick={handleColumnHeaderClick}
            />
          </Stack>
          <Modal
            title="Edit Product"
            open={editProductModalOpen}
            onClose={() => setEditProductModalOpen(false)}
            maxHeight={650}
            width="600px"
          >
            <EditProductForm productRow={productRowToEdit} onSubmit={handleEditModalSubmit} />
          </Modal>
          <Modal
            title="Add Product"
            open={addProductModalOpen}
            onClose={() => setAddProductModalOpen(false)}
            maxHeight={650}
            width="650px"
          >
            <AddProductForm onSubmit={handleAddModalSubmit} />
          </Modal>
        </PageLayout>
      </Box>
    </Stack>
  );
};

export default LandingPage;
