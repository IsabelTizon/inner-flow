// src/hooks/useLogIn.js
// REACT HOOKS
import { useNavigate } from "react-router-dom"; // to navigate
import { useState } from "react"; // for creating states

// CONTEXT
import { useAuth } from "../context/useAuth";

export function useLogIn() {
	const navigate = useNavigate();
	const { refreshAuth } = useAuth(); // Custom hook to access AuthContext
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false); // Boolean indicating whether the login request is in progress (initially false).

	const handleLogIn = async ({ email, password }) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"http://localhost:3001/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (response.ok) {
				const data = await response.json();
				console.log("Login response:", data);

				// Store the token and user data in localStorage to maintain the session.
				localStorage.setItem("token", data.token);
				localStorage.setItem(
					"userData",
					JSON.stringify(data.user)
				);

				// Refresh auth
				await refreshAuth();
				console.log("User role:", data.user.role); // Debug

				//
				if (data.user.role === "ADMIN") {
					navigate("/admin");
				} else {
					navigate("/");
				}
				console.log("Login successful");
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
