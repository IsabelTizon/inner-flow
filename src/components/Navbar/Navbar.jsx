import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import useToggle from "../../hooks/useToggle";
import useDropdown from "../../hooks/useDropdown";

export default function Navbar() {
	const [isOpen, toggle] = useToggle();
	const yogaDropdown = useDropdown(); // aquí lo usas

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
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						Daily Menu
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						Shop
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						Contact
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						Shopping Cart
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						Sign In
					</Link>
				</li>
			</ul>
		</nav>
	);
}
