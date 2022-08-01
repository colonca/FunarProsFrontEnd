import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CustomTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    height: '6px'
  },
  '& > MuiInputBase-root-MuiOutlinedInput-root': {
    fontFamily: 'Poppins'
  },
  '& .MuiFormHelperText-root': {
    color: '#A80521 !important',
    marginLeft: '0 !important',
    marginTop: '7px !important',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '17px'
  }
}));

export default function DatePickerCommon({
  label,
  value,
  onChange,
  isInvalid = false,
  error,
  clear,
  required = false
}) {
  return (
    <FormControl sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormLabel>{label}</FormLabel>
        {required && <FormLabel sx={{ color: '#A80521' }}>*</FormLabel>}
      </Stack>
      <DatePicker
        inputFormat="dd/MM/yyyy"
        maxDate={new Date()}
        value={value !== undefined ? value : null}
        onChange={onChange}
        renderInput={(params) => (
          <CustomTextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            error={isInvalid}
            helperText={error}
            required={required}
            inputProps={{
              ...params.inputProps,
              placeholder: 'DD/MM/AAAA',
              endAdornment: (
                <>
                  {!value && params.InputProps.endAdornment}
                  {value && (
                    <Button onClick={clear}>
                      <CloseOutlinedIcon />
                    </Button>
                  )}
                </>
              )
            }}
            fullWidth
          />
        )}
      />
    </FormControl>
  );
}
