import {
  Box,
  Divider,
  TextField,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MultiSelect from './MultiSelect';
import React, { useState } from 'react';

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

interface IEditProductFormProps {
  productRow: IProductRow | undefined;
  onSubmit: Function;
}

/**
 * Form for editing a product.
 * @param props
 * @param {IProductRow | undefined} props.productRow - Row object from DataTable.
 * @param {Function} props.onSubmit - Function called when the form is submitted.
 */
const EditProductForm = (props: IEditProductFormProps) => {
  const { productRow, onSubmit } = props;
  const productId = productRow?.id ?? 0;

  // State.
  const [productName, setProductName] = useState<string>(productRow?.productName ?? '');
  const [productOwnerName, setProductOwnerName] = useState<string>(
    productRow?.productOwnerName ?? '',
  );
  const [developers, setDevelopers] = useState<string[]>(productRow?.developers.split(', ') ?? []);
  const [scrumMasterName, setScrumMasterName] = useState<string>(productRow?.scrumMasterName ?? '');
  const [methodology, setMethodology] = useState<string>(productRow?.methodology ?? '');
  const [developerToAdd, setDeveloperToAdd] = useState<string>('');

  // Add developer to list of developers.
  const handleAddDeveloperClick = () => {
    setDevelopers([...developers, developerToAdd]);
    setDeveloperToAdd('');
  };

  // Submit the product to be edited.
  const handleOnSaveClick = () => {
    const product = {
      productName,
      productOwnerName,
      developers,
      scrumMasterName,
      methodology,
    };
    onSubmit(productId, product);
  };

  return (
    <Box sx={{ marginLeft: '15px', marginRight: '15px', marginBottom: '15px' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing="5px" sx={{ marginBottom: '-10px' }}>
          <Typography color="var(--dark-gray)">Product ID:</Typography>
          <Typography>{productId}</Typography>
        </Stack>
        <Divider />
        <Box sx={{ height: '5px' }} />

        <Stack direction="row">
          {/* LEFT COLUMN */}
          <Stack spacing={2} sx={{ width: '50%' }}>
            <TextField
              required
              variant="outlined"
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <TextField
              required
              variant="outlined"
              label="Product Owner"
              value={productOwnerName}
              onChange={(e) => setProductOwnerName(e.target.value)}
            />

            <TextField
              required
              variant="outlined"
              label="Scrum Master"
              value={scrumMasterName}
              onChange={(e) => setScrumMasterName(e.target.value)}
            />

            <FormControl>
              <FormLabel>Methodology</FormLabel>
              <RadioGroup
                defaultValue="Agile"
                name="methodology"
                value={methodology}
                onChange={(e) => setMethodology(e.target.value)}
              >
                <FormControlLabel value="Agile" control={<Radio />} label="Agile" />
                <FormControlLabel value="Waterfall" control={<Radio />} label="Waterfall" />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Box sx={{ width: '20px' }} />

          {/* RIGHT COLUMN */}
          <Stack spacing={2} sx={{ width: '50%' }}>
            <MultiSelect
              label="Developers"
              width="100%"
              options={developers}
              selected={developers}
              setSelected={setDevelopers}
            />

            <Stack direction="row">
              <TextField
                variant="outlined"
                label="Add Developer"
                value={developerToAdd}
                onChange={(e) => setDeveloperToAdd(e.target.value)}
                sx={{ width: '90%' }}
                disabled={developers.length >= 5}
                helperText={developers.length >= 5 ? 'Max of 5 developers per product.' : ''}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  sx={{ width: 25, height: 25, margin: '5px' }}
                  onClick={handleAddDeveloperClick}
                  disabled={developers.length >= 5}
                >
                  {developers.length < 5 && <AddIcon color="info" />}
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        {/* FORM Footer */}
        <Divider />
        <Stack direction="row-reverse">
          <Button
            variant="contained"
            onClick={handleOnSaveClick}
            disabled={
              productName === '' ||
              productOwnerName === '' ||
              developers.length === 0 ||
              scrumMasterName === '' ||
              methodology === ''
            }
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditProductForm;
