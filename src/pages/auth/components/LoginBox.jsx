import { useState } from "react";
import { useLogIn } from "../../../hooks/useLogIn";
import Btn from "../../../components/globals/Buttons/Btn.jsx";
import styles from "../auth.module.css";

export default function Login() {
	const { handleLogIn, error, loading } = useLogIn();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		handleLogIn({ email, password });
	};

	return (
		<div className={styles.containerAuth}>
			<form
				onSubmit={onSubmit}
				className={styles.formWrapper}
			>
				<label className={styles.label}>E-mail</label>
				<input
					type="email"
					placeholder="Enter your email address"
					className={styles.inputField}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label className={styles.label}>Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					className={styles.inputField}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div>
					<Btn
						text={loading ? "Log In..." : "Log In"}
						type="submit"
						variant="primary"
					/>
				</div>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</form>
		</div>
	);
}
