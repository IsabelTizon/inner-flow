// STATES
import { useState, useEffect } from "react";
// CONTEXT
import { useAuth } from "../../context/useAuth.js";
// GLOBAL COMPONENTS
import Btn from "../../components/globals/Buttons/Btn.jsx";
import SequencesCard from "../../components/globals/Yoga/SequencesCard.jsx";
// STYLES
import styles from "./Sequences.module.css";
//CUSTOM HOOKS
import { useToggleSequence } from "../../hooks/useToggleSequence.js";

export default function Sequences() {
	const [sequences, setSequences] = useState([]); // User sequences empty array as initial state
	const [loading, setLoading] = useState(false); // Boolean to show if the data is loading
	const { isLoggedIn } = useAuth(); // Authentication status
	const { expandedItems, toggleSequence } =
		useToggleSequence(); // Custom hook for managing expanded sequences

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

			{/** No sequences yet card */}
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
						variant="tertiary"
						onClick={createNewSequence}
					/>
				</div>
			) : (
				// If sequences exist, show them
				<div className={styles.sequencesList}>
					{/* mapping sequences */}
					{sequences.map((sequence) => (
						<SequencesCard
							key={sequence.id}
							sequence={sequence}
							context="sequences"
							expandedSequences={expandedItems}
							onToggleSequence={toggleSequence}
							onDelete={deleteSequence}
							onToggleVisibility={toggleSequenceVisibility}
							onRemovePose={removePoseFromSequence}
						/>
					))}
				</div>
			)}
		</div>
	);
}
