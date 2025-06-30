import RegisterBox from "./components/RegisterBox";
import SVGBox from "./components/SVGBox";
import styles from "./auth.module.css";

import logo from "../../../assets/logo.png";

export default function Register() {
	const registerSVG = () => (
		<svg
			width="120"
			height="120"
			viewBox="0 0 120 120"
			fill="none"
		>
			<path
				d="M60 100 Q80 80 60 60 Q40 80 60 100"
				stroke="#fff"
				strokeWidth="3"
				fill="none"
			/>
			<circle
				cx="60"
				cy="55"
				r="8"
				stroke="#fff"
				strokeWidth="3"
				fill="none"
			/>
			<path
				d="M60 63 Q65 70 70 75"
				stroke="#fff"
				strokeWidth="3"
				fill="none"
			/>
			<path
				d="M60 63 Q55 70 50 75"
				stroke="#fff"
				strokeWidth="3"
				fill="none"
			/>
		</svg>
	);

	return (
		<div className={styles.authLayout}>
			<div className={styles.SVGLayout}>
				<SVGBox
					logo={logo}
					title="Be part of Inner Flow family and create and save you own yoga sequences"
					svg={registerSVG}
				/>
			</div>
			<div className={styles.formLayout}>
				<RegisterBox />
			</div>
		</div>
	);
}
