// REACT HOOKS
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// CONTEXT
import { useAuth } from "../context/useAuth";

// .env DEVELOPMENT/DEPLOYMENT
const apiUrl = import.meta.env.VITE_API_URL;

export function useLogIn() {
	const navigate = useNavigate();
	const { refreshAuth } = useAuth();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleLogIn = async ({ email, password }) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`${apiUrl}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				"Login response:", data;

				localStorage.setItem("token", data.token);
				localStorage.setItem(
					"userData",
					JSON.stringify(data.user)
				);

				await refreshAuth();

				//
				if (data.user.role === "ADMIN") {
					navigate("/admin");
				} else {
					navigate("/");
				}
			} else {
				const errorData = await response.json();
				setError(errorData.message || "Login failed");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError(err.message || "Network error");
		} finally {
			setLoading(false);
		}
	};

	return { handleLogIn, error, loading };
}
