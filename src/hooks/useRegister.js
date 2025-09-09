// REACT HOOKS
import { useNavigate } from "react-router-dom"; // to navigate
import { useState } from "react"; // for creating states

// .env DEVELOPMENT/DEPLOYMENT
const apiUrl = import.meta.env.VITE_API_URL;

export function useRegister() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleRegister = async ({
		name,
		email,
		password,
	}) => {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch(`${apiUrl}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || "Error registering user"
				);
			}

			alert("User registered successfully");
			navigate("/login");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { handleRegister, error, loading };
}
