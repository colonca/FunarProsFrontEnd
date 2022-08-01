import { Breadcrumbs, Link, Box } from '@mui/material';
import React, { useId } from 'react';

function BreadCrumbs({ items }) {
  const id = useId();
  return (
    <Box>
      <Breadcrumbs sx={{ marginTop: '10px' }} separator=">">
        {items.map((item) => (
          <Link
            key={id}
            sx={{ color: 'black', textDecoration: 'none' }}
            to={item.url}
          >
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default BreadCrumbs;
