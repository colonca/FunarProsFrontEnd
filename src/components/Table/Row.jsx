import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

const Row = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: '0'
  },

  '&:last-child td:first-of-type': {
    borderBottomLeftRadius: '20px'
  },

  '&:last-child td:last-child': {
    borderBottomRightRadius: '20px'
  }
}));

export default Row;
