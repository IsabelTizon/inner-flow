import RegisterBox from "./components/RegisterBox";
import SVGBox from "./components/SVGBox";
import styles from "./auth.module.css";

import logo from "../../../assets/logo.png";
import greetingImg from "../../../assets/greeting1.jpg";

export default function Register() {
	return (
		<div className={styles.authLayout}>
			<div className={styles.greetingLayout}>
				<SVGBox
					logo={logo}
					title="Be part of Inner Flow family!!! Create and save you own yoga sequences"
					greetingImg={greetingImg}
					className={styles.greetingBox}
				/>
			</div>
			<div className={styles.formLayout}>
				<RegisterBox />
			</div>
		</div>
	);
}
