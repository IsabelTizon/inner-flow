import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import useToggle from "../../hooks/useToggle";

export default function Navbar() {
	const [isOpen, toggle] = useToggle();
	const [dropdownOpen, toggleDropdown] = useToggle();

	const handleLinkClick = () => {
		console.log(
			"Link clicked, current dropdown state:",
			dropdownOpen
		);
		if (dropdownOpen) {
			toggleDropdown();
		}
	};

	const handleClick = () => {
		console.log(
			"Yoga clicked, current dropdown state:",
			dropdownOpen
		);
		toggleDropdown();
	};

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
						onClick={handleClick}
					>
						Yoga ▾
					</span>
					{dropdownOpen && (
						<div className={styles.dropdownMenu}>
							<Link to="/poses" onClick={handleLinkClick}>
								Poses
							</Link>
							<Link
								to="/sequences"
								onClick={handleLinkClick}
							>
								Sequences
							</Link>
							<Link to="/classes" onClick={handleLinkClick}>
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
