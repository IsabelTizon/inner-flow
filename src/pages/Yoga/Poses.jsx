import PoseCard from "./components/PoseCard";
import catPose from "./assets/cat-pose.jpg";

export default function Poses() {
	const poses = [
		{
			id: 1,
			name: "Downward Dog",
			image: catPose,
			description: "Stretches legs and spine.",
		},
		{
			id: 2,
			name: "Tree Pose",
			image: catPose,
			description: "Improves balance and focus.",
		},
	];

	return (
		<div
			style={{
				display: "grid",
				gap: "20px",
				padding: "20px",
			}}
		>
			{poses.map((pose) => (
				<PoseCard key={pose.id} {...pose} />
			))}
		</div>
	);
}
