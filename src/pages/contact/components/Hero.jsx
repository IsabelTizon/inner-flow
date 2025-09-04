// STYLES
import styles from "./hero.module.css";

export default function Hero() {
	return (
		<div className={styles.hero}>
			<div className={styles.heroContent}>
				<h1 className={styles.title}>Contact Us</h1>
				<p className={styles.subtitle}>
					We'd love to hear from you. Send us a message and
					we'll respond as soon as possible.
				</p>
			</div>
		</div>
	);
}
