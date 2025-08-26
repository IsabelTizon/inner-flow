import { useState } from "react";
import styles from "./adminPoseForm.module.css";

export default function CreatePose() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [message, setMessage] = useState("");
	const [useAIDescription, setUseAIDescription] =
		useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");

			const requestData = {
				name,
				image: image,
			};

			if (!useAIDescription && description.trim()) {
				requestData.description = description;
			}

			const res = await fetch(
				"http://localhost:3001/poses",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(requestData),
				}
			);
			if (res.ok) {
				setMessage("Pose created successfully!");
				setName("");
				setDescription("");
				setImage("");
				setUseAIDescription(false);
			} else {
				setMessage("Error creating pose.");
			}
		} catch {
			setMessage("Connection error.");
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h2 className={styles.title}>Create a New Pose</h2>
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

			<label className={styles.label}>
				<input
					type="checkbox"
					checked={useAIDescription}
					onChange={(e) =>
						setUseAIDescription(e.target.checked)
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

			<label className={styles.label}>
				Image URL:
				<input
					className={styles.input}
					type="text"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
			</label>
			<button className={styles.button} type="submit">
				Create Pose
			</button>
			{message && (
				<p className={styles.message}>{message}</p>
			)}
		</form>
	);
}
