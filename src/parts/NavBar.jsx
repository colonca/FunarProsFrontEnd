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
              borderRadius: '10px'
            }}
          >
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar>
                  <CalendarMonthOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText primary="12/12/2022" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar>
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
