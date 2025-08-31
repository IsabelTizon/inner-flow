// src/hooks/useToggle.js
// REACT HOOKS
import { useState } from "react"; // for creating states

// initial: default value (false = closed)
export default function useToggle(initial = false) {
	const [isOpen, setIsOpen] = useState(initial); // Array Destructuring: [false, function]
	// Function to toggle between true and false
	// !curr: inverts the current value (true becomes false, false becomes true)
	const toggle = () => setIsOpen((curr) => !curr);

	return [isOpen, toggle];
}
