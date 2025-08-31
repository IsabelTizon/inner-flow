// src/hooks/useDropdownManager.js
// Custom hook to manage multiple dropdowns ensuring only one is open at a time
import { useState, useEffect } from "react";

export default function useDropdownManager() {
	// is used to manage multiple dropdowns (drop-down menus), ensuring that only one is open at a time.
	const [activeDropdown, setActiveDropdown] =
		useState(null); // Save the ID of the open dropdown (for example, “user” or “yoga”). Initially it is null, which means that no dropdown is open.

	// Effect to handle click outside to close dropdowns
	useEffect(() => {
		const handleClickOutside = (e) => {
			// Check if the click was inside an element that has the data-dropdown attribute.
			const isClickInsideDropdown = e.target.closest(
				"[data-dropdown]"
			);

			// If the click was outside of any dropdown and there is one open, it closes it.
			if (!isClickInsideDropdown && activeDropdown) {
				setActiveDropdown(null);
			}
		};
		// When the user clicks with the mouse, it executes the handleClickOutside function.
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
	// If the current dropdown is the same as the one you want to open, it closes it.
	// If it is different, it opens it and closes the previous one.
	const toggleDropdown = (dropdownId) => {
		setActiveDropdown((current) =>
			current === dropdownId ? null : dropdownId
		);
	};

	// Function to close all dropdowns
	const closeAllDropdowns = () => {
		setActiveDropdown(null);
	};

	// Function to check if a specific dropdown ("yoga" o "user") is open
	// Returns true if the dropdown with that ID is open.
	const isDropdownOpen = (dropdownId) => {
		return activeDropdown === dropdownId;
	};

	// Function to open a specific dropdown (closes others)
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
