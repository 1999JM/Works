import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';

export default function Sidebar(props) {
    const drawerWidth = props.drawerWidth;
    console.log(drawerWidth);
  return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
        variant="temporary"
        ModalProps={{
        keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        >
        </Drawer>
            <Drawer
            variant="permanent"
            sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
        </Drawer>
        </Box>
  );
}