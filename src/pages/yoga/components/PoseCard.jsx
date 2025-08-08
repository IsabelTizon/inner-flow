import useToggle from "../../../hooks/useToggle.js";
import styles from "./poseCard.module.css";

import Btn from "../../../components/globals/Buttons/Btn.jsx";
// hooks
import { useAuth } from "../../../context/useAuth.js"; // Custom hook to access authentication state and methods

export default function PoseCard({
	name,
	image,
	description,
}) {
	const [isOpen, toggle] = useToggle(false);
	const { isLoggedIn } = useAuth();
	return (
		<div className={styles.poseCard}>
			<img
				src={`http://localhost:3000/img/poses/${image}`}
				alt={name}
				className={styles.imgPoseCard}
			/>
			<h3 className={styles.titlePoseCard}>{name}</h3>
			<Btn text="👁" variant="primary" onClick={toggle} />

			{isLoggedIn && (
				<Btn
					text="Add to my sequences"
					variant="secondary"
					onClick={() => {
						// Handle view details action
					}}
				/>
			)}

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
							variant="tertiary"
							onClick={(e) => {
								e.stopPropagation();
								toggle();
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
