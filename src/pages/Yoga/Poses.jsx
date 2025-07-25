import PoseCard from "./components/PoseCard";
import { useEffect, useState } from "react";

export default function Poses() {
	const [poses, setPoses] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/poses")
			.then((res) => res.json())
			.then((data) => setPoses(data))
			.catch((err) =>
				console.error("Error fetching poses:", err)
			);
	}, []);

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
