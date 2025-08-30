// STYLES
import styles from "./TextBlock.module.css";

export default function TextBlock({
	backgroundImage,
	title,
	titleStyle,
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
				<h2 style={titleStyle}>{title}</h2>
			</div>
			<div className={styles.textContainer}>
				<p className={styles.text}>{text}</p>
				{children}
			</div>
		</section>
	);
}
