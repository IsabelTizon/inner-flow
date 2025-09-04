// REACT HOOKS
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// COMPONENTS
import PoseForm from "../../../components/globals/Yoga/PoseForm.jsx";

// .env DEVELOPMENT/DEPLOYMENT
const apiUrl = import.meta.env.VITE_API_URL;

export default function EditPoseForm() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [initialData, setInitialData] = useState({
		name: "",
		description: "",
		image: "",
	});
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);

	// Fetch existing pose data on mount
	useEffect(() => {
		const fetchPose = async () => {
			if (!id) {
				setMessage("No pose ID provided.");
				setLoading(false);
				return;
			}

			try {
				const res = await fetch(`${apiUrl}/poses/${id}`);
				if (!res.ok) throw new Error("Pose not found");
				const pose = await res.json();
				setInitialData({
					name: pose.name,
					description: pose.description || "",
					image: pose.image || "",
				});
			} catch {
				setMessage("Error loading pose.");
			} finally {
				setLoading(false);
			}
		};
		fetchPose();
	}, [id]);

	// FUNCTION TO UPDATE POSTURE
	const handleUpdate = async (formData) => {
		try {
			const token = localStorage.getItem("token"); // Retrieve the authentication token to authorize the request.

			const res = await fetch(`${apiUrl}/poses/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

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

	return (
		<PoseForm
			mode="edit"
			initialData={initialData}
			title={`Edit Pose: ${initialData.name || id}`}
			submitButtonText="Update Pose"
			onSubmit={handleUpdate}
			loading={loading}
			message={message}
		/>
	);
}
