// STATES
import { useState, useEffect } from "react";
// CONTEXT
import { useAuth } from "../../context/useAuth.js";
// GLOBAL COMPONENTS
import Btn from "../../components/globals/Buttons/Btn.jsx";
// COMPONENTS
import PoseCard from "../../components/globals/Yoga/PoseCard.jsx";
// STYLES
import styles from "./Sequences.module.css";

export default function Sequences() {
	const [sequences, setSequences] = useState([]); // User sequences
	const [loading, setLoading] = useState(false); // Boolean to show if the data is loading
	const [expandedSequences, setExpandedSequences] =
		useState(new Set()); // New Set to track expanded sequences
	const { isLoggedIn } = useAuth(); // Authentication status

	// USEEFFECT STATE
	useEffect(() => {
		if (isLoggedIn) {
			fetchSequences(); // Fetch the sequences if the user is logged in
		}
	}, [isLoggedIn]); // Dependency to re-fetch sequences when login status changes

	// FETCH SEQUENCES FUNCTION
	const fetchSequences = async () => {
		setLoading(true); // Activates loading state
		try {
			const token = localStorage.getItem("token"); // JWT token to authorize user
			const response = await fetch(
				// await pauses the function till the request completes
				"http://localhost:3001/sequences/my-sequences",
				{
					headers: {
						Authorization: `Bearer ${token}`, // send the token as Bearer
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setSequences(data);
			} else {
				console.error("Error fetching sequences");
			}
		} catch (error) {
			console.error("Error fetching sequences:", error);
		} finally {
			setLoading(false);
		}
	};

	// TOGGLE SEQUENCE FUNCTION: SHOW & HIDE SEQUENCE DETAILS
	// Uses a Set data structure which array cannot contain duplicates
	const toggleSequence = (sequenceId) => {
		const newExpanded = new Set(expandedSequences); // Create a copy of the current Set

		// If the sequence is already expanded
		if (newExpanded.has(sequenceId)) {
			//  ... remove it from Set
			newExpanded.delete(sequenceId);
		} else {
			//  If collapsed, expand it (add to Set)
			newExpanded.add(sequenceId);
		}
		setExpandedSequences(newExpanded); // Update the state with the new expanded sequences
	};

	// CREATE NEW SEQUENCE FUNCTION
	const createNewSequence = async () => {
		// Enter the Sequence name prompt
		const sequenceName = prompt("Enter new sequence name:");
		if (!sequenceName) return; //

		try {
			const token = localStorage.getItem("token"); // Get the JWT token to authorize user

			const response = await fetch(
				// await pauses the function till the request completes
				"http://localhost:3001/sequences",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // send the token as Bearer
					},
					body: JSON.stringify({
						name: sequenceName,
						description: `Custom sequence: ${sequenceName}`,
					}),
				}
			);

			if (response.ok) {
				const newSequence = await response.json(); // Get the newly created sequence
				setSequences([...sequences, newSequence]); // Add the new sequence to the state after all old ones
			} else {
				alert("Error creating sequence");
			}
		} catch (error) {
			console.error("Error creating sequence:", error);
			alert("Connection error");
		}
	};

	// DELETE SEQUENCE FUNCTION
	const deleteSequence = async (
		sequenceId,
		sequenceName
	) => {
		if (
			// confirm() is a built-in browser function that displays a pop-up window with: 1) A message, 2) "OK" button and 3) A "Cancel" button
			!confirm(
				`Are you sure you want to delete "${sequenceName}"?` // If the user confirms, the sequence will be deleted
			)
		) {
			return; // If the user doesn't confirm, do nothing
		}

		// Proceed with deletion in the backend
		try {
			const token = localStorage.getItem("token"); // Get the JWT token to authorize user

			const response = await fetch(
				// await pauses the function till the request completes
				`http://localhost:3001/sequences/${sequenceId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`, // send the token as Bearer
					},
				}
			);

			if (response.ok) {
				setSequences(
					// filter creates a new array without the deleted sequence, if the sequence.id it is not the same as sequenceId
					sequences.filter((seq) => seq.id !== sequenceId)
				);
			} else {
				alert("Error deleting sequence");
			}
		} catch (error) {
			console.error("Error deleting sequence:", error);
			alert("Connection error");
		}
	};
	// TOGGLE SEQUENCE VISIBILITY FUNCTION (SHARE/UNSHARE)
	const toggleSequenceVisibility = async (sequenceId) => {
		try {
			const token = localStorage.getItem("token"); // Get the JWT token to authorize user

			const response = await fetch(
				`http://localhost:3001/sequences/${sequenceId}/toggle-visibility`,
				{
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${token}`, // send the token as Bearer
					},
				}
			);

			if (response.ok) {
				const updatedSequence = await response.json();
				// Update the sequence in the state with the new visibility status
				setSequences(
					sequences.map((seq) =>
						seq.id === sequenceId ? updatedSequence : seq
					)
				);
			} else {
				alert("Error toggling sequence visibility");
			}
		} catch (error) {
			console.error(
				"Error toggling sequence visibility:",
				error
			);
			alert("Connection error");
		}
	};

	// REMOVE POSE FROM SEQUENCE FUNCTION
	const removePoseFromSequence = async (
		sequenceId,
		poseId
	) => {
		try {
			const token = localStorage.getItem("token"); // Get the JWT token to authorize user

			const response = await fetch(
				// await pauses the function till the request completes
				// Get the pose from the sequence
				`http://localhost:3001/sequences/${sequenceId}/poses/${poseId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`, // send the token as Bearer
					},
				}
			);

			if (response.ok) {
				// Fetch the updated sequences after removing the pose
				fetchSequences();
			} else {
				alert("Error removing pose from sequence");
			}
		} catch (error) {
			console.error("Error removing pose:", error);
			alert("Connection error");
		}
	};

	// IF IS NOT LOGGED IN RETURN SOME TEXT
	if (!isLoggedIn) {
		return (
			<div className={styles.container}>
				<div className={styles.notLoggedIn}>
					<h2>Please log in to view your sequences</h2>
					<p>
						You need to be logged in to create and manage
						your yoga sequences.
					</p>
				</div>
			</div>
		);
	}

	// A message will be rendering saying our sequences are loading if these load is slowly
	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.loading}>
					Loading your sequences...
				</div>
			</div>
		);
	}

	// SEQUENCES FUNCTION RETURN
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{/* Title */}
				<h1 className={styles.title}>My Yoga Sequences</h1>
				{/* Create New Sequence BUTTON COMPONENT */}
				<Btn
					text="Create New Sequence"
					variant="primary"
					onClick={createNewSequence}
				/>
			</div>

			{sequences.length === 0 ? (
				// If no sequences, show empty state
				<div className={styles.emptyState}>
					{/* Title */}
					<h2>No sequences yet</h2>
					<p>
						Start building your yoga practice by creating
						your first sequence!
					</p>
					{/* Create New Sequence BUTTON COMPONENT */}
					<Btn
						text="Create Your First Sequence"
						variant="primary"
						onClick={createNewSequence}
					/>
				</div>
			) : (
				// If sequences exist, show them
				<div className={styles.sequencesList}>
					{/* mapping sequences */}
					{sequences.map((sequence) => (
						<div
							key={sequence.id}
							className={styles.sequenceCard}
						>
							<div className={styles.sequenceHeader}>
								{/* left side card sequence: INFORMATION */}
								<div className={styles.sequenceInfo}>
									{/* sequence name */}
									<h3 className={styles.sequenceName}>
										{sequence.name}
									</h3>
									{/* sequence description */}
									<p className={styles.sequenceDescription}>
										{sequence.description}
									</p>
									{/* number of poses in sequence */}
									<span className={styles.poseCount}>
										{sequence.poses?.length || 0} poses
									</span>
								</div>
								{/* right side card sequence: BUTTONS*/}
								<div className={styles.sequenceActions}>
									{/* BUTTON COMPONENT to toggle sequence details: SHOW & HIDE */}
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
									{/* DELETE BUTTON COMPONENT */}
									<Btn
										text="Delete"
										variant="tertiary"
										onClick={() =>
											deleteSequence(
												sequence.id,
												sequence.name
											)
										}
									/>
									{/* SHARE/UNSHARE BUTTON COMPONENT */}
									<Btn
										text={
											sequence.isPublic
												? "Unshare"
												: "Share"
										}
										variant="tertiary"
										onClick={() =>
											toggleSequenceVisibility(sequence.id)
										}
									/>
								</div>
							</div>

							{expandedSequences.has(sequence.id) && (
								<div className={styles.posesGrid}>
									{sequence.poses &&
									sequence.poses.length > 0 ? (
										//If the user has expanded the sequence the sequence with the toggle button "show poses" and the poses length are greater than 0 mapping the poses
										sequence.poses.map((pose) => (
											<div
												key={pose.id}
												className={styles.poseContainer}
											>
												{/* POSE CARD COMPONENT */}
												<PoseCard
													id={pose.id}
													{...pose}
													context="sequences"
													sequenceId={sequence.id}
													onRemove={removePoseFromSequence}
												/>
											</div>
										))
									) : (
										// If the user logged as no sequences, show a message
										<div className={styles.emptySequence}>
											<p>No poses in this sequence yet.</p>
											<p>
												Go to the Poses page to add some
												poses!
											</p>
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
