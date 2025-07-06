import Btn from "../../../../components/globals/Buttons/Btn";
import { useRegister } from "../../../../hooks/useRegister";
import styles from "../auth.module.css";

export default function RegisterBox() {
	const { handleRegister, error, loading } = useRegister();

	const onSubmit = (e) => {
		e.preventDefault();
		const name = e.target[0].value;
		const password = e.target[1].value;
		const email = e.target[2].value;

		handleRegister({ name, email, password });
	};
	return (
		<>
			<div>{/* <Btn /> */}</div>
			<form
				onSubmit={onSubmit}
				className={styles.formWrapper}
			>
				<label className={styles.label}>Full Name</label>
				<input
					type="text"
					placeholder="Enter your full name"
					className={styles.inputField}
				/>
				<label className={styles.label}>Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					className={styles.inputField}
				/>
				<label className={styles.label}>E-mail</label>
				<input
					type="email"
					placeholder="Enter your e-mail address"
					className={styles.inputField}
				/>
				<div className={styles.checkboxWrapper}>
					<input
						className={styles.checkbox}
						type="checkbox"
					/>
					<span>
						By signing up you agree{" "}
						<a href="#">Terms & Conditions</a>
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
		</>
	);
}
