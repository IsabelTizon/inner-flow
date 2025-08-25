import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

function CardLink({ to, title, children }) {
	return (
		<Link to={to} className={styles.cardLink}>
			<div className={styles.card}>
				<h2 className={styles.cardTitle}>{title}</h2>
				<div className={styles.cardContent}>{children}</div>
			</div>
		</Link>
	);
}

export default function AdminDashboard() {
	return (
		<div className={styles.dashboard}>
			<h1>Dashboard</h1>
			<h2>Poses</h2>
			<div className={styles.cards}>
				<CardLink to="/admin/poses/create">
					Create Pose
				</CardLink>
				<CardLink to="/admin/poses/editPose">
					Edit Old Poses
				</CardLink>
			</div>
		</div>
	);
}
