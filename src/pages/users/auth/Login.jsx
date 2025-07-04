import LoginBox from "./components/LoginBox";
import SVGBox from "./components/greetingBox";
import logo from "../../../assets/logo.png";
import styles from "./auth.module.css";
import greetingImg from "../../../assets/greeting2.jpg";

export default function Login() {
	return (
		<div className={styles.authLayout}>
			<div className={styles.greetingLayout}>
				<SVGBox
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
