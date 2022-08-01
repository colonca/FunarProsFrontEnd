import styled from '@emotion/styled';
import { Button as ButtonMaterial } from '@mui/material';

const ButtonCommon = styled(ButtonMaterial)(() => ({
  borderRadius: '20px',
  padding: '8px 3rem',
  textTransform: 'capitalize',
  '&.MuiButton-outlined': {
    color: '#6D66CC',
    border: '1px solid #3366cc'
  },
  '&.MuiButton-outlinedSecondary': {
    backgroundColor: 'white'
  },
  '&.MuiButton-outlinedInherit': {
    color: 'white',
    border: '1px solid white'
  },
  '&.MuiButton-textPrimary': {
    backgroundColor: '#6D66CC',
    color: 'white'
  },
  '&.MuiButton-textPrimary:hover': {
    backgroundColor: '#6D66CC'
  },
  '&.Mui-disabled': {
    backgroundColor: '#BABABA',
    color: '#f1f2f2'
  }
}));
export default ButtonCommon;
