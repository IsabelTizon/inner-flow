import { useState } from "react";
import Btn from "../../../../components/globals/Buttons/Btn";
import { useRegister } from "../../../../hooks/useRegister";
import styles from "../auth.module.css";

export default function RegisterBox() {
	const { handleRegister, error, loading } = useRegister();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
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
