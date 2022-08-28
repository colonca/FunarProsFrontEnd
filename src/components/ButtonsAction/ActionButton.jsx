import React from 'react';
import { styled } from '@mui/material';

const Button = styled('button')(() => ({
  border: 'none',
  backgroundColor: 'transparent',
  color: '#6D66CC',
  cursor: 'pointer'
}));
function ActionButton({ children, onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      {children}
    </Button>
  );
}
export default ActionButton;
