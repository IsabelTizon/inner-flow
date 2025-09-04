// src/pages/auth/register.jsx
// COMPONENTS
import RegisterBox from "./components/RegisterBox";
import GreetingBox from "./components/greetingBox";

// ASSETS
import logo from "../../assets/logo.png";
import greetingImg from "../../assets/greeting1.jpg";

// STYLES
import styles from "./auth.module.css";

export default function Register() {
	return (
		<div className={styles.authLayout}>
			<div className={styles.greetingLayout}>
				<GreetingBox
					logo={logo}
					title={
						<>
							Be part of Inner Flow family!!!
							<br />
							Create and save your own yoga sequences
						</>
					}
					greetingImg={greetingImg}
					className={styles.containerAuth}
				/>
			</div>
			<div className={styles.formLayout}>
				<RegisterBox />
			</div>
		</div>
	);
}
