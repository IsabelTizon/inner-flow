// src/hooks/useRegister.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
			const response = await fetch(
				"http:///users/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email, password }),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || "Error en el registro"
				);
			}

			// Éxito
			alert("Usuario registrado con éxito");
			navigate("/login");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { handleRegister, error, loading };
}
