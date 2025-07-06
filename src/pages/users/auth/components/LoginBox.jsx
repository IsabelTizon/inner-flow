// COMPONENTS
import Btn from "../../../../components/globals/Buttons/Btn";
import { useLogIn } from "../../../../hooks/useLogIn";

// STYLES
import styles from "../auth.module.css";

export default function Login() {
	const { handleLogIn, error, loading } = useLogIn();

	const onSubmit = (e) => {
		e.preventDefault();
		const password = e.target[1].value;
		const email = e.target[2].value;

		handleLogIn({ email, password });
	};
	return (
		<div className={styles.containerAuth}>
			<div>{/* <Btn /> */}</div>
			<form
				onSubmit={onSubmit}
				className={styles.formWrapper}
			>
				<label className={styles.label}>E-mail</label>
				<input
					type="email"
					placeholder="Enter your e-mail address"
					className={styles.inputField}
				/>
				<label className={styles.label}>Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					className={styles.inputField}
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
