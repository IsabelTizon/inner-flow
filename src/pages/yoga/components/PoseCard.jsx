// STYLES
import styles from "./poseCard.module.css";

// GLOBAL COMPONENTS
import Btn from "../../../components/globals/Buttons/Btn.jsx";
import SequenceSelector from "../../../components/globals/SequenceSelector/SequenceSelector.jsx";

// HOOKS
import { useAuth } from "../../../context/useAuth.js"; // Context to access authentication state and methods
import useToggle from "../../../hooks/useToggle.js"; //

export default function PoseCard({
	id,
	name,
	image,
	description,
	context, // "poses" o "sequences"
	sequenceId, // context="sequences"
	onRemove, // context="sequences"
}) {
	const [isOpen, toggle] = useToggle(false); // Toggle state for the popup

	const [showSequenceSelector, setShowSequenceSelector] =
		useToggle(false); // Toggle state for the sequence selector modal

	const { isLoggedIn } = useAuth(); // Context to access authentication state

	// CARD
	return (
		<div className={styles.poseCard}>
			{/* CARD IMAGE */}
			<img
				src={`http://localhost:3000/img/poses/${image}`}
				alt={name}
				className={styles.imgPoseCard}
			/>
			{/* CARD TITLE */}
			<h3 className={styles.titlePoseCard}>{name}</h3>

			{/* BUTTON VIEW CARD: Show popup */}
			<Btn text="👁" variant="primary" onClick={toggle} />

			{/* BUTTONS:  "ADD TO MY SEQUENCES" and "REMOVE FROM SEQUENCE" depending on context */}
			{context === "poses" && isLoggedIn && (
				// "Add to my Sequences Button", just in Poses page
				<Btn
					text="Add to my sequences"
					variant="secondary"
					onClick={setShowSequenceSelector}
				/>
			)}

			{context === "sequences" && (
				// "Remove from Sequence Button", just in Sequences page
				<Btn
					text="Remove"
					variant="tertiary"
					onClick={() => onRemove(sequenceId, id)}
					className={styles.removePoseBtn}
				/>
			)}

			{/* POP UP after pressing "view pose card button" */}
			{isOpen && (
				<div
					className={styles.popupOverlay}
					onClick={toggle} // Close popup when clicking outside
				>
					<div className={styles.popup}>
						{/* image pop up pose card */}
						<img
							src={`http://localhost:3000/img/poses/${image}`}
							alt={name}
							className={styles.imgPoseCardPopup}
						/>
						{/* title pop up pose card */}
						<h3 className={styles.popupTitle}>{name}</h3>
						{/* description pop up pose card */}
						<p>{description}</p>
						{/* button to close pop up pose card */}
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

			{/* POP UP after pressing "add to my sequences button" */}
			{showSequenceSelector && (
				// SequenceSelector component as a popup
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
