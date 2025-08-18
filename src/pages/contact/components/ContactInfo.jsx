import styles from "./ContactInfo.module.css";

export default function ContactInfo() {
	return (
		<div className={styles.infoSection}>
			<h2 className={styles.title}>Get in Touch</h2>
			<p className={styles.description}>
				Whether you have questions about our yoga classes,
				need guidance on poses, or want to learn more about
				our wellness programs, we're here to help. Our
				experienced team is dedicated to supporting your
				yoga journey and helping you find inner peace and
				balance.
			</p>
			<div className={styles.contactDetails}>
				<div className={styles.detail}>
					<h3>Email</h3>
					<p>info@innerflow.com</p>
					<p>tizoncorreos@gmail.com</p>
				</div>
			</div>
		</div>
	);
}
