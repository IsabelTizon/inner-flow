// src/hooks/useDropdownManager.js
// Custom hook to manage multiple dropdowns ensuring only one is open at a time
import { useState, useCallback, useEffect } from "react";

export default function useDropdownManager() {
	const [activeDropdown, setActiveDropdown] =
		useState(null);

	// Effect to handle click outside to close dropdowns
	useEffect(() => {
		const handleClickOutside = (e) => {
			// Check if the click is outside any dropdown
			const isClickInsideDropdown = e.target.closest(
				"[data-dropdown]"
			);

			// If click is outside and there's an active dropdown, close it
			if (!isClickInsideDropdown && activeDropdown) {
				setActiveDropdown(null);
			}
		};

		// Add event listener when there's an active dropdown
		if (activeDropdown) {
			document.addEventListener(
				"mousedown",
				handleClickOutside
			);
		}

		// Cleanup function to remove event listener
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);
		};
	}, [activeDropdown]);

	// Function to toggle a specific dropdown: "yoga" o "user"
	const toggleDropdown = useCallback((dropdownId) => {
		setActiveDropdown((current) =>
			current === dropdownId ? null : dropdownId
		);
	}, []);

	// Function to close all dropdowns
	const closeAllDropdowns = useCallback(() => {
		setActiveDropdown(null);
	}, []);

	// Function to check if a specific dropdown ("yoga" o "user") is open
	const isDropdownOpen = useCallback(
		(dropdownId) => {
			return activeDropdown === dropdownId;
		},
		[activeDropdown]
	);

	// Function to open a specific dropdown (closes others)
	const openDropdown = useCallback((dropdownId) => {
		setActiveDropdown(dropdownId);
	}, []);

	return {
		toggleDropdown,
		closeAllDropdowns,
		isDropdownOpen,
		openDropdown,
		activeDropdown,
	};
}
