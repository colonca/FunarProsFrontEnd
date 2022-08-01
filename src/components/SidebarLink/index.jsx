import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import React from 'react';
import { Link as LinkMaterial } from 'react-router-dom';

const LinkPersonalized = styled(LinkMaterial)(() => ({
  textDecoration: 'none',
  fontFamily: 'Poppins',
  color: 'white'
}));
function SidebarLink(props) {
  const { title, icon, link } = props;
  return (
    <Stack direction="row" spacing={2} alignItems="center" padding="10px">
      {icon}
      <LinkPersonalized to={link}>{title}</LinkPersonalized>
    </Stack>
  );
}

export default SidebarLink;
