import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
// HOME
import Home from "../pages/home/Home";
// PAGES
import DailyMenu from "../pages/dailyMenu/DailyMenu";
import RecipeMeal from "../pages/dailyMenu/recipeMeal";
import Contact from "../pages/contact/Contact";
// GLOBAL
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// YOGA
import Poses from "../pages/yoga/Poses";
import Sequences from "../pages/yoga/Sequences";
import Community from "../pages/yoga/Community";
// AUTH
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
// ADMIN
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreatePoseForm from "../pages/admin/poses/CreatePoseForm";
import EditPose from "../pages/admin/poses/EditPose";
import EditPoseForm from "../pages/admin/poses/EditPoseForm";
// LEGAL
import Terms from "../pages/legal/Terms";
import Privacy from "../pages/legal/Privacy";
import Cookies from "../pages/legal/Cookies";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/poses" element={<Poses />} />
				<Route
					path="/admin/poses/create"
					element={<CreatePoseForm />}
				/>
				<Route
					path="/admin/poses/editPose"
					element={<EditPose />}
				/>
				<Route
					path="/admin/poses/editPose/editPoseForm/:id"
					element={<EditPoseForm />}
				/>
				<Route path="/sequences" element={<Sequences />} />
				<Route path="/community" element={<Community />} />
				<Route path="/dailyMenu" element={<DailyMenu />} />
				<Route
					path="/dailyMenu/:name"
					element={<RecipeMeal />}
				/>
				<Route path="/contact" element={<Contact />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/privacy" element={<Privacy />} />
				<Route path="/cookies" element={<Cookies />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default AppRouter;
