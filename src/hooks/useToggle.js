// REACT HOOKS
import { useState } from "react";

// initial: default value (false = closed)
export default function useToggle(initial = false) {
	const [isOpen, setIsOpen] = useState(initial);

	const toggle = () => setIsOpen((curr) => !curr);

	return [isOpen, toggle];
}
