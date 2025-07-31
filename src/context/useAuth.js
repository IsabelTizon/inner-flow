import { useContext } from "react";
import { AuthContext } from "./AuthContextDef";

export function useAuth() {
	// Custom hook to access AuthContext
	return useContext(AuthContext); // This allows components to access authentication state and methods
}
