// STYLES
import styles from "./legal.module.css";

export default function Terms() {
	return (
		<>
			<div className={styles.legalContainer}>
				<div className={styles.legalContent}>
					<h1>📄 Terms and Conditions – Inner Flow</h1>
					<p>Last updated: August 18, 2025</p>
					<p>
						Welcome to Inner Flow. By accessing and using
						our platform, you agree to these Terms and
						Conditions. If you do not agree, please do not
						use our website.
					</p>

					<h2>1. Use of the Platform</h2>
					<ul>
						<li>
							Inner Flow provides content related to yoga,
							wellness, and nutrition.
						</li>
						<li>
							Access to certain sections may require user
							registration.
						</li>
						<li>
							Users agree to use the platform in a lawful
							and respectful manner.
						</li>
					</ul>

					<h2>2. Registration and Accounts</h2>
					<ul>
						<li>
							To access features such as saving sequences or
							interacting within the community, registration
							is required.
						</li>
						<li>
							Users are responsible for maintaining the
							confidentiality of their login credentials.
						</li>
					</ul>

					<h2>3. Content</h2>
					<ul>
						<li>
							The content published on Inner Flow (text,
							images, sequences, menus) is provided for
							informational purposes only.
						</li>
						<li>
							It does not replace the advice of a doctor or
							healthcare professional.
						</li>
					</ul>

					<h2>4. Liability</h2>
					<ul>
						<li>
							Inner Flow is not responsible for any injuries
							resulting from the practice of yoga or from
							the use of information provided on the
							platform.
						</li>
						<li>Each user practices at their own risk.</li>
					</ul>

					<h2>5. Intellectual Property</h2>
					<ul>
						<li>
							All content on the platform is the property of
							Inner Flow or its respective authors.
						</li>
						<li>
							Reproduction without authorization is
							prohibited.
						</li>
					</ul>

					<h2>6. Privacy and Data</h2>
					<p>
						The use of personal data is governed by our
						Privacy Policy.
					</p>

					<h2>7. Modifications</h2>
					<p>
						We reserve the right to modify these Terms and
						Conditions at any time. The latest update date
						will always be displayed at the beginning of the
						document.
					</p>

					<h2>8. Contact</h2>
					<p>
						If you have any questions regarding these Terms
						and Conditions, you can contact us at: 📩
						tizonarranz@gmail.com
					</p>
				</div>
			</div>
		</>
	);
}
