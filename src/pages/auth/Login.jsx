// src/pages/auth/Login.jsx
// COMPONENTS
import LoginBox from "./components/LoginBox";
import GreetingBox from "./components/GreetingBox";

// ASSETS
import logo from "../../assets/logo.png";
import greetingImg from "../../assets/greeting2.jpg";

// STYLES
import styles from "./auth.module.css";

export default function Login() {
	return (
		<div className={styles.authLayout}>
			<div className={styles.greetingLayout}>
				<GreetingBox
					logo={logo}
					title="Welcome back!!"
					greetingImg={greetingImg}
					className={styles.containerAuth}
				/>
			</div>
			<div className={styles.formLayout}>
				<LoginBox />
			</div>
		</div>
	);
}
