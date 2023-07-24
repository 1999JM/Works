import Login from './member/Login';
import Membership from './member/Membership';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

    return (
	 <BrowserRouter>
		<Routes>
			<Route path={"/login"} element={<Login />}></Route>
			<Route path={"/membership"} element={<Membership />}></Route>
		</Routes>
	</BrowserRouter>
    );
}
export default App;