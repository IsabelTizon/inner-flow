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
					simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an
					unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has
					survived not only five centuries, but also the
					leap into electronic typesetting, remaining
					essentially
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
					to="communitySequences"
				/>
			</div>
		</section>
	);
}
