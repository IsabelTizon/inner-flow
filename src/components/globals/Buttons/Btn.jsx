import { Link } from "react-router-dom";
import styles from "./Btn.module.css";

export default function Btn({
	text,
	to,
	onClick,
	bgColor,
	textColor,
	type,
}) {
	const style = {
		...(bgColor && { backgroundColor: bgColor }),
		...(textColor && { color: textColor }),
	};

	const classNames = `${styles.button}`;

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
