// STATE
import { useState, useEffect } from "react";
// STYLES
import styles from "./SequenceSelector.module.css";
// COMPONENTS
import Btn from "../Buttons/Btn.jsx";

// 4 components: SequenceSelector, fetchUserSequences, CreateNewSequenceBtn,
export default function SequenceSelector({
	poseId,
	poseName,
	onClose, // Close the modal
	onSuccess, // Success callback function
}) {
	const [sequences, setSequences] = useState([]); // User's sequences list
	const [selectedSequenceId, setSelectedSequenceId] =
		useState(""); // Selected sequence ID
	const [loading, setLoading] = useState(false); // Loading state
	const [message, setMessage] = useState(""); // Feedback messages

	// Fetch user sequences
	useEffect(() => {
		fetchUserSequences();
	}, []);

	// Fetch user sequences from backend
	const fetchUserSequences = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				"http://localhost:3001/sequences/my-sequences",
				{
					headers: {
						Authorization: `Bearer ${token}`,
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
		}
	};

	// Add pose to selected sequence
	const handleAddToSequence = async () => {
		if (!selectedSequenceId) {
			setMessage("Please select a sequence");
			return;
		}

		setLoading(true);
		setMessage("");

		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				`http://localhost:3001/sequences/${selectedSequenceId}/poses`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ poseId }),
				}
			);

			if (response.ok) {
				setMessage(
					`${poseName} added to sequence successfully!`
				);
				if (onSuccess) onSuccess();
				setTimeout(() => {
					onClose();
				}, 1500);
			} else {
				const errorData = await response.json();
				setMessage(
					errorData.message ||
						"Error adding pose to sequence"
				);
			}
		} catch (error) {
			console.error(
				"Error adding pose to sequence:",
				error
			);
			setMessage("Connection error. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Create a new sequence
	const handleCreateNewSequence = async () => {
		const sequenceName = prompt("Enter new sequence name:");
		if (!sequenceName) return;

		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				"http://localhost:3001/sequences",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						name: sequenceName,
						description: `Custom sequence created for ${sequenceName}`,
					}),
				}
			);

			if (response.ok) {
				const newSequence = await response.json();
				setSequences([...sequences, newSequence]);
				setSelectedSequenceId(newSequence.id);
				setMessage(
					"New sequence created! Now you can add the pose to it."
				);
			} else {
				setMessage("Error creating sequence");
			}
		} catch (error) {
			console.error("Error creating sequence:", error);
			setMessage("Connection error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{/* MODAL */}

			<div className={styles.overlay} onClick={onClose}>
				{/* Modal to close when clicking outside */}
				<div
					className={styles.modal}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Prevent closing when clicking inside */}
					<h3 className={styles.title}>
						Add "{poseName}" to Sequence
					</h3>
					{/* If sequences exist, show a dropdown */}
					{sequences.length > 0 ? (
						<div className={styles.content}>
							{/* Dropdown to select a sequence */}
							<label className={styles.label}>
								Select a sequence:
								<select
									className={styles.select}
									value={selectedSequenceId}
									onChange={(e) =>
										setSelectedSequenceId(e.target.value)
									}
								>
									<option
										className={styles.selectValue}
										value=""
									>
										Choose a sequence...
									</option>
									{sequences.map((sequence) => (
										<option
											key={sequence.id}
											value={sequence.id}
										>
											{sequence.name} (
											{sequence.poses?.length || 0} poses)
										</option>
									))}
								</select>
							</label>

							{/* BUTTONS POP UP */}
							<div className={styles.buttonGroup}>
								{/* BUTTON: ADD POSE TO A SEQUENCE */}
								<Btn
									text={
										loading
											? "Adding..."
											: "Add to Sequence"
									}
									variant="primary"
									onClick={handleAddToSequence}
									disabled={loading || !selectedSequenceId}
								/>
								{/* BUTTON: CREATE NEW SEQUENCE */}
								<Btn
									text="Create New Sequence"
									variant="secondary"
									onClick={handleCreateNewSequence}
									disabled={loading}
								/>
							</div>
						</div>
					) : (
						// If the user doesn't have any sequences
						<div className={styles.content}>
							<p className={styles.noSequences}>
								You don't have any sequences yet.
							</p>
							{/* BUTTON TO CREATE A NEW SEQUENCE IF THE USER HAS NONE */}
							<Btn
								text="Create Your First Sequence"
								variant="primary"
								onClick={handleCreateNewSequence}
								disabled={loading}
							/>
						</div>
					)}
					{message && (
						<p
							className={`${styles.message} ${
								message.includes("successfully")
									? styles.success
									: styles.error
							}`}
						>
							{message}
						</p>
					)}
					<Btn
						text="Close"
						variant="tertiary"
						onClick={onClose}
						className={styles.closeBtn}
					/>
				</div>
			</div>
		</>
	);
}
