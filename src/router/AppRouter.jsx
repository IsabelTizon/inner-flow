import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Poses from "../pages/Yoga/Poses";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

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
				<Route path="/register" element={<Poses />} />
				<Route path="/login" element={<Poses />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default AppRouter;
