//  HOOKS
import { useState, useEffect, useCallback } from "react";
// CONTEXT
import { AuthContext } from "./AuthContextDef";

const decodeToken = (token) => {
	//A JWT is a text string that is widely used in authentication. It has the following format: xxxxx.yyyyy.zzzzz
	//xxxxx → header (information about the algorithm and token type, in Base64)
	//yyyyy → payload (user data: ID, email, role, etc., in Base64)
	//zzzzz → signature (to validate that the token has not been tampered with)
	try {
		const base64Url = token.split(".")[1]; // Divide the token by the dots (.) and take the second part (yyyyy = payload).
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
				.join("") // Convert from Base64 to plain text (but still with characters: e.g., “{\”id\“:\”12345\“,\”role\“:\”admin\“}”).
		);
		return JSON.parse(jsonPayload); // it converts the JSON string into a JavaScript object
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};

export function AuthProvider({ children }) {
	// AuthProvider recives Children prop to wrap the app in index.jsx/App.jsx and thus provide state to the entire app.
	const [user, setUser] = useState(null); // user data
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Function to check authentication status
	const checkAuthStatus = useCallback(async () => {
		try {
			const token = localStorage.getItem("token");
			const userData = localStorage.getItem("userData");

			if (!token) {
				// If there is not token clear the states
				setLoading(false);
				setUser(null);
				setIsLoggedIn(false);
				return;
			}

			const tokenPayload = decodeToken(token);

			if (tokenPayload) {
				const now = Math.floor(Date.now() / 1000);
				// Check if the token has an expiration time and if it is expired
				if (tokenPayload.exp && tokenPayload.exp < now) {
					console.warn("Token expired");
					localStorage.removeItem("token"); // Remove the expired token from localStorage
					localStorage.removeItem("userData"); // Remove user data from localStorage
					setUser(null); // Clear user state
					setIsLoggedIn(false); // There is no token in localStorage → clear the status and set isLoggedIn = false.
					setLoading(false); // Stop the loading state
					return;
				}

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
				// If the token is invalid clear the localStorage and the states
				localStorage.removeItem("token");
				localStorage.removeItem("userData");
				setUser(null);
				setIsLoggedIn(false);
			}
		} catch (error) {
			console.error("LOG: Auth check failed:", error);
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

	// Delete the token and localStorage data and reset the statuses → this logs the user out.
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
