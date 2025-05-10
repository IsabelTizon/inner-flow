import styles from "./Hero.module.css";
import heroHome from "./assets/heroHome.mp4";

export default function Hero() {
	return (
		<section className={styles.hero}>
			<video
				className={styles.video}
				src={heroHome}
				loop
				muted
				playsInline
			/>
			<div className={styles.overlay}>
				<h1 className={styles.title}>Inner Flow</h1>
				<p className={styles.subtitle}>Find your balance</p>
			</div>
		</section>
	);
}
