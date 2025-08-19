// STYLES
import styles from "./legal.module.css";

export default function Privacy() {
	return (
		<div className={styles.legalContainer}>
			<div className={styles.legalContent}>
				<h1>🔒 Privacy Policy – Inner Flow</h1>
				<p>Last updated: August 18, 2025</p>
				<p>
					At Inner Flow, your privacy is important to us. By
					using our platform, you consent to the collection
					and use of your personal data as described below.
				</p>

				<h2>1. Information We Collect</h2>
				<ul>
					<li>
						Personal information such as name, email, and
						account details.
					</li>
					<li>
						Data from interactions with our platform, such
						as saved sequences or preferences.
					</li>
					<li>
						Technical information like IP address, browser
						type, and cookies.
					</li>
				</ul>

				<h2>2. How We Use Your Information</h2>
				<ul>
					<li>To provide and improve our services.</li>
					<li>
						To communicate with you regarding your account
						or sequences.
					</li>
					<li>To ensure security and prevent abuse.</li>
				</ul>

				<h2>3. Data Sharing</h2>
				<p>
					We do not sell or share personal data with third
					parties except where required by law or to provide
					our services.
				</p>

				<h2>4. Your Rights</h2>
				<ul>
					<li>
						Access, correct, or delete your personal data.
					</li>
					<li>
						Withdraw consent for data collection at any
						time.
					</li>
				</ul>

				<h2>5. Contact</h2>
				<p>
					For any questions about this Privacy Policy,
					contact us at 📩 tizonarranz@gmail.com
				</p>
			</div>
		</div>
	);
}
