import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const Cell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Poppins',
  color: '#333333',
  textAlign: 'center',
  fontSize: '15px',
  lineHeight: '21px',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#6D66CC',
    color: theme.palette.common.white,
    fontWeight: '600'
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    borderRadius: '5px',
    padding: '10px'
  }
}));
export default Cell;
