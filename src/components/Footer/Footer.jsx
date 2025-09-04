//COMPONENTS
import LegalLinks from "./components/LegalLinks";
import QuickLinks from "./components/QuickLinks";
import LogoBox from "./components/LogoBox";
// Styles
import styles from "./footer.module.css";

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
					© {new Date().getFullYear()} Inner Flow. All
					rights reserved.
				</div>
			</footer>
		</>
	);
}
