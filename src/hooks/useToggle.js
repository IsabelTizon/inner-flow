// src/hooks/useToggle.js
// State
import { useState } from "react";

// initial: default value (false = closed)
export default function useToggle(initial = false) {
	const [isOpen, setIsOpen] = useState(initial); // Array Destructuring: [false, function]
	// Function to toggle between true and false
	// !curr: inverts the current value (true becomes false, false becomes true)
	const toggle = () => setIsOpen((curr) => !curr);

	return [isOpen, toggle];
}
