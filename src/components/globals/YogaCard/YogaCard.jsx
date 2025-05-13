import styles from "./YogaCard.module.css";
import { Link } from "react-router-dom";

export default function yogaCard({ title, image }) {
	return (
		<Link className={styles.container}>
			<img
				className={styles.image}
				src={image}
				alt={title}
			/>
			<div className={styles.overlay}>
				<h3 className={styles.titleYogaCard}>{title}</h3>
			</div>
		</Link>
	);
}
