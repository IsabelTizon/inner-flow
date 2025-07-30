// src/hooks/useDropdown.js
// State
// Import React hooks for state management and performance optimization
import { useState, useCallback } from "react";

// Custom hook for dropdown functionality with explicit open/close/toggle actions
// initialState: default value (false = closed)
export default function useDropdown(initialState = false) {
	const [isOpen, setIsOpen] = useState(initialState); // Array Destructuring: [false, function]

	// Function to explicitly open the dropdown (set to true)
	// useCallback: memoizes function to prevent unnecessary re-renders
	// []: empty dependency array means function never changes
	const open = useCallback(() => setIsOpen(true), []);
	// Function to explicitly close the dropdown (set to false)
	const close = useCallback(() => setIsOpen(false), []);
	// Function to toggle between open and closed states
	// !curr: inverts current value (true→false, false→true)
	const toggle = useCallback(
		() => setIsOpen((curr) => !curr),
		[]
	);

	return {
		isOpen,
		open,
		close,
		toggle,
	};
}
