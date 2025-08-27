import contact from "../../assets/contact.jpg";
import { Link } from "react-router-dom";
import TextBlock from "../../../../components/globals/textBlock/textBlock";
import Btn from "../../../../components/globals/Buttons/Btn";

export default function Contact() {
	return (
		<>
			<TextBlock
				title="Contact us"
				text="Have questions about your wellness journey or need support with Inner Flow? We're here to help! Whether you're looking for guidance on creating the perfect yoga sequence, need assistance with meal planning, or want to share feedback about our platform, our friendly team is ready to assist you. Reach out to us and let's connect on your path to better health and mindfulness."
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
