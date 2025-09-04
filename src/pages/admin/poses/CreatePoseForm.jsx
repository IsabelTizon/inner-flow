// REACT HOOKS
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// .env DEVELOPMENT/DEPLOYMENT
const apiUrl = import.meta.env.VITE_API_URL;

// COMPONENTS
import PoseForm from "../../../components/globals/Yoga/PoseForm.jsx";

export default function CreatePoseForm() {
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (formData) => {
		try {
			const token = localStorage.getItem("token"); // Retrieve the authentication token to authorize the request.

			const res = await fetch(`${apiUrl}/poses`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (res.ok) {
				setMessage("Pose created successfully!");
				setTimeout(() => navigate("/admin"), 1500);
			} else {
				setMessage("Error creating pose.");
			}
		} catch {
			setMessage("Connection error.");
		}
	};

	return (
		<PoseForm
			mode="create"
			title="Create a New Pose"
			submitButtonText="Create Pose"
			onSubmit={handleSubmit}
			message={message}
		/>
	);
}
