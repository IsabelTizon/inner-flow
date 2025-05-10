import styles from "./TextBlock.module.css";

export default function TextBlock({
	backgroundImage,
	title,
	text,
	children,
}) {
	return (
		<section
			className={styles.section}
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className={styles.titleContainer}>
				<h2 className={styles.section}>{title}</h2>
			</div>
			<div className={styles.textContainer}>
				<p className={styles.text}>{text}</p>
				{children}
			</div>
		</section>
	);
}
