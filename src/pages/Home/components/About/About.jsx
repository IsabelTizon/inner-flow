import ImageTextBlock from "../../../../components/globals/ImageTextBlock/ImageTextBlock";
import about from "../../assets/about.jpg";

export default function About() {
	return (
		<>
			<ImageTextBlock
				title="About Inner Flow"
				image={about}
				titleText="Things that we do"
				reverse={true}
				text="Inner Flow is your complete wellness companion, designed to help you create a balanced and healthy lifestyle. Our platform combines nutrition and mindfulness to support your journey towards better well-being. Plan your daily nutrition with our personalized healthy menu creator, explore a comprehensive library of yoga poses, build and customize your own yoga sequences, and connect with our vibrant community to discover and share sequences created by fellow practitioners. Whether you're a beginner starting your wellness journey or an experienced practitioner looking to deepen your practice, Inner Flow provides the tools and community support you need to flourish."
			/>
		</>
	);
}
