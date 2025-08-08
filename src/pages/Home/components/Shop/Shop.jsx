import { Link } from "react-router-dom";
import ImageTextBlock from "../../../../components/globals/ImageTextBlock/ImageTextBlock";
import shopHome from "../../assets/shopHome.jpg";
import Btn from "../../../../components/globals/Buttons/Btn";

export default function Shop() {
	return (
		<>
			<ImageTextBlock
				title="Our Shop"
				image={shopHome}
				titleText="Dicover our shop and our retirements"
				text="s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with "
			>
				<Link to="/shop">
					<Btn text="Go to our Shop" variant="secondary" />
				</Link>
			</ImageTextBlock>
		</>
	);
}
