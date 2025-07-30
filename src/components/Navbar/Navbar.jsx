// Router
import { Link } from "react-router-dom";
// Styles
import styles from "./Navbar.module.css";
// Assets
import logo from "../../assets/logo.png";
// hooks
import useToggle from "../../hooks/useToggle";
import useDropdown from "../../hooks/useDropdown";
import { useAuth } from "../../hooks/useAuth";
// Icons
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
	const [isOpen, toggle] = useToggle();
	const yogaDropdown = useDropdown();
	const userDropdown = useDropdown();

	// Auth hook to manage user state
	// Object Destructuring
	const { isLoggedIn, isAdmin, user, logout, loading } =
		useAuth();

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
				<li className={styles.navItemWithDropdown}>
					<span
						className={styles.navLink}
						onClick={yogaDropdown.toggle}
					>
						Yoga ▾
					</span>
					{yogaDropdown.isOpen && (
						<div className={styles.dropdownMenu}>
							<Link
								to="/poses"
								onClick={yogaDropdown.close}
							>
								Poses
							</Link>
							<Link
								to="/sequences"
								onClick={yogaDropdown.close}
							>
								Sequences
							</Link>
							<Link
								to="/classes"
								onClick={yogaDropdown.close}
							>
								Classes
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
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						Shop
					</Link>
				</li>
				{/* Contact */}
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/contact">
						Contact
					</Link>
				</li>
				{/* Shopping Cart */}
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						<FaShoppingCart />
					</Link>
				</li>
				{/* user register/login */}
				<li className={styles.navItemWithDropdown}>
					<span
						className={styles.navLink}
						onClick={userDropdown.toggle}
						role="button"
						aria-haspopup="true" // Indicates that this element has a dropdown menu
						aria-expanded={userDropdown.isOpen} // Indicates whether the dropdown is open or closed
						title="Access your account" // Provides a tooltip for the icon
					>
						<FaUser />
					</span>

					{userDropdown.isOpen && (
						<div className={styles.dropdownMenu}>
							{!isLoggedIn ? (
								<>
									<Link
										to="/login"
										onClick={userDropdown.close} // Redirects to login page and closes the dropdown
									>
										Login
									</Link>
									<Link
										to="/register"
										onClick={userDropdown.close} // Redirects to register page and closes the dropdown
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
											userDropdown.close();
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
