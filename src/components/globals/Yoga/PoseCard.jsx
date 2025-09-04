// STYLES
import styles from "./poseCard.module.css";

// GLOBAL COMPONENTS
import Btn from "../Buttons/Btn.jsx";
import SequenceSelector from "./SequenceSelector.jsx";

// HOOKS
import { useAuth } from "../../../context/useAuth.js"; // Context to access authentication state and methods
import useToggle from "../../../hooks/useToggle.js"; //

// .env DEVELOPMENT/DEPLOYMENT
const apiUrl = import.meta.env.VITE_API_URL;

export default function PoseCard({
	id,
	name,
	image,
	description,
	context, // "poses" or "sequences" or "editPose on onAdminEdit" or "editPose on onAdminDelete"
	sequenceId, // context="sequences"
	onRemove, // context="sequences"
	onAdminEdit, // context="admin dashboard"
	onAdminDelete, // context="admin dashboard"
}) {
	const [isOpen, toggle] = useToggle(false); // Toggle state for the popup

	const [showSequenceSelector, setShowSequenceSelector] =
		useToggle(false); // Toggle state for the sequence selector modal

	const { isLoggedIn } = useAuth(); // Context to access authentication state

	// CARD
	return (
		<div className={styles.poseCard}>
			{/*********** CARD ***********/}
			{/* CARD IMAGE */}
			<img
				src={`${apiUrl}/img/poses/${image}`}
				alt={name}
				className={styles.imgPoseCard}
			/>
			{/* CARD TITLE */}
			<h3 className={styles.titlePoseCard}>{name}</h3>

			{/*********** BUTTONS ***********/}
			{/* BUTTON VIEW CARD: Show popup */}
			<Btn text="👁" variant="primary" onClick={toggle} />

			{/*********** CONTEXT BUTTONS ***********/}
			{/* CONTEXT BUTTONS =>  1) POSES: "ADD TO MY SEQUENCES", 2) SEQUENCES: "REMOVE FROM SEQUENCE", ADMIN: "UPDATE" / "DELETE POSE" */}
			{/* IN POSES */}
			{context === "poses" && isLoggedIn && (
				// "Add to my Sequences Button"
				<Btn
					text="Add to my sequences"
					variant="secondary"
					onClick={setShowSequenceSelector}
				/>
			)}

			{/* IN SEQUENCES */}
			{context === "sequences" && (
				// "Remove Button"
				<Btn
					text="Remove"
					variant="tertiary"
					onClick={() => onRemove(sequenceId, id)}
				/>
			)}

			{/* ADMIN DASHBOARD */}
			{context === "editPose" &&
				isLoggedIn &&
				onAdminEdit && (
					// Edit Pose Btn
					<Btn
						text="Edit"
						variant="secondary"
						onClick={() => onAdminEdit(id)}
					/>
				)}
			{/*  ADMIN DASHBOARD */}
			{context === "editPose" &&
				isLoggedIn &&
				onAdminDelete && (
					// Delete Pose Btn
					<Btn
						text="Delete"
						variant="tertiary"
						onClick={() => onAdminDelete(id)}
					/>
				)}

			{/*********** POP UPS ***********/}
			{/* POP UP IN POSES: after pressing "view pose" btn */}
			{isOpen && (
				<div
					className={styles.popupOverlay}
					onClick={toggle} // Close popup when clicking outside
				>
					<div className={styles.popup}>
						{/* image pop up pose card */}
						<img
							src={`${apiUrl}/img/poses/${image}`}
							alt={name}
							className={styles.imgPoseCardPopup}
						/>
						{/* title pop up pose card */}
						<h3 className={styles.popupTitle}>{name}</h3>
						{/* description pop up pose card */}
						<p className={styles.popupDescription}>
							{description}
						</p>
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

			{/* POP UP IN SEQUENCES: after pressing "add to my sequences" btn */}
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
