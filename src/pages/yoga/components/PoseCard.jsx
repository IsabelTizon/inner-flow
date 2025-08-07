import useToggle from "../../../hooks/useToggle.js";
import styles from "./poseCard.module.css";
import EyeBtn from "../../../components/globals/Buttons/EyeBtn.jsx";

export default function PoseCard({
	name,
	image,
	description,
}) {
	const [isOpen, toggle] = useToggle(false);
	return (
		<div className={styles.poseCard}>
			<img
				src={`http://localhost:3000/img/poses/${image}`}
				alt={name}
				className={styles.imgPoseCard}
			/>
			<h3 className={styles.titlePoseCard}>{name}</h3>
			<EyeBtn onClick={toggle} />

			{isOpen && (
				<div
					className={styles.popupOverlay}
					onClick={toggle}
				>
					<div className={styles.popup}>
						<p>{description}</p>
						<button onClick={toggle}>Cerrar</button>
					</div>
				</div>
			)}
		</div>
	);
}
