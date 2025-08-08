import buttonsStyles from "./btn.module.css";

export default function EyeBtn({ onClick }) {
	return (
		<button
			className={buttonsStyles.eyeBtn}
			onClick={onClick}
			title="View description"
		>
			👁
		</button>
	);
}
