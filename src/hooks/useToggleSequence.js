import { useState } from "react";

export const useToggleSequence = () => {
	const [expandedItems, setExpandedItems] = useState(
		new Set()
	);

	const toggleSequence = (sequenceId) => {
		const newExpanded = new Set(expandedItems);

		if (newExpanded.has(sequenceId)) {
			newExpanded.delete(sequenceId);
		} else {
			newExpanded.add(sequenceId);
		}
		setExpandedItems(newExpanded);
	};

	return {
		expandedItems,
		toggleSequence,
	};
};
