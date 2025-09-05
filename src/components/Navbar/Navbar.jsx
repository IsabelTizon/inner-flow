// Router
import { Link, useNavigate } from "react-router-dom";
// Styles
import styles from "./Navbar.module.css";
import Btn from "../globals/Buttons/Btn";
// Assets
import logo from "../../assets/logo.png";
// hooks
import useToggle from "../../hooks/useToggle";
import useDropdownManager from "../../hooks/useDropdownManager";
import { useAuth } from "../../context/useAuth"; // Custom hook to access authentication state and methods
// Icons
import { FaUser } from "react-icons/fa";

export default function Navbar() {
	const [isOpen, toggle] = useToggle(); // isOpen State toggle to false or true
	const {
		toggleDropdown,
		closeAllDropdowns,
		isDropdownOpen,
	} = useDropdownManager(); // Custom hook to manage dropdown states: 1)Dropdown trigger button opened/closed, 2) close all clicking outside dropdown, 3) checks whether a specific dropdown is currently open
	const navigate = useNavigate(); // state to navigate to different routes
	const DROPDOWN_IDS = {
		YOGA: "yoga",
		USER: "user",
	}; // Object to define dropdown IDs
	const { isLoggedIn, isAdmin, user, logout, loading } =
		useAuth(); // Accessing authentication states

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
					<Link
						className={styles.navLink}
						to="/dailyMenu"
						onClick={toggle}
					>
						Daily Menu
					</Link>
				</li>
				{/* Contact */}
				<li className={styles.navItem}>
					<Link
						className={styles.navLink}
						to="/contact"
						onClick={toggle}
					>
						Contact
					</Link>
				</li>
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
						role="button" // Indicates behavior of the span element is a button
						aria-expanded={isDropdownOpen(
							DROPDOWN_IDS.USER
						)} // Indicates whether the dropdown is open or closed
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
									<span className={styles.welcomeUser}>
										{user?.name
											? `Welcome, ${user.name}!`
											: "Welcome, User!"}
									</span>

									<Btn
										text="Logout"
										variant="tertiary"
										onClick={() => {
											logout();
											closeAllDropdowns();
											navigate("/");
										}}
									></Btn>
								</>
							)}
						</div>
					)}
				</li>
				{/* Admin panel (just for admins) */}
				{isLoggedIn && isAdmin && (
					<li className={styles.navItem}>
						<Link
							className={styles.navLink}
							to="/admin"
							onClick={toggle}
						>
							Admin
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}
