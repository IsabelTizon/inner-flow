// GLOBAL COMPONENTS
import Btn from "../Buttons/Btn.jsx";
import PoseCard from "./PoseCard.jsx";
// STYLES
import styles from "./SequencesCard.module.css";

export default function SequencesCard({
	sequence,
	context,
	expandedSequences, // Set of expanded sequence IDs, no duplicates IDs
	onToggleSequence, // Function to toggle sequence expansion show and hide sequence poses
	onDelete, // Delete sequence
	onToggleVisibility, // Share/Unshare
	onRemovePose, // Delete pose from the sequence
}) {
	const isExpanded =
		expandedSequences?.has(sequence.id) || false;

	return (
		<div className={styles.sequenceCard}>
			<div className={styles.sequenceHeader}>
				{/* Sequence Information */}
				<div className={styles.sequenceInfo}>
					<h3 className={styles.sequenceName}>
						{sequence.name}
					</h3>
					<p className={styles.sequenceDescription}>
						{sequence.description}
					</p>
					<span className={styles.poseCount}>
						{sequence.poses?.length || 0} poses
					</span>
					{/* Show creator info for community sequences */}
					{context === "community" && (
						<p className={styles.creatorInfo}>
							Created by:{" "}
							<strong>
								{sequence.user?.name ||
									sequence.user?.username ||
									"Unknown"}
							</strong>
						</p>
					)}
				</div>

				{/* Sequence Btns */}
				<div className={styles.sequenceBtns}>
					{/* Show/Hide Poses Button - Always present */}
					<Btn
						text={isExpanded ? "Hide Poses" : "Show Poses"}
						variant="secondary"
						onClick={() => onToggleSequence(sequence.id)}
					/>

					{/* Delete Button - Only for user's own sequences */}
					{context === "sequences" && onDelete && (
						<Btn
							text="Delete"
							variant="tertiary"
							onClick={() =>
								onDelete(sequence.id, sequence.name)
							}
						/>
					)}

					{/* Share/Unshare Button - Only for user's own sequences */}
					{context === "sequences" &&
						onToggleVisibility && (
							<Btn
								text={
									sequence.isPublic ? "Unshare" : "Share"
								}
								variant="tertiary"
								onClick={() =>
									onToggleVisibility(sequence.id)
								}
							/>
						)}
				</div>
			</div>

			{/* Expanded Poses Wrapper */}
			{isExpanded && (
				<div className={styles.posesWrapper}>
					{sequence.poses && sequence.poses.length > 0 ? (
						sequence.poses.map((pose) => (
							<div
								key={pose.id}
								className={styles.poseContainer}
							>
								<PoseCard
									id={pose.id}
									{...pose}
									context={context}
									sequenceId={sequence.id}
									onRemove={onRemovePose}
								/>
							</div>
						))
					) : (
						<div className={styles.emptySequence}>
							<p>
								No poses in this sequence
								{context === "sequences" ? " yet" : ""}.
							</p>
							{context === "sequences" && (
								<p>
									Go to the Poses page to add some poses!
								</p>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
