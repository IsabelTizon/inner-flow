// STYLES
import styles from "./adminDashboard.module.css";

// GLOBAL COMPONENTS
import ClickCard from "../../components/globals/ClickCard/ClickCard";

// ASSETS
import yogaPoses from "../../assets/yogaPoses.jpg";

export default function AdminDashboard() {
	return (
		<div className={styles.dashboard}>
			<div className={styles.dashboardTitle}>
				<h1>Admin Dashboard</h1>
			</div>
			<div className={styles.cards}>
				<ClickCard
					to="/admin/poses/create"
					title="Create Pose"
					image={yogaPoses}
				></ClickCard>
				<ClickCard
					to="/admin/poses/editPose"
					title="Edit Old Poses"
					image={yogaPoses}
				></ClickCard>
			</div>
		</div>
	);
}
