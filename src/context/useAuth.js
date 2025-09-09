// React Hook
import { useContext } from "react";
// Custom hook to access AuthContext
import { AuthContext } from "./AuthContextDef";

export function useAuth() {
	// Custom hook to access AuthContext
	return useContext(AuthContext);
}
