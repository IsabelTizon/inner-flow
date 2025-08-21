import { Link } from "react-router-dom";
// Styles
import styles from "../footer.module.css";

export default function QuickLinks() {
	return (
		<>
			<div className={styles.section}>
				<h3 className={styles.title}>QUICK LINKS</h3>
				<ul className={styles.list}>
					<li>
						<li className={styles.navItem}>
							<Link className={styles.navLink} to="/">
								Home
							</Link>
						</li>
					</li>
					<li>
						<li className={styles.navItem}>
							<Link
								className={styles.navLink}
								to="/dailyMenu"
							>
								Daily Menu
							</Link>
						</li>
					</li>
					<li>
						<li className={styles.navItem}>
							<Link
								className={styles.navLink}
								to="/yoga/poses"
							>
								Yoga Poses
							</Link>
						</li>
					</li>
					<li>
						<li className={styles.navItem}>
							<Link
								className={styles.navLink}
								to="/yoga/sequences"
							>
								Sequences
							</Link>
						</li>
					</li>
					<li>
						<li className={styles.navItem}>
							<Link
								className={styles.navLink}
								to="/community"
							>
								Community Sequences
							</Link>
						</li>
					</li>

					<li className={styles.navItem}>
						<Link className={styles.navLink} to="/contact">
							Contact
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}
