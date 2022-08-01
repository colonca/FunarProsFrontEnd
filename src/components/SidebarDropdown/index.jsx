import React from 'react';
import {
  Accordion as AccordionMaterial,
  AccordionDetails as AccordionDetailsMaterial,
  AccordionSummary,
  Box,
  Stack,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';

const Icon = styled(ExpandMoreIcon)(() => ({
  color: 'white'
}));

const AcordionPersonalized = styled(AccordionMaterial)(() => ({
  color: 'white',
  boxShadow: 'none',
  padding: '4px',
  fontStyle: '#FFFFFF',
  background: '#6D66CC',
  border: 'none',
  '&.Mui-expanded': {
    margin: '0'
  },
  '&::before': { display: 'none' }
}));

const AccordionDetailsPersonalized = styled(AccordionDetailsMaterial)(() => ({
  paddingRight: '0px'
}));
function SidebarDropdown(props) {
  const { title, children, icon } = props;
  // const [open, setOpen] = useState(false);
  return (
    <div>
      <AcordionPersonalized>
        <AccordionSummary
          id="panel-1-header"
          aria-controls="panel-1-content"
          expandIcon={<Icon />}
        >
          <Stack direction="row" spacing={2}>
            {icon}
            <Typography color="white">{title}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetailsPersonalized>
          <Box>{children}</Box>
        </AccordionDetailsPersonalized>
      </AcordionPersonalized>
    </div>
  );
}

export default SidebarDropdown;
