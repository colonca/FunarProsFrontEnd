import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Avatar,
  ListItemAvatar
} from '@mui/material';
import React from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Navbar() {
  const fecha = new Date();
  const fechaActual = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;
  return (
    <Stack
      direction="row"
      sx={{
        borderBottom: '1px solid #A4A4A4',
        height: '70px',
        background: '#FAFAFA'
      }}
    >
      <Stack sx={{ padding: '10px', justifyContent: 'center' }} flexGrow={1}>
        <Typography>FUNARPROS</Typography>
      </Stack>

      <Stack>
        <List sx={{ display: 'flex' }}>
          <ListItem
            style={{
              background: '#0ADDC4',
              borderRadius: '10px',
              height: '40px',
              margin: '10px'
            }}
          >
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar sx={{ height: '35px', width: '35px' }}>
                  <CalendarMonthOutlinedIcon
                    sx={{ height: '30px', color: 'white' }}
                  />
                </Avatar>
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText sx={{ color: 'white' }}>{fechaActual}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar sx={{ height: '35px', width: '35px' }}>
                  <NotificationsOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListItemAvatar>
                <AccountCircleOutlinedIcon />
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText />
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
}

export default Navbar;
