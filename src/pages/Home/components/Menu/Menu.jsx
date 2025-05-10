import imgBlockMenu from "../../assets/menu.jpg";
import { Link } from "react-router-dom";
import TextBlock from "../../../../components/globals/textBlock/textBlock";

export default function Menu() {
	return (
		<>
			<TextBlock
				title="Create your healthy daily Menu"
				text="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining esse"
				backgroundImage={imgBlockMenu}
				titleStyle={{
					color: "#A34227F2",
					fontSize: "2rem",
				}}
			>
				<Link to="/menu">
					<button>Go to Menu</button>
				</Link>
			</TextBlock>
		</>
	);
}
