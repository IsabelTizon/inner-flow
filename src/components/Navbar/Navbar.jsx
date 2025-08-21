// Router
import { Link, useNavigate } from "react-router-dom";
// Styles
import styles from "./Navbar.module.css";
// Assets
import logo from "../../assets/logo.png";
// hooks
import useToggle from "../../hooks/useToggle";
import useDropdownManager from "../../hooks/useDropdownManager";
import { useAuth } from "../../context/useAuth"; // Custom hook to access authentication state and methods
// Icons
import { FaUser } from "react-icons/fa";
// import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
	const [isOpen, toggle] = useToggle();
	const {
		toggleDropdown,
		closeAllDropdowns,
		isDropdownOpen,
	} = useDropdownManager();
	const navigate = useNavigate();

	// Define dropdown IDs
	const DROPDOWN_IDS = {
		YOGA: "yoga",
		USER: "user",
	};

	// Auth hook to manage user state
	// Object Destructuring
	const { isLoggedIn, isAdmin, user, logout, loading } =
		useAuth(); // Accessing authentication state and methods.

	if (loading) {
		return <nav className={styles.navbar}>Loading...</nav>;
	}

	return (
		<nav className={styles.navbar}>
			<div>
				{/* Logo */}
				<Link to="/">
					<img
						className={styles.logo}
						src={logo}
						alt="logo icon"
					/>
				</Link>
			</div>
			{/* Burger */}
			<button className={styles.burger} onClick={toggle}>
				☰
			</button>
			{/* Menu */}
			<ul
				className={`${styles.navItems} ${
					isOpen ? styles.showMenu : ""
				}`}
			>
				{/* Yoga dropdown */}
				<li
					className={styles.navItemWithDropdown}
					data-dropdown
				>
					<span
						className={styles.navLink}
						onClick={() =>
							toggleDropdown(DROPDOWN_IDS.YOGA)
						}
					>
						Yoga ▾
					</span>
					{isDropdownOpen(DROPDOWN_IDS.YOGA) && (
						<div className={styles.dropdownMenu}>
							<Link to="/poses" onClick={closeAllDropdowns}>
								Poses
							</Link>
							<Link
								to="/sequences"
								onClick={closeAllDropdowns}
							>
								Sequences
							</Link>
							<Link
								to="/community"
								onClick={closeAllDropdowns}
							>
								Community Sequences
							</Link>
						</div>
					)}
				</li>
				{/* Daily Menu */}
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/dailyMenu">
						Daily Menu
					</Link>
				</li>
				{/* Shop */}
				{/* <li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						Shop
					</Link>
				</li> */}
				{/* Contact */}
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/contact">
						Contact
					</Link>
				</li>
				{/* Shopping Cart */}
				{/* <li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						<FaShoppingCart />
					</Link>
				</li> */}
				{/* user register/login */}
				<li
					className={styles.navItemWithDropdown}
					data-dropdown
				>
					<span
						className={styles.navLink}
						onClick={() =>
							toggleDropdown(DROPDOWN_IDS.USER)
						}
						role="button"
						aria-haspopup="true" // Indicates that this element has a dropdown menu
						aria-expanded={isDropdownOpen(
							DROPDOWN_IDS.USER
						)} // Indicates whether the dropdown is open or closed
						title="Access your account" // Provides a tooltip for the icon
					>
						<FaUser />
					</span>

					{isDropdownOpen(DROPDOWN_IDS.USER) && (
						<div className={styles.dropdownMenu}>
							{!isLoggedIn ? (
								<>
									<Link
										to="/login"
										onClick={closeAllDropdowns} // Redirects to login page and closes the dropdown
									>
										Login
									</Link>
									<Link
										to="/register"
										onClick={closeAllDropdowns} // Redirects to register page and closes the dropdown
									>
										Register
									</Link>
								</>
							) : (
								<>
									<span>
										{user?.name
											? `Welcome, ${user.name}!`
											: "Welcome, User!"}
									</span>
									<button
										className={`${styles.navLink} ${styles.logoutButton}`}
										onClick={() => {
											logout();
											closeAllDropdowns();
											navigate("/");
										}}
									>
										Logout
									</button>
								</>
							)}
						</div>
					)}
				</li>
				{/* Admin panel (just for admins) */}
				{isLoggedIn && isAdmin && (
					<li className={styles.navItem}>
						<Link className={styles.navLink} to="/admin">
							Admin
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}
