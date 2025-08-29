// Router
import { Link } from "react-router-dom";
// Styles
import styles from "../footer.module.css";

export default function LegalLinks() {
	return (
		<div className={styles.section}>
			<h3 className={styles.title}>LEGAL</h3>
			<ul className={styles.list}>
				<li>
					<Link className={styles.navLink} to="/terms">
						Terms & Conditions
					</Link>
				</li>
				<li>
					<Link className={styles.navLink} to="/privacy">
						Privacy Policy
					</Link>
				</li>
				<li>
					<Link className={styles.navLink} to="/cookies">
						Cookies Policy
					</Link>
				</li>
			</ul>
		</div>
	);
}
