import { Link } from "react-router-dom";
// Styles
import styles from "../footer.module.css";
// Assets
import logo from "../../../assets/logo.png";

export default function LogoBox() {
	return (
		<>
			<div className={styles.section}>
				<Link to="/">
					<img
						className={styles.logo}
						src={logo}
						alt="logo icon"
						width={80}
					/>
				</Link>

				<h2 className={styles.logo}>Inner-flow</h2>
				<p className={styles.description}>
					Your space to practice yoga, explore healthy
					living, and connect with the community.
				</p>
			</div>
		</>
	);
}
