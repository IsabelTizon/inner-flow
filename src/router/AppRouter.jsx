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
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreatePose from "../pages/admin/poses/CreatePose";
// import PoseList from "../pages/admin/poses/PoseList";
// import EditPose from "../pages/admin/poses/EditPose";
import DailyMenu from "../pages/dailyMenu/DailyMenu";
import Contact from "../pages/contact/Contact";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/poses" element={<Poses />} />
				<Route path="/sequences" element={<Poses />} />
				<Route path="/classes" element={<Poses />} />
				<Route path="/dailyMenu" element={<DailyMenu />} />
				<Route path="/shop" element={<Poses />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/shopping-cart" element={<Poses />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AdminDashboard />} />
				<Route
					path="/admin/poses/create"
					element={<CreatePose />}
				/>
				{/* <Route path="/admin/poses" element={<PoseList />} />
				<Route
					path="/admin/poses/edit/:id"
					element={<EditPose />}
				/> */}
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default AppRouter;
