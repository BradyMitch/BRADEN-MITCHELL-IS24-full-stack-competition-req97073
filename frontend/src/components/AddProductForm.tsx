import {
  Box,
  Divider,
  TextField,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import MultiSelect from './MultiSelect';
import React, { useState } from 'react';

interface IAddProductFormProps {
  onSubmit: Function;
}

/**
 * Form for adding a new product.
 * @param props
 * @param {Function} props.onSubmit - Function called when the form is submitted.
 */
const AddProductForm = (props: IAddProductFormProps) => {
  const { onSubmit } = props;

  // State.
  const [productName, setProductName] = useState<string>('');
  const [productOwnerName, setProductOwnerName] = useState<string>('');
  const [developers, setDevelopers] = useState<string[]>([]);
  const [scrumMasterName, setScrumMasterName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [methodology, setMethodology] = useState<string>('');
  const [developerToAdd, setDeveloperToAdd] = useState<string>('');

  // Add developer to list of developers.
  const handleAddDeveloperClick = () => {
    setDevelopers([...developers, developerToAdd]);
    setDeveloperToAdd('');
  };

  // Submit the new product.
  const handleOnSaveClick = () => {
    const product = {
      productId: 0,
      productName,
      productOwnerName,
      developers,
      scrumMasterName,
      startDate,
      methodology,
    };
    onSubmit(product);
  };

  // Format date into "YYYY/MM/DD" formatted string.
  const formatDateString = (date: Date) => {
    const formattedDate = date
      .toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/-/g, '/');
    setStartDate(formattedDate);
  };

  return (
    <Box sx={{ marginLeft: '15px', marginRight: '15px', marginBottom: '15px' }}>
      <Stack spacing={2}>
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                format="YYYY/MM/DD"
                onChange={(value) => formatDateString(new Date((value as Date).toString()))}
              />
            </LocalizationProvider>

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
              startDate === '' ||
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

export default AddProductForm;
