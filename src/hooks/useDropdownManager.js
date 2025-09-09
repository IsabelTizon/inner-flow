import { useState, useEffect } from "react";

export default function useDropdownManager() {
	const [activeDropdown, setActiveDropdown] =
		useState(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			const isClickInsideDropdown = e.target.closest(
				"[data-dropdown]"
			);

			if (!isClickInsideDropdown && activeDropdown) {
				setActiveDropdown(null);
			}
		};

		if (activeDropdown) {
			document.addEventListener(
				"mousedown",
				handleClickOutside
			);
		}

		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);
		};
	}, [activeDropdown]);

	const toggleDropdown = (dropdownId) => {
		setActiveDropdown((current) =>
			current === dropdownId ? null : dropdownId
		);
	};

	const closeAllDropdowns = () => {
		setActiveDropdown(null);
	};

	const isDropdownOpen = (dropdownId) => {
		return activeDropdown === dropdownId;
	};

	const openDropdown = (dropdownId) => {
		setActiveDropdown(dropdownId);
	};

	return {
		toggleDropdown,
		closeAllDropdowns,
		isDropdownOpen,
		openDropdown,
		activeDropdown,
	};
}
