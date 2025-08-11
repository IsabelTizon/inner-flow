// STYLES
import styles from "./poseCard.module.css";
// GLOBAL COMPONENTS
import Btn from "../../../components/globals/Buttons/Btn.jsx";
import SequenceSelector from "../../../components/globals/SequenceSelector/SequenceSelector.jsx";
// HOOKS
import { useAuth } from "../../../context/useAuth.js"; // Context to access authentication state and methods
import useToggle from "../../../hooks/useToggle.js";

export default function PoseCard({
	id,
	name,
	image,
	description,
}) {
	const [isOpen, toggle] = useToggle(false);
	const [showSequenceSelector, setShowSequenceSelector] =
		useToggle(false);
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

			{/* BUTTON: if the user is logged button will appear to add to add the pose to the user sequences account */}
			{isLoggedIn && (
				<Btn
					text="Add to my sequences"
					variant="secondary"
					onClick={setShowSequenceSelector}
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

			{/* Sequence Selector Modal */}
			{showSequenceSelector && (
				<SequenceSelector
					poseId={id}
					poseName={name}
					onClose={setShowSequenceSelector}
					onSuccess={() => {
						console.log(
							`Pose ${name} added to sequence successfully!`
						);
					}}
				/>
			)}
		</div>
	);
}
