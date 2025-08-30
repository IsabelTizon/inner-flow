// GLOBAL COMPONENTS
import styles from "./ClickCard.module.css";
// LINK ROUTER
import { Link } from "react-router-dom";

export default function ClickCard({ title, image, to }) {
	return (
		<Link to={to} className={styles.container}>
			<img
				className={styles.image}
				src={image}
				alt={title}
			/>
			<div className={styles.overlay}>
				<h3 className={styles.titleCard}>{title}</h3>
			</div>
		</Link>
	);
}
