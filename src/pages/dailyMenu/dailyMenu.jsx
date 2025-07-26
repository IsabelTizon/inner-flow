import { useState } from "react"; // React's useState hook for managing component state
import styles from "./dailyMenu.module.css";

export default function DailyMenu() {
	const [mealData, setMealData] = useState(null); // State to store meal data from API response
	const [calories, setCalories] = useState(2000); // State to store user's desired calorie input (default 2000)
	const [loading, setLoading] = useState(false); // State to track loading status during API call
	const [error, setError] = useState(""); // State to store error messages if API call fails

	// Async function to fetch meal data from Spoonacular API
	const getMealData = async () => {
		setLoading(true); // Set loading to true when starting API call
		setError(""); // Clear any previous error messages
		try {
			// Make API call to Spoonacular with user's calorie preference
			const response = await fetch(
				`https://api.spoonacular.com/mealplanner/generate?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY // Environment variable for API key
				}&timeFrame=day&targetCalories=${calories}`
			);
			// Check if the response was successful
			if (!response.ok) {
				throw new Error("Error fetching meal data");
			}
			// Convert response to JSON format
			const data = await response.json();
			// Update state with received meal data
			setMealData(data);
		} catch {
			// Set error message if API call fails
			setError("Error al obtener el plan de comidas");
		} finally {
			// Always set loading to false when API call completes (success or fail)
			setLoading(false);
		}
	};

	// Handle form submission when user clicks "Get Meal Plan"
	const handleSubmit = (e) => {
		// Prevent default form submission behavior
		e.preventDefault();
		// Call function to fetch meal data
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
							// Update calories state when user types
							onChange={(e) => setCalories(e.target.value)}
							placeholder="Calories e.g. 2000"
							min="1200"
							max="4000"
						/>
						<button
							className={styles.button}
							type="submit"
							disabled={loading} // Disable during API call
						>
							{loading ? "Loading..." : "Get Meal Plan"}
						</button>
					</form>

					{error && <p className={styles.error}>{error}</p>}
				</div>
			</div>

			{/* Conditional rendering: only show meals if data exists and has meals array */}
			{mealData && mealData.meals && (
				<div className={styles.mealResults}>
					<h3>
						Your Daily Meal Plan ({calories} calories)
					</h3>
					<div className={styles.meals}>
						{/* Map through each meal and create a card */}
						{mealData.meals.map((meal, index) => (
							<div key={index} className={styles.mealCard}>
								{/* Meal image with fallback if image fails to load */}
								<img
									src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
									alt={meal.title}
									onError={(e) => {
										e.target.src =
											"https://via.placeholder.com/312x231?text=No+Image";
									}}
								/>
								<h4>{meal.title}</h4>
								<p>
									Ready in {meal.readyInMinutes} minutes
								</p>
								<p>Servings: {meal.servings}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
