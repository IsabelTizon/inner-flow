import ImageTextBlock from "../../../../components/globals/ImageTextBlock/ImageTextBlock";
import shopHome from "./assets/shopHome.jpg";

export default function Shop() {
	return (
		<>
			<ImageTextBlock
				title="Our Shop"
				image={shopHome}
				titleText="Joing our Retirements"
				text="s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with "
			/>
		</>
	);
}
