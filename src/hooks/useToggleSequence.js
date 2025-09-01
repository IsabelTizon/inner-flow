import { useState } from "react";

export const useToggleSequence = () => {
	const [expandedItems, setExpandedItems] = useState(
		new Set()
	);

	// TOGGLE SEQUENCE FUNCTION: SHOW & HIDE SEQUENCE DETAILS
	const toggleSequence = (sequenceId) => {
		const newExpanded = new Set(expandedItems); // Create a copy of the current Set

		// If the sequence is already expanded
		if (newExpanded.has(sequenceId)) {
			//  ... remove it from Set
			newExpanded.delete(sequenceId);
		} else {
			//  If collapsed, expand it (add to Set)
			newExpanded.add(sequenceId);
		}
		setExpandedItems(newExpanded); // Update the state with the new expanded sequences
	};

	return {
		expandedItems,
		toggleSequence,
	};
};
