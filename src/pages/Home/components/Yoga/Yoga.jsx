import styles from "./Yoga.module.css";
import ClickCard from "../../../../components/globals/ClickCard/ClickCard";
import yogaPoses from "../../../../assets/yogaPoses.jpg";
import createSequences from "../../../../assets/createSequences.png";
import mySequences from "../../../../assets/mySequences.jpg";

export default function Yoga() {
	return (
		<section className={styles.section}>
			<div className={styles.titleContainer}>
				<h2 className={styles.title}>Yoga</h2>
			</div>
			<div className={styles.textContainer}>
				<p className={styles.text}>
					Discover the transformative power of yoga with our
					comprehensive platform. Explore hundreds of poses
					with detailed instructions, create personalized
					sequences that match your practice level, and
					connect with our community to share and discover
					inspiring sequences from fellow practitioners.
				</p>
			</div>
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
