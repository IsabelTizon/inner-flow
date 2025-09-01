// REACT HOOKS
import { useEffect, useState } from "react";

// REACT ROUTER BY ID
import { useParams } from "react-router-dom";

// STYLES
import styles from "./recipeMeal.module.css";

// GLOBAL COMPONETS
import Btn from "../../components/globals/Buttons/Btn";

export default function RecipeMeal() {
	const { name } = useParams();
	const [details, setDetails] = useState({});
	const [activeTab, setActiveTab] = useState("Recipe");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchDetails = async () => {
			if (!name) return;

			setLoading(true);
			setError("");
			try {
				const res = await fetch(
					`https://api.spoonacular.com/recipes/${name}/information?apiKey=${
						import.meta.env.VITE_SPOONACULAR_API_KEY
					}`
				);
				if (!res.ok) {
					throw new Error("Failed to fetch recipe details");
				}
				const detailData = await res.json();
				setDetails(detailData);
			} catch (err) {
				setError("Error loading recipe details");
				console.error("Error fetching recipe:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchDetails();
	}, [name]); //Call the fetchDetails function every time name changes.

	if (loading) {
		return (
			<div className={styles.detailWrapper}>
				<p>Loading recipe details...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.detailWrapper}>
				<p className={styles.error}>{error}</p>
			</div>
		);
	}

	return (
		<div className={styles.detailWrapper}>
			<h2 className={styles.title}>{details.title}</h2>
			<div className={styles.box}>
				<section className={styles.section}>
					{/* Recipe Image */}
					<img
						src={details.image}
						alt="imageRecipe"
						className={styles.image}
					/>

					<p
						className={styles.description}
						dangerouslySetInnerHTML={{
							__html: details.summary,
						}}
					></p>
				</section>

				<section className={styles.section}>
					<div className={styles.btns}>
						<Btn
							text="Recipe"
							variant={
								activeTab === "Recipe"
									? "primary"
									: "tertiary"
							}
							onClick={() => setActiveTab("Recipe")}
						/>
						<Btn
							text="Ingredients"
							variant={
								activeTab === "Ingredients"
									? "primary"
									: "tertiary"
							}
							onClick={() => setActiveTab("Ingredients")}
						/>
					</div>

					{/* Recipe Preparation tab */}
					{activeTab === "Recipe" && (
						<div>
							<div>
								<h5 className={styles.instructionsTitle}>
									Preparation
								</h5>
								<div
									className={styles.recipe}
									dangerouslySetInnerHTML={{
										__html: details.instructions,
									}}
								></div>
							</div>
						</div>
					)}

					{/* Ingredients tab */}
					{activeTab === "Ingredients" && (
						<ul>
							{details.extendedIngredients?.map(
								(ingredient) => (
									<li
										key={ingredient.id}
										className={styles.ingredients}
									>
										{ingredient.original}
									</li>
								)
							)}
						</ul>
					)}
				</section>
			</div>
		</div>
	);
}
