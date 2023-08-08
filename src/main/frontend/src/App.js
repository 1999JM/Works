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

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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

// Layout 컴포넌트는 일반적인 레이아웃 구성 (헤더, 사이드바 등)을 가짐
function Layout() {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={11}>
                        <Header />
                        <Outlet />
                        <Footer />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
