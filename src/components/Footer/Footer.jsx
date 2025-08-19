//COMPONENTS
import LegalLinks from "./components/LegalLinks";
import QuickLinks from "./components/QuickLinks";
import LogoBox from "./components/LogoBox";
// Styles
import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<>
			<footer className={styles.footer}>
				<div className={styles.container}>
					<LogoBox />
					<QuickLinks />
					<LegalLinks />
				</div>

				<div className={styles.bottom}>
					© {new Date().getFullYear()} inner-flow. All
					rights reserved.
				</div>
			</footer>
		</>
	);
}
