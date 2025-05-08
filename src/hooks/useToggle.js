import { useState } from "react";

export default function useToggle(initial = false) {
	const [isOpen, setIsOpen] = useState(initial);
	const toggle = () => setIsOpen((curr) => !curr);

	return [isOpen, toggle];
}
