// COMPONENTS
import PoseCard from "../../../components/globals/Yoga/PoseCard";
import PoseFilter from "../../../components/globals/Yoga/PoseFilter";
// STYLES
import styles from "../../yoga/Poses.module.css";
// STATES
import { useEffect, useState } from "react";

export default function EditPose() {
	const [poses, setPoses] = useState([]); // All yoga poses
	const [filteredPoses, setFilteredPoses] = useState([]); // Filtered yoga poses
	const [isSearching, setIsSearching] = useState(false); // Searching state
	const [loading, setLoading] = useState(false); // Loading state
	const [message, setMessage] = useState("");

	// STATE useEffect to download all poses in the rendering
	useEffect(() => {
		loadAllPoses();
	}, []);

	// STATE to FETCH all poses
	const loadAllPoses = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				"http://localhost:3001/poses"
			);
			const data = await response.json();
			setPoses(data);
			setFilteredPoses(data);
		} catch (err) {
			console.error("Error fetching poses:", err);
		} finally {
			setLoading(false);
		}
	};

	// SEARCHING poses by name
	const handleFilter = async (searchTerm) => {
		setLoading(true);
		setIsSearching(true);

		try {
			// fetch endpoint by name
			const response = await fetch(
				`http://localhost:3001/poses/search?name=${encodeURIComponent(
					searchTerm
				)}`
			);
			const data = await response.json();
			setFilteredPoses(data);
		} catch (err) {
			console.error("Error searching poses:", err);
			// filter poses if the endpoint fails
			const filtered = poses.filter((pose) =>
				pose.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			);
			setFilteredPoses(filtered);
		} finally {
			setLoading(false);
		}
	};

	// CLEAR SEARCHING filters
	const handleClearFilter = () => {
		setFilteredPoses(poses);
		setIsSearching(false);
	};

	// Handle edit pose
	const handleEditPose = async (poseId) => {
		console.log("Edit pose with ID:", poseId);

		alert(`Edit pose with ID: ${poseId}`);
	};

	// Handle delete pose
	const handleEditDelete = async (poseId) => {
		console.log("Delete pose with ID:", poseId);

		const isConfirmed = window.confirm(
			`Are you sure you want to delete this pose? This action cannot be undone.`
		);

		if (!isConfirmed) {
			return; // User cancelled, don't delete
		}

		try {
			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:3001/poses/${poseId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (res.ok) {
				setMessage("Pose deleted successfully!");
				// Update the poses list to remove the deleted pose
				setPoses((prevPoses) =>
					prevPoses.filter((pose) => pose.id !== poseId)
				);
				setFilteredPoses((prevFiltered) =>
					prevFiltered.filter((pose) => pose.id !== poseId)
				);

				// Clear message after 3 seconds
				setTimeout(() => setMessage(""), 3000);
			} else {
				const errorData = await res.json();
				setMessage(
					errorData.message || "Error deleting pose."
				);
			}
		} catch (error) {
			console.error("Delete error:", error);
			setMessage("Connection error. Please try again.");
		}
	};

	return (
		<div className={styles.posesContainer}>
			<PoseFilter
				onFilter={handleFilter}
				onClear={handleClearFilter}
				isSearching={loading}
			/>

			{isSearching && (
				<div className={styles.posesMessage}>
					Showing search results ({filteredPoses.length}{" "}
					found)
				</div>
			)}

			{loading && (
				<div className={styles.posesLoading}>
					Loading poses...
				</div>
			)}

			<div className={styles.posesFlex}>
				{filteredPoses.map((pose) => (
					<PoseCard
						key={pose.id}
						id={pose.id}
						{...pose}
						context="editPose"
						onEdit={handleEditPose}
						onEditDelete={handleEditDelete}
					/>
				))}
			</div>

			{!loading && filteredPoses.length === 0 && (
				<div className={styles.posesEmpty}>
					{isSearching
						? "No poses found matching your search."
						: "No poses available."}
				</div>
			)}
			{message && (
				<p className={styles.message}>{message}</p>
			)}
		</div>
	);
}
