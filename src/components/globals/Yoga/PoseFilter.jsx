import { useState } from "react";
import styles from "./PoseFilter.module.css";

export default function PoseFilter({
	onFilter,
	onClear,
	isSearching = false,
}) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);

		// Búsqueda en tiempo real (opcional)
		if (value.trim()) {
			onFilter(value.trim());
		} else {
			onClear();
		}
	};

	const handleClear = () => {
		setSearchTerm("");
		onClear();
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (searchTerm.trim()) {
				onFilter(searchTerm.trim());
			}
		}
	};

	return (
		<div className={styles.filterContainer}>
			<form className={styles.searchForm}>
				<div
					className={`${styles.inputGroup} ${
						isSearching ? styles.searching : ""
					}`}
				>
					{/* Icono de lupa */}
					<span className={styles.searchIcon}>🔍</span>

					{/* Input de búsqueda */}
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Search poses by name..."
						value={searchTerm}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
					/>

					{/* Icono de limpiar (X) */}
					<button
						type="button"
						className={`${styles.clearIcon} ${
							searchTerm ? styles.visible : ""
						}`}
						onClick={handleClear}
						aria-label="Clear search"
					>
						✕
					</button>
				</div>
			</form>
		</div>
	);
}
