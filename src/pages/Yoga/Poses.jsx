// COMPONENTS
import PoseCard from "./components/PoseCard";
import PoseFilter from "./components/PoseFilter";
// STATES
import { useEffect, useState } from "react";

export default function Poses() {
	const [poses, setPoses] = useState([]);
	const [filteredPoses, setFilteredPoses] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [loading, setLoading] = useState(false);

	// STATE useEffect to download all poses in the rendering
	useEffect(() => {
		loadAllPoses();
	}, []);

	// STATE to load all poses
	const loadAllPoses = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				"http://localhost:3000/poses"
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

	// Searching poses by name
	const handleFilter = async (searchTerm) => {
		setLoading(true);
		setIsSearching(true);

		try {
			// fetch endpoint by name
			const response = await fetch(
				`http://localhost:3000/poses/search?name=${encodeURIComponent(
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

	// Clear filters
	const handleClearFilter = () => {
		setFilteredPoses(poses);
		setIsSearching(false);
	};

	return (
		<div style={{ padding: "20px" }}>
			{/* Filter component */}
			<PoseFilter
				onFilter={handleFilter}
				onClear={handleClearFilter}
				isSearching={loading}
			/>

			{/* Search indicator */}
			{isSearching && (
				<div
					style={{
						textAlign: "center",
						marginBottom: "20px",
						color: "#666",
						fontStyle: "italic",
					}}
				>
					Showing search results ({filteredPoses.length}{" "}
					found)
				</div>
			)}

			{/* Loading indicator */}
			{loading && (
				<div
					style={{ textAlign: "center", padding: "20px" }}
				>
					Loading poses...
				</div>
			)}

			{/* Poses Grid */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fill, minmax(300px, 1fr))",
					gap: "20px",
				}}
			>
				{filteredPoses.map((pose) => (
					<PoseCard key={pose.id} id={pose.id} {...pose} />
				))}
			</div>

			{/* Message when no results */}
			{!loading && filteredPoses.length === 0 && (
				<div
					style={{
						textAlign: "center",
						padding: "40px",
						color: "#666",
					}}
				>
					{isSearching
						? "No poses found matching your search."
						: "No poses available."}
				</div>
			)}
		</div>
	);
}
