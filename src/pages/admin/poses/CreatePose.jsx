import { useState } from "react";
import styles from "./createPose.module.css";

export default function CreatePose() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				"http://localhost:3000/poses",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						description,
						image,
					}),
				}
			);
			if (res.ok) {
				setMessage("Pose created successfully!");
				setName("");
				setDescription("");
				setImage("");
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
				Description:
				<textarea
					className={styles.textarea}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
			</label>
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
