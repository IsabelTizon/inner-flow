// REACT ROUTER: Navigate
import { useNavigate } from "react-router-dom";

// STYLES
import styles from "./mealCard.module.css";

export default function MealCard({ meal }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/dailyMenu/${meal.id}`);
	};

	return (
		<div
			className={styles.mealCard}
			onClick={handleClick}
			style={{ cursor: "pointer" }}
		>
			<img
				src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
				alt={meal.title}
				onError={(e) => {
					e.target.src =
						"https://via.placeholder.com/312x231?text=No+Image";
				}}
			/>
			<h4>{meal.title}</h4>
			<p>Ready in {meal.readyInMinutes} minutes</p>
			<p>Servings: {meal.servings}</p>
		</div>
	);
}
