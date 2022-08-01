import React from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ActionButton from './ActionButton';

function ActionView({ onClick }) {
  return (
    <ActionButton onClick={onClick}>
      <RemoveRedEyeOutlinedIcon />
    </ActionButton>
  );
}

export default ActionView;
