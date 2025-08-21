// COMPONENTS
import PoseCard from "../../components/globals/Yoga/PoseCard";
import PoseFilter from "../../components/globals/Yoga/PoseFilter";
// STYLES
import styles from "./Poses.module.css";
// STATES
import { useEffect, useState } from "react";

export default function Poses() {
	const [poses, setPoses] = useState([]); // All yoga poses
	const [filteredPoses, setFilteredPoses] = useState([]); // Filtered yoga poses
	const [isSearching, setIsSearching] = useState(false); // Searching state
	const [loading, setLoading] = useState(false); // Loading state

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
						context="poses"
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
		</div>
	);
}
