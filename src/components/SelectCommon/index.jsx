import Select from 'react-select';
import React from 'react';
import { FormControl, FormLabel, Stack } from '@mui/material';

const customStyles = {
  option: (styles) => ({
    ...styles,
    fontFamily: 'Poppins'
  }),
  placeholder: (styles) => ({
    ...styles,
    fontFamily: 'Poppins'
  }),
  singleValue: (styles) => ({
    ...styles,
    fontFamily: 'Poppins'
  })
};
function SelectCommon(props) {
  const {
    label,
    name,
    value,
    required,
    options,
    onChange,
    error = '',
    isMulti
  } = props;
  return (
    <FormControl sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1}>
        <FormLabel>{label}</FormLabel>
        {required && <FormLabel sx={{ color: '#A80521' }}>*</FormLabel>}
      </Stack>
      <Select
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        styles={customStyles}
        isMulti={isMulti}
      />
      {error && (
        <FormLabel sx={{ color: '#A80521', marginTop: '2px' }}>
          {error}
        </FormLabel>
      )}
    </FormControl>
  );
}

export default SelectCommon;
