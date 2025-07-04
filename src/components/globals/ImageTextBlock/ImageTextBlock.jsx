import styles from "./ImageTextBlock.module.css";

export default function ImageTextBlock({
	title,
	image,
	titleText,
	text,
	reverse = false,
	children,
}) {
	return (
		<section
			className={`${styles.section} ${
				reverse ? styles.reverse : ""
			}`}
		>
			<div className={styles.titleContainer}>
				<h2>{title}</h2>
			</div>
			<div className={styles.imageTextContainer}>
				<div className={styles.imageContainer}>
					<img src={image} alt={title} />
				</div>
				<div className={styles.textContainer}>
					<h3>{titleText}</h3>
					<p className={styles.text}>{text}</p>
					{children}
				</div>
			</div>
		</section>
	);
}
