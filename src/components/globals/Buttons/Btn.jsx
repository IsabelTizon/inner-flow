import { Link } from "react-router-dom";
import buttonsStyles from "./btn.module.css";

export default function Btn({
	text,
	to,
	onClick,
	bgColor,
	textColor,
	type,
	variant,
}) {
	const style = {
		...(bgColor && { backgroundColor: bgColor }),
		...(textColor && { color: textColor }),
	};

	const classNames = variant ? buttonsStyles[variant] : "";

	if (to) {
		return (
			<Link to={to} className={classNames} style={style}>
				{text}
			</Link>
		);
	}

	return (
		<button
			className={classNames}
			onClick={onClick}
			style={style}
			type={type || "button"}
		>
			{text}
		</button>
	);
}
