import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./adminPoseForm.module.css";

export default function EditPoseForm() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [useAIDescription, setUseAIDescription] =
		useState(false);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPose = async () => {
			if (!id) {
				setMessage("No pose ID provided.");
				setLoading(false);
				return;
			}

			try {
				const res = await fetch(
					`http://localhost:3001/poses/${id}`
				);
				if (!res.ok) throw new Error("Pose not found");
				const pose = await res.json();
				setName(pose.name);
				setDescription(pose.description || "");
				setImage(pose.image || "");
			} catch {
				setMessage("Error loading pose.");
			} finally {
				setLoading(false);
			}
		};
		fetchPose();
	}, [id]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const requestData = {
				name,
				image,
			};
			if (!useAIDescription && description.trim()) {
				requestData.description = description;
			}

			const res = await fetch(
				`http://localhost:3001/poses/${id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(requestData),
				}
			);

			if (res.ok) {
				setMessage("Pose updated successfully!");
				setTimeout(() => navigate("/admin"), 1500);
			} else {
				setMessage("Error updating pose.");
			}
		} catch {
			setMessage("Connection error.");
		}
	};

	if (loading) {
		return (
			<div className={styles.form}>
				<p>Loading pose data...</p>
			</div>
		);
	}

	return (
		<form className={styles.form} onSubmit={handleUpdate}>
			<h2 className={styles.title}>{`Edit Pose: ${
				name || id
			}`}</h2>
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
				Update Pose
			</button>
			{message && (
				<p className={styles.message}>{message}</p>
			)}
		</form>
	);
}
