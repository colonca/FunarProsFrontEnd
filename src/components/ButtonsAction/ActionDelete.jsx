import React from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ActionButton from './ActionButton';

function ActionDelete({ onClick }) {
  return (
    <ActionButton onClick={onClick}>
      <DeleteOutlineOutlinedIcon style={{ color: 'red' }} />
    </ActionButton>
  );
}

export default ActionDelete;
