// hooks/useAuth.js
// States
import { useState, useEffect } from "react";

// Función para decodificar JWT
const decodeToken = (token) => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url
			.replace(/-/g, "+")
			.replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return (
						"%" +
						("00" + c.charCodeAt(0).toString(16)).slice(-2)
					);
				})
				.join("")
		);
		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};

export function useAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			const token = localStorage.getItem("token");
			const userData = localStorage.getItem("userData");

			console.log("🔍 Token found:", token ? "YES" : "NO");

			if (!token) {
				setLoading(false);
				return;
			}

			// ✅ Decodificar el token para obtener el rol directamente
			const tokenPayload = decodeToken(token);
			console.log("🎫 Token payload:", tokenPayload);

			if (tokenPayload) {
				// Combinar datos del localStorage con datos del token
				const parsedUser = userData
					? JSON.parse(userData)
					: null;

				const finalUser = {
					...parsedUser,
					id: tokenPayload.id,
					role: tokenPayload.role, // ← Usar rol del token JWT
				};

				console.log("👤 Final user object:", finalUser);

				setUser(finalUser);
				setIsLoggedIn(true);
			} else {
				// Token inválido
				console.log("❌ Invalid token");
				localStorage.removeItem("token");
				localStorage.removeItem("userData");
				setUser(null);
				setIsLoggedIn(false);
			}
		} catch (error) {
			console.error("🚨 Auth check failed:", error);
			localStorage.removeItem("token");
			localStorage.removeItem("userData");
			setUser(null);
			setIsLoggedIn(false);
		} finally {
			setLoading(false);
		}
	};

	const refreshAuth = async () => {
		console.log("🔄 Refreshing auth...");
		await checkAuthStatus();
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		setUser(null);
		setIsLoggedIn(false);
	};

	console.log("🎯 Auth state:", {
		isLoggedIn,
		isAdmin: user?.role === "admin", // ← Comparar con "admin" (minúscula)
		userName: user?.name,
		userRole: user?.role,
		user,
	});

	return {
		user,
		loading,
		isLoggedIn,
		isAdmin: user?.role === "admin", // ← Usar "admin" minúscula
		logout,
		refreshAuth,
	};
}
