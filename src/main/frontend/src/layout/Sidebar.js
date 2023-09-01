import React from 'react';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import WorkIcon from '@mui/icons-material/Work';


import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';


export default function Sidebar(props) {
    const drawerWidth = props.drawerWidth;
    const [open, setOpen] = React.useState(false);

      const handleClick = () => {
        setOpen(!open);
      };

  return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon sx ={{minWidth:40}}>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="근태관리" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                            <ListItemButton sx={{ pl: 7, height:30}}>
                                <ListItemText primary="근태조회"/>
                            </ListItemButton>
                    </Collapse>
                </List>
            </Drawer>
        </Box>
  );
}