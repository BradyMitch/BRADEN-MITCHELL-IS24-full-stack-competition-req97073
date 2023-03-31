import React from 'react';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
} from '@mui/material';
import { Cancel as CancelIcon, Check as CheckIcon } from '@mui/icons-material';

interface IMultiSelectProps {
  options: string[];
  selected: string[];
  setSelected: Function;
  label: string;
  width?: string | number;
}

/**
 * Reusable MultiSelect Component
 * Allows user to select multiple options from a list.
 * @param props
 * @param {string[]} props.options - An array of options to choose from.
 * @param {string[]} props.selected - Options have been selected.
 * @param {Function} props.setSelected - Setter for updating selected state.
 * @param {string} props.label - Label of the selection input.
 * @param {string | number} props.selected - (optional) Custom width of the selection component.
 */
const MultiSelect = (props: IMultiSelectProps) => {
  const { options, label, width = 500, selected, setSelected } = props;

  return (
    <FormControl sx={{ width }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => setSelected(selected.filter((item) => item !== value))}
                deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
              />
            ))}
          </Stack>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} sx={{ justifyContent: 'space-between' }}>
            {option}
            {selected.includes(option) ? <CheckIcon color="info" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
