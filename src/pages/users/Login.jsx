import LoginBox from "./components/LoginBox";
import SVGBox from "./components/SVGBox";

export default function Login() {
	const LoginSVG = () => (
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
		<div>
			<div>
				<SVGBox
					img="../assets/logo.png"
					title="Welcome back!!"
					svg={LoginSVG}
				/>
			</div>
			<div>
				<LoginBox />
			</div>
		</div>
	);
}
