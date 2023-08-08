import * as React from 'react';

import Home from './home/Home';
import Login from './member/Login';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';
import SidebarBackUp from './layout/SidebarBackUp';

import Membership from './member/Membership';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
/*BrowserRouter: <BrowserRouter> 컴포넌트는 애플리케이션 전체에서 라우터를 활성화
Routes와 Route: <Routes>와 <Route> 컴포넌트는 라우터 경로를 정의하고 컴포넌트와 매핑하는 데 사용
Outlet: Outlet 중첩된 라우터를 사용할 때, 하위 라우터에서 정의된 컴포넌트들을 부모 라우터에서 표시하는 데에는 Outlet 컴포넌트를 사용합니다.
*/

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
/* 사이드바에 필요한 import*/
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function App() {
    return (
	 <BrowserRouter>
        <Routes>
            <Route path={'/login'} element={<Login />}></Route>
            <Route path={'/sideBar'} element={<SidebarBackUp />}></Route>
            <Route path='/'  element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/membership' element={<Membership />} />
            </Route>
        </Routes>
	</BrowserRouter>
    );
}
/*레이아웃 설정 영역*/
const drawerWidth = 240;    //펼쳤을때 크기

/*사이드 바 열림*/
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
/*사이드 바 닫힘*/
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

/*사이드 바에 표기할 리스트 그림*/
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// Layout 컴포넌트는 일반적인 레이아웃 구성 (헤더, 사이드바 등)을 가짐
function Layout() {

      const theme = useTheme();
      const [open, setOpen] = React.useState(false);

      const handleDrawerOpen = () => {
        setOpen(true);
      };

      const handleDrawerClose = () => {
        setOpen(false);
      };


    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" open={open}> {/*토글*/}
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h8" noWrap component="div">  {/*헤더*/}
                        <Header />
                    </Typography>
                </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                <DrawerHeader>  {/*토글로 펼쳤을때 최상위 영역*/}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>{/* 사이드 바에 있는 아이템 list*/}
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }} >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                        }}>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
                ))}
                </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <Outlet />
                        <Footer />
                </Box>
            </Box>
        </div>
    );
}
