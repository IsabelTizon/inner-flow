// src/hooks/useRegister.js
// REACT HOOKS
import { useNavigate } from "react-router-dom"; // to navigate
import { useState } from "react"; // for creating states

// .env DEVELOPMENT/DEPLOYMENT
const apiUrl = import.meta.env.VITE_API_URL;

export function useRegister() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false); // Boolean indicating whether the registration request is in progress (initially false).

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
				// If the res is not ok (status code outside 200-299)
				const errorData = await res.json();
				throw new Error(
					errorData.message || "Error registering user"
				);
			}

			// Success
			alert("User registered successfully");
			navigate("/login");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false); // It always runs at the end, whether successful or not, and that's where loading is disabled (setLoading(false)).
		}
	};

	return { handleRegister, error, loading };
}
