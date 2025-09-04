// GLOBAL COMPONENTS
import TextBlock from "../../../../components/globals/TextBlock/TextBlock";
import ClickCard from "../../../../components/globals/ClickCard/ClickCard";

// STYLES
import styles from "./Yoga.module.css";

// ASSETS
import yogaPoses from "../../../../assets/yogaPoses.jpg";
import createSequences from "../../../../assets/createSequences.png";
import mySequences from "../../../../assets/mySequences.jpg";

export default function Yoga() {
	return (
		<section className={styles.section}>
			<TextBlock
				title="Yoga"
				text="Discover the transformative power of yoga with our
					comprehensive platform. Explore hundreds of poses
					with detailed instructions, create personalized
					sequences that match your practice level, and
					connect with our community to share and discover
					inspiring sequences from fellow practitioners."
				backgroundColor="#e1cdb2"
				titleStyle={{
					color: "#A34227F2",
				}}
			></TextBlock>
			<div className={styles.cardsContainer}>
				<ClickCard
					title="Poses"
					image={yogaPoses}
					to="poses"
				/>
				<ClickCard
					title="My Sequences"
					image={createSequences}
					to="sequences"
				/>
				<ClickCard
					title="Community Sequences"
					image={mySequences}
					to="community"
				/>
			</div>
		</section>
	);
}
