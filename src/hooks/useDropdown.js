import { useState, useCallback } from "react";

export default function useDropdown(initialState = false) {
	const [isOpen, setIsOpen] = useState(initialState);

	const open = useCallback(() => setIsOpen(true), []);

	const close = useCallback(() => setIsOpen(false), []);

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
