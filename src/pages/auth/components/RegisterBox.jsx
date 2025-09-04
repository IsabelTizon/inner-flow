// HOOKS
import { useState } from "react";

// CUSTOM HOOKS
import { useRegister } from "../../../hooks/useRegister";

// GLOBAL COMPONENTS
import Btn from "../../../components/globals/Buttons/Btn.jsx";

// STYLES
import styles from "../auth.module.css";

export default function RegisterBox() {
	const { handleRegister, error, loading } = useRegister(); // Custom hook for registration

	const [name, setName] = useState(""); // Full name
	const [email, setEmail] = useState(""); // Email
	const [password, setPassword] = useState(""); // Password
	const [agreed, setAgreed] = useState(false); // Checkbox for terms

	const onSubmit = (e) => {
		e.preventDefault();

		if (!agreed) {
			alert(
				"You must accept the Terms & Conditions to register"
			);
			return;
		}

		handleRegister({ name, email, password });
	};

	return (
		<form
			onSubmit={onSubmit}
			className={styles.formWrapper}
		>
			<label className={styles.label}>Full Name</label>
			<input
				type="text"
				placeholder="Enter your full name"
				className={styles.inputField}
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label className={styles.label}>Password</label>
			<input
				type="password"
				placeholder="Enter your password"
				className={styles.inputField}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<label className={styles.label}>E-mail</label>
			<input
				type="email"
				placeholder="Enter your e-mail address"
				className={styles.inputField}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<div className={styles.checkboxWrapper}>
				<input
					type="checkbox"
					className={styles.checkbox}
					checked={agreed}
					onChange={(e) => setAgreed(e.target.checked)}
				/>
				<span className={styles.checkboxLabel}>
					By signing up you agree{" "}
					<a className={styles.checkboxTerms} href="/terms">
						Terms & Conditions
					</a>
				</span>
			</div>

			<div>
				<Btn
					text={loading ? "Registering..." : "Sign Up"}
					type="submit"
					variant="primary"
				/>
			</div>

			{error && <p style={{ color: "red" }}>{error}</p>}
		</form>
	);
}
