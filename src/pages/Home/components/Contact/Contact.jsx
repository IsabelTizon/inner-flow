import contact from "../../assets/contact.jpg";
import { Link } from "react-router-dom";
import TextBlock from "../../../../components/globals/textBlock/textBlock";
import Btn from "../../../../components/globals/Buttons/Btn";

export default function Contact() {
	return (
		<>
			<TextBlock
				title="Coctact us"
				text="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining esse"
				backgroundImage={contact}
				titleStyle={{
					color: "#A34227F2",
					fontSize: "2rem",
				}}
			>
				<Link to="/contact">
					<Btn text="Go to Contact" variant="primary" />
				</Link>
			</TextBlock>
		</>
	);
}
