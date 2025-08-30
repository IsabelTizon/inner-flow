// GLOBAL COMPONENTS
import imgBlockMenu from "../../assets/menu.jpg";
import TextBlock from "../../../../components/globals/textBlock/textBlock";
import Btn from "../../../../components/globals/Buttons/Btn";

export default function Menu() {
	return (
		<>
			<TextBlock
				title="Create your healthy daily Menu"
				text="Nourish your body with our personalized daily menu planner. Create balanced, nutritious meals tailored to your dietary preferences and health goals. Our intelligent menu system helps you plan wholesome breakfasts, lunches, and dinners that support your wellness journey. Discover new recipes, track your nutrition, and maintain a healthy relationship with food through mindful meal planning."
				backgroundImage={imgBlockMenu}
				titleStyle={{
					color: "#A34227F2",
				}}
			>
				<Btn
					text="Go to menu"
					variant="primary"
					to="/dailyMenu"
				/>
			</TextBlock>
		</>
	);
}
