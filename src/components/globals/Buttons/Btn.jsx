import { Link } from "react-router-dom";
import buttonsStyles from "./Buttons.module.css";

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

	const classNames = `${buttonsStyles.btn} ${
		variant ? buttonsStyles[variant] : ""
	}`;

	console.log("variant:", variant);
	console.log("classNames:", classNames);

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
