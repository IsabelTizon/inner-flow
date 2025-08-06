import PoseCard from "./components/PoseCard";
import PoseFilter from "./components/PoseFilter";
import { useEffect, useState } from "react";

export default function Poses() {
	const [poses, setPoses] = useState([]);
	const [filteredPoses, setFilteredPoses] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [loading, setLoading] = useState(false);

	// Cargar todas las poses al inicio
	useEffect(() => {
		loadAllPoses();
	}, []);

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

	// Función para buscar poses por nombre
	const handleFilter = async (searchTerm) => {
		setLoading(true);
		setIsSearching(true);

		try {
			// ✅ Hacer fetch a endpoint de búsqueda
			const response = await fetch(
				`http://localhost:3000/poses/search?name=${encodeURIComponent(
					searchTerm
				)}`
			);
			const data = await response.json();
			setFilteredPoses(data);
		} catch (err) {
			console.error("Error searching poses:", err);
			// Fallback: filtrar localmente si el endpoint falla
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

	// Función para limpiar filtros
	const handleClearFilter = () => {
		setFilteredPoses(poses);
		setIsSearching(false);
	};

	return (
		<div style={{ padding: "20px" }}>
			{/* ✅ Componente de filtro */}
			<PoseFilter
				onFilter={handleFilter}
				onClear={handleClearFilter}
				isSearching={loading} // ✅ ¡AÑADE ESTA LÍNEA!
			/>

			{/* Indicador de búsqueda */}
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

			{/* Grid de poses */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fill, minmax(300px, 1fr))",
					gap: "20px",
				}}
			>
				{filteredPoses.map((pose) => (
					<PoseCard key={pose.id} {...pose} />
				))}
			</div>

			{/* Mensaje cuando no hay resultados */}
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
