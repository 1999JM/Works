import Home from './home/Home';
import Login from './member/Login';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Membership from './member/Membership';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
/*BrowserRouter: <BrowserRouter> 컴포넌트는 애플리케이션 전체에서 라우터를 활성화
Routes와 Route: <Routes>와 <Route> 컴포넌트는 라우터 경로를 정의하고 컴포넌트와 매핑하는 데 사용
Outlet: Outlet 중첩된 라우터를 사용할 때, 하위 라우터에서 정의된 컴포넌트들을 부모 라우터에서 표시하는 데에는 Outlet 컴포넌트를 사용합니다.
*/

import { AppBar, Toolbar, Typography, CssBaseline, Container } from '@mui/material';

import * as React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


export default function App() {
    return (
	 <BrowserRouter>
        <Routes>
            <Route path={'/login'} element={<Login />}></Route>
            <Route path='/'  element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/membership' element={<Membership />} />
            </Route>
        </Routes>
	</BrowserRouter>
    );
}

// Layout 컴포넌트는 일반적인 레이아웃 구성 (헤더, 사이드바 등)을 가짐
function Layout() {
    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <Header drawerWidth = {drawerWidth}/>
          <Sidebar drawerWidth = {drawerWidth} />

          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Typography paragraph>
                <Outlet />
            </Typography>
          </Box>
        </Box>
    );
}
