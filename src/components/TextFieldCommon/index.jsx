import styled from '@emotion/styled';
import {
  FormControl,
  FormLabel,
  Stack,
  TextField as TextFieldMaterial,
  Typography
} from '@mui/material';
import React from 'react';

const TextField = styled(TextFieldMaterial)(() => ({
  textDecoration: 'none',
  fontFamily: 'Poppins',
  color: 'white',
  margin: '0px ',
  '&.Mui-focused': {}
}));
function TextFieldCommon(props) {
  const { label, name, onChange, value, required, error } = props;
  return (
    <FormControl sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1}>
        <FormLabel>{label}</FormLabel>
        {required && <FormLabel sx={{ color: '#A80521' }}>*</FormLabel>}
      </Stack>
      <TextField
        onChange={onChange}
        value={value}
        name={name}
        id="outlined-basic"
        size="small"
        error={error}
      />
      {error && <FormLabel sx={{ color: '#A80521' }}>{error}</FormLabel>}
    </FormControl>
  );
}

export default TextFieldCommon;
