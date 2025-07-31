import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContextDef";

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

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkAuthStatus = useCallback(async () => {
		try {
			const token = localStorage.getItem("token");
			const userData = localStorage.getItem("userData");

			if (!token) {
				setLoading(false);
				setUser(null);
				setIsLoggedIn(false);
				return;
			}

			const tokenPayload = decodeToken(token);

			if (tokenPayload) {
				const parsedUser = userData
					? JSON.parse(userData)
					: null;
				const finalUser = {
					...parsedUser,
					id: tokenPayload.id,
					role: tokenPayload.role,
				};
				setUser(finalUser);
				setIsLoggedIn(true);
			} else {
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
	}, []);

	useEffect(() => {
		checkAuthStatus();
	}, [checkAuthStatus]);

	const refreshAuth = async () => {
		setLoading(true);
		await checkAuthStatus();
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		setUser(null);
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				isLoggedIn,
				isAdmin: user?.role === "admin",
				logout,
				refreshAuth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
