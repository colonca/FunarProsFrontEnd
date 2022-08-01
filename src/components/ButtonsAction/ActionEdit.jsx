import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ActionButton from './ActionButton';

function ActionEdit({ onClick }) {
  return (
    <ActionButton onClick={onClick}>
      <EditOutlinedIcon />
    </ActionButton>
  );
}

export default ActionEdit;
