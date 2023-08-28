import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, CssBaseline, Container } from '@mui/material';

export default function Header(props) {
    const drawerWidth = props.drawerWidth;
    return (
        <AppBar
            position="fixed"
            sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Responsive drawer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}