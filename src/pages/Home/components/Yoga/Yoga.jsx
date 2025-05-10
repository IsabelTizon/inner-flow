import styles from "./Yoga.module.css";

export default function Yoga() {
	return (
		<section>
			<div className={styles.titleContainer}>
				<h2 className={styles.title}>Yoga</h2>
			</div>
			<div className={styles.textContainer}>
				<p className={styles.text}>
					simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an
					unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has
					survived not only five centuries, but also the
					leap into electronic typesetting, remaining
					essentially
				</p>
			</div>
		</section>
	);
}
