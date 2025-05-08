import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Yoga from "./components/Yoga/Yoga";
import Menu from "./components/Menu/Menu";
import Shop from "./components/Shop/Shop";
import Contact from "./components/Contact/Contact";

export default function Home() {
	return (
		<>
			<Hero />
			<About />
			<Yoga />
			<Menu />
			<Shop />
			<Contact />
		</>
	);
}
