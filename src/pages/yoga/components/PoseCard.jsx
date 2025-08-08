import useToggle from "../../../hooks/useToggle.js";
import styles from "./poseCard.module.css";
import EyeBtn from "../../../components/globals/Buttons/EyeBtn.jsx";
import Btn from "../../../components/globals/Buttons/Btn.jsx";

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

			{/* POP UP */}
			{isOpen && (
				<div
					className={styles.popupOverlay}
					onClick={toggle}
				>
					<div className={styles.popup}>
						<img
							src={`http://localhost:3000/img/poses/${image}`}
							alt={name}
							className={styles.imgPoseCardPopup}
						/>
						<h3 className={styles.popupTitle}>{name}</h3>
						<p>{description}</p>
						<Btn
							text="Close"
							variant="secondary"
							onClick={(e) => {
								e.stopPropagation();
								toggle();
							}}
						>
							Close
						</Btn>
					</div>
				</div>
			)}
		</div>
	);
}
