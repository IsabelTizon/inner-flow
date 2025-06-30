import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Poses from "../pages/yoga/Poses";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Register from "../pages/users/auth/Register";
import Login from "../pages/users/auth/Login";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/poses" element={<Poses />} />
				<Route path="/sequences" element={<Poses />} />
				<Route path="/classes" element={<Poses />} />
				<Route path="/daily-menu" element={<Poses />} />
				<Route path="/shop" element={<Poses />} />
				<Route path="/contact" element={<Poses />} />
				<Route path="/shopping-cart" element={<Poses />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default AppRouter;
