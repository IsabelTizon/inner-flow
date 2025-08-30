// LINK ROUTER
import { Link } from "react-router-dom";
//STYLES
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
	}; // if there is a bgColor or textColor, add it to the style object

	const classNames = variant ? buttonsStyles[variant] : ""; // buttonsStyles access to the btn.module.css. [variant] is the key to access the specific button style (.primary, .secondary, .tertiary)

	// 2 kind of returns
	//If it receives the prop to it returns a <Link> (to navigate between pages with React Router).
	//If it does not receive to it returns a <button> (to execute an action with onClick).

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
			style={style}
			onClick={onClick}
			type={type || "button"} // type: "submit", "reset"
		>
			{text}
		</button>
	);
}
