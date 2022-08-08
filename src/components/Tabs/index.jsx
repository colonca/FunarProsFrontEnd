import { Box, Breadcrumbs, Link } from '@mui/material';
import React from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Tabs({ items, step }) {
  return (
    <Box sx={{ padding: '20px 0px 10px 0px  ' }}>
      <Breadcrumbs separator="">
        {items.map((item, index) => (
          <Link
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: step >= index ? '#3366CC' : 'gray',
              textDecoration: 'none'
            }}
            to={item.url}
          >
            {index < step ? (
              <CheckCircleIcon sx={{ mr: 0.5 }} fontSize="large" />
            ) : (
              <RadioButtonUncheckedIcon sx={{ mr: 0.5 }} fontSize="large" />
            )}

            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default Tabs;
