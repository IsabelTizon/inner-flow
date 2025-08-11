import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth.js";
import Btn from "../../components/globals/Buttons/Btn.jsx";
import PoseCard from "./components/PoseCard.jsx";
import styles from "./Sequences.module.css";

export default function Sequences() {
	const [sequences, setSequences] = useState([]);
	const [loading, setLoading] = useState(false);
	const [expandedSequences, setExpandedSequences] =
		useState(new Set());
	const { isLoggedIn } = useAuth();

	useEffect(() => {
		if (isLoggedIn) {
			fetchSequences();
		}
	}, [isLoggedIn]);

	const fetchSequences = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				"http://localhost:3000/sequences/my-sequences",
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
		} finally {
			setLoading(false);
		}
	};

	const toggleSequence = (sequenceId) => {
		const newExpanded = new Set(expandedSequences);
		if (newExpanded.has(sequenceId)) {
			newExpanded.delete(sequenceId);
		} else {
			newExpanded.add(sequenceId);
		}
		setExpandedSequences(newExpanded);
	};

	const createNewSequence = async () => {
		const sequenceName = prompt("Enter new sequence name:");
		if (!sequenceName) return;

		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				"http://localhost:3000/sequences",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						name: sequenceName,
						description: `Custom sequence: ${sequenceName}`,
					}),
				}
			);

			if (response.ok) {
				const newSequence = await response.json();
				setSequences([...sequences, newSequence]);
			} else {
				alert("Error creating sequence");
			}
		} catch (error) {
			console.error("Error creating sequence:", error);
			alert("Connection error");
		}
	};

	const deleteSequence = async (
		sequenceId,
		sequenceName
	) => {
		if (
			!confirm(
				`Are you sure you want to delete "${sequenceName}"?`
			)
		) {
			return;
		}

		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				`http://localhost:3000/sequences/${sequenceId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setSequences(
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

	const removePoseFromSequence = async (
		sequenceId,
		poseId
	) => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				`http://localhost:3000/sequences/${sequenceId}/poses/${poseId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				// Refresh sequences to get updated data
				fetchSequences();
			} else {
				alert("Error removing pose from sequence");
			}
		} catch (error) {
			console.error("Error removing pose:", error);
			alert("Connection error");
		}
	};

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

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.loading}>
					Loading your sequences...
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>My Yoga Sequences</h1>
				<Btn
					text="Create New Sequence"
					variant="primary"
					onClick={createNewSequence}
				/>
			</div>

			{sequences.length === 0 ? (
				<div className={styles.emptyState}>
					<h2>No sequences yet</h2>
					<p>
						Start building your yoga practice by creating
						your first sequence!
					</p>
					<Btn
						text="Create Your First Sequence"
						variant="primary"
						onClick={createNewSequence}
					/>
				</div>
			) : (
				<div className={styles.sequencesList}>
					{sequences.map((sequence) => (
						<div
							key={sequence.id}
							className={styles.sequenceCard}
						>
							<div className={styles.sequenceHeader}>
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
								</div>
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
								</div>
							</div>

							{expandedSequences.has(sequence.id) && (
								<div className={styles.posesGrid}>
									{sequence.poses &&
									sequence.poses.length > 0 ? (
										sequence.poses.map((pose) => (
											<div
												key={pose.id}
												className={styles.poseContainer}
											>
												<PoseCard id={pose.id} {...pose} />
												<Btn
													text="Remove from sequence"
													variant="tertiary"
													onClick={() =>
														removePoseFromSequence(
															sequence.id,
															pose.id
														)
													}
													className={styles.removePoseBtn}
												/>
											</div>
										))
									) : (
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
