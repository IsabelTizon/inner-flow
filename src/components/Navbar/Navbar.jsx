import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<div>
				<Link to="/">Logo</Link>
			</div>
			<ul className={styles.navItems}>
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
