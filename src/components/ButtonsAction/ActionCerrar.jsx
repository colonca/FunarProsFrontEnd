import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React from 'react';
import ActionButton from './ActionButton';

function ActionCerrar({ onClick }) {
  return (
    <ActionButton onClick={onClick}>
      <CloseOutlinedIcon />
    </ActionButton>
  );
}

export default ActionCerrar;
