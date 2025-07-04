// COMPONENTS
import Btn from "../../../../components/globals/Buttons/Btn";

// STYLES
import styles from "../auth.module.css";

export default function Login() {
	return (
		<div className={styles.containerAuth}>
			<div>
				<Btn />
			</div>
			<form>
				<label>Password</label>
				<input
					type="password"
					placeholder="Enter your password"
				/>
				<label>E-mail</label>
				<input
					type="email"
					placeholder="Enter your e-mail address"
				/>
				<div>
					<Btn />
				</div>
			</form>
		</div>
	);
}
