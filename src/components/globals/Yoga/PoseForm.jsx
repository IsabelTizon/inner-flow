// REACT HOOKS
import { useState, useEffect } from "react";

// STYLES
import styles from "../../../pages/admin/poses/adminPoseForm.module.css";

// GLOBAL COMPONENTS
import Btn from "../Buttons/Btn.jsx";

// Reusable form for creating or editing a yoga pose
export default function PoseForm({
	mode,
	title,
	submitButtonText,
	onSubmit,
	message = "",
	initialData = {
		name: "",
		description: "",
		image: "",
	},
	loading = false,
}) {
	const [name, setName] = useState(initialData.name);
	const [description, setDescription] = useState(
		initialData.description
	);
	const [useAIDescription, setUseAIDescription] =
		useState(false);
	const [image, setImage] = useState(initialData.image);

	// Update form data when initialData changes (for EDIT mode only)
	useEffect(() => {
		if (mode === "edit") {
			setName(initialData.name || "");
			setDescription(initialData.description || "");
			setImage(initialData.image || "");
		}
	}, [initialData, mode]); //If the value of mode or any of the values of initialData changes, re-execute this effect.

	// CREATE: Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevents the form from reloading the page.

		const formData = {
			name,
			image,
		}; // Create an object with the data to be sent.

		// Only include description if not using AI and has content
		if (!useAIDescription && description.trim()) {
			formData.description = description;
		}

		// Call the parent's submit handler
		await onSubmit(formData);

		// Reset form only for create mode
		if (mode === "create") {
			setName("");
			setDescription("");
			setImage("");
			setUseAIDescription(false);
		}
	};

	// Show loading state if data is being fetched
	if (loading) {
		return (
			<div className={styles.form}>
				<p>Loading pose data...</p>
			</div>
		);
	}

	//FORM
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{/* Form title */}
			<h2 className={styles.title}>{title}</h2>
			{/* Form fields */}
			{/* name */}
			<label className={styles.label}>
				Name:
				<input
					className={styles.input}
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</label>
			{/* AI description */}
			<label className={styles.label}>
				<input
					type="checkbox"
					checked={useAIDescription}
					onChange={
						(e) => setUseAIDescription(e.target.checked) // When the user clicks, the useAIDescription status is updated with the new value.
					}
				/>
				Generate description with AI
			</label>
			{!useAIDescription && (
				<label className={styles.label}>
					Description:
					<textarea
						className={styles.textarea}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Leave empty to generate with AI"
					/>
				</label>
			)}
			{/* Image URL */}
			<label className={styles.label}>
				Image URL:
				<input
					className={styles.input}
					type="text"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
			</label>
			{/* Submit button */}
			<Btn
				type="submit"
				text={submitButtonText}
				variant="primary"
			/>
			{/* Message display */}
			{message && (
				<p className={styles.message}>{message}</p>
			)}
		</form>
	);
}
