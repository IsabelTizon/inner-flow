import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import useToggle from "../../hooks/useToggle";

export default function Navbar() {
	const [isOpen, toggle] = useToggle();
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
				<li className={styles.navItem}>
					<Link className={styles.navLink} to="/">
						Yoga
					</Link>
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
