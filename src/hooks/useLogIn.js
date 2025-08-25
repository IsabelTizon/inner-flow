// src/hooks/useRegister.js
// States
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

export function useLogIn() {
	const navigate = useNavigate();
	const { refreshAuth } = useAuth();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

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
				console.log("📥 Login response:", data);

				// Guardar datos
				localStorage.setItem("token", data.token);
				localStorage.setItem(
					"userData",
					JSON.stringify(data.user)
				);

				// Refrescar auth
				await refreshAuth();

				console.log("🎯 User role:", data.user.role); // Debug

				// ✅ Redirect correcto (sin duplicación)
				if (data.user.role === "ADMIN") {
					// ← minúscula
					navigate("/admin");
				} else {
					navigate("/");
				}

				console.log("✅ Login successful");
			} else {
				const errorData = await response.json();
				setError(errorData.message || "Login failed");
			}
		} catch (err) {
			console.error("🚨 Login error:", err);
			setError(err.message || "Network error");
		} finally {
			setLoading(false);
		}
	};

	return { handleLogIn, error, loading };
}
