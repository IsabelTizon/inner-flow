// src/hooks/useRegister.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function useLogIn() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleLogIn = async ({ email, password }) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"http://localhost:3000/users/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || "Error en el log in"
				);
			}

			// Éxito
			alert("Usuario logueado con éxito");
			navigate("/home");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { handleLogIn, error, loading };
}
