import { useState } from "react";
import styles from "./poseFilter.module.css";

export default function PoseFilter({
	onFilter,
	onClear,
	isSearching = false,
}) {
	const [searchTerm, setSearchTerm] = useState("");

	// Search input
	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);

		if (value.trim()) {
			onFilter(value.trim());
		} else {
			onClear();
		}
	};

	// Clear input
	const handleClear = () => {
		setSearchTerm("");
		onClear();
	};

	// Enter key press
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
					<span className={styles.searchIcon}>🔍</span>

					<input
						type="text"
						className={styles.searchInput}
						placeholder="Search poses by name..."
						value={searchTerm}
						onChange={handleInputChange}
						onKeyUp={handleKeyPress}
					/>

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
