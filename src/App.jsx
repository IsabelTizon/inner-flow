import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
	return (
		// Global authentication context provider. Wrap your components into a context provider to specify the value of this context for all components inside
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
}
