import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Poses from "../pages/Poses/Poses";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/poses" element={<Poses />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default AppRouter;
