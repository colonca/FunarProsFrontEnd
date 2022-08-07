import { Box, Breadcrumbs, Link } from '@mui/material';
import React, { useId } from 'react';
import CropSquareIcon from '@mui/icons-material/CropSquare';

function Tabs({ items }) {
  const id = useId();
  return (
    <Box sx={{ padding: '0px 0px 10px 34px ' }}>
      <Breadcrumbs separator="">
        {items.map((item) => (
          <Link
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#3366CC',
              textDecoration: 'none'
            }}
            key={id}
            to={item.url}
          >
            <CropSquareIcon sx={{ mr: 0.5 }} fontSize="large" />
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default Tabs;
