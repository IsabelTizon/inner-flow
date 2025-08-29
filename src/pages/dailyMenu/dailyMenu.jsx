import { useState } from "react";
import styles from "./dailyMenu.module.css";
import MealCard from "./components/MealCard";
import Btn from "../../components/globals/Buttons/Btn";

export default function DailyMenu() {
	const [mealData, setMealData] = useState(null);
	const [calories, setCalories] = useState(2000);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getMealData = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch(
				`https://api.spoonacular.com/mealplanner/generate?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY
				}&timeFrame=day&targetCalories=${calories}`
			);
			if (!response.ok) {
				throw new Error("Error fetching meal data");
			}
			const data = await response.json();
			setMealData(data);
		} catch {
			setError("Error al obtener el plan de comidas");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		getMealData();
	};

	return (
		<div className={styles.container}>
			<div className={styles.hero}>
				<div className={styles.content}>
					<h1 className={styles.title}>
						Get Daily Meal Plan
					</h1>
					<h4 className={styles.subtitle}>
						Choose your daily plan based on the calories you
						want to consume
					</h4>

					<form
						className={styles.form}
						onSubmit={handleSubmit}
					>
						<input
							className={styles.input}
							type="number"
							value={calories}
							onChange={(e) => setCalories(e.target.value)}
							placeholder="Calories e.g. 2000"
							min="1200"
							max="4000"
						/>
						<Btn
							text="Get"
							variant="secondary"
							type="submit"
							// disabled={loading}
						>
							{loading ? "Loading..." : "Get Meal Plan"}
						</Btn>
					</form>

					{error && <p className={styles.error}>{error}</p>}
				</div>
			</div>

			{mealData?.meals && (
				<div className={styles.mealResults}>
					<h3>
						Your Daily Meal Plan ({calories} calories)
					</h3>
					<div className={styles.meals}>
						{mealData.meals.map((meal) => (
							<MealCard key={meal.id} meal={meal} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
