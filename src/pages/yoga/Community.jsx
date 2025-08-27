// REACT HOOKS
import React, { useEffect, useState } from "react";
// GLOBAL COMPONENTS
import Btn from "../../components/globals/Buttons/Btn.jsx";
import PoseCard from "../../components/globals/Yoga/PoseCard.jsx";
// STYLES
import styles from "./Sequences.module.css";

export default function Community() {
	// COMPONENT STATES
	const [publicSequences, setPublicSequences] = useState(
		[]
	); // Get all public sequences
	const [loading, setLoading] = useState(false); // Loading state
	const [expandedSequences, setExpandedSequences] =
		useState(new Set());

	useEffect(() => {
		fetchPublicSequences();
	}, []);

	// FETCH ALL PUBLIC SEQUENCES
	const fetchPublicSequences = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				"http://localhost:3001/community/sequences"
			);
			const data = await response.json();
			setPublicSequences(data);
		} catch (error) {
			console.error(
				"Error fetching public sequences:",
				error
			);
		} finally {
			setLoading(false);
		}
	};

	// TOGGLE SEQUENCE FUNCTION: SHOW & HIDE SEQUENCE DETAILS
	const toggleSequence = (sequenceId) => {
		const newExpanded = new Set(expandedSequences);

		if (newExpanded.has(sequenceId)) {
			newExpanded.delete(sequenceId);
		} else {
			newExpanded.add(sequenceId);
		}
		setExpandedSequences(newExpanded);
	};

	// RENDERING MESSAGE WITH LOADING STATE
	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.loading}>
					Loading community sequences...
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>
					Community Yoga Sequences
				</h1>
				<p style={{ color: "#555" }}>
					Discover and explore sequences shared by our
					community!
				</p>
			</div>
			{/* If there is not sequences a message will be rendered */}
			{publicSequences.length === 0 ? (
				<div className={styles.emptyState}>
					<h2>No shared sequences yet</h2>
					<p>
						Be the first to share your yoga sequence with
						the community!
					</p>
				</div>
			) : (
				//but if there are sequences, they will be rendered
				<div className={styles.sequencesList}>
					{publicSequences.map((sequence) => (
						<div
							key={sequence.id}
							className={styles.sequenceCard}
						>
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
									{/* Show creator info */}
									<p className={styles.creatorInfo}>
										Created by:{" "}
										<strong>
											{sequence.user?.name ||
												sequence.user?.username ||
												"Unknown"}
										</strong>
									</p>
								</div>
								{/* Only Show Poses Button */}
								<div className={styles.sequenceActions}>
									<Btn
										text={
											expandedSequences.has(sequence.id)
												? "Hide Poses"
												: "Show Poses"
										}
										variant="secondary"
										onClick={() =>
											toggleSequence(sequence.id)
										}
									/>
								</div>
							</div>

							{/* Show poses if the sequence is expanded */}
							{expandedSequences.has(sequence.id) && (
								<div className={styles.posesGrid}>
									{sequence.poses &&
									sequence.poses.length > 0 ? (
										sequence.poses.map((pose) => (
											<div
												key={pose.id}
												className={styles.poseContainer}
											>
												<PoseCard
													id={pose.id}
													{...pose}
													context="community"
													// No onRemove or edit functions for community
												/>
											</div>
										))
									) : (
										// No poses message
										<div className={styles.emptySequence}>
											<p>No poses in this sequence.</p>
										</div>
									)}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
