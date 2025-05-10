import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";

function App() {


	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/" element={<Dashboard />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
