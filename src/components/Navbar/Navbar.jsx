// Components
import { Link } from "react-router-dom";
// Styles
import styles from "./Navbar.module.css";
// Assets
import logo from "../../assets/logo.png";
// hooks
import useToggle from "../../hooks/useToggle";
import useDropdown from "../../hooks/useDropdown";
// Icons
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
	const [isOpen, toggle] = useToggle();
	const yogaDropdown = useDropdown();
	const userDropdown = useDropdown();

	const isLoggedIn = true; //
	const isAdmin = true;
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
						aria-haspopup="true"
						aria-expanded={userDropdown.isOpen}
						title="Accede a tu cuenta"
					>
						<FaUser />
					</span>

					{userDropdown.isOpen && (
						<div className={styles.dropdownMenu}>
							<Link
								to="/login"
								onClick={userDropdown.close}
							>
								Login
							</Link>
							<Link
								to="/register"
								onClick={userDropdown.close}
							>
								Register
							</Link>
						</div>
					)}
				</li>
				{/* Admin panel (solo para admin) */}
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
