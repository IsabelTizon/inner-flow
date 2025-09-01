// REACT HOOKS
import React, { useEffect, useState } from "react";
// GLOBAL COMPONENTS
import SequencesCard from "../../components/globals/Yoga/SequencesCard.jsx";
// CUSTOM HOOKS
import { useToggleSequence } from "../../hooks/useToggleSequence.js";
// STYLES
import styles from "./Sequences.module.css";

export default function Community() {
	// COMPONENT STATES
	const [publicSequences, setPublicSequences] = useState(
		[]
	); // Get all public sequences
	const [loading, setLoading] = useState(false); // Loading state
	const { expandedItems, toggleSequence } =
		useToggleSequence(); // Custom hook for managing expanded sequences

	useEffect(() => {
		fetchPublicSequences();
	}, []);

	// FETCH ALL PUBLIC SEQUENCES
	const fetchPublicSequences = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				"http://localhost:3001/community/sequences"
			);
			const data = await res.json();
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
						<SequencesCard
							key={sequence.id}
							sequence={sequence}
							context="community"
							expandedSequences={expandedItems}
							onToggleSequence={toggleSequence}
							onDelete={null}
							onToggleVisibility={null}
							onRemovePose={null}
						/>
					))}
				</div>
			)}
		</div>
	);
}
