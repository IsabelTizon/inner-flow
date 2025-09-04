// COMPONENTS
import Hero from "./components/Hero";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";

// STYLES
import styles from "./contact.module.css";

export default function Contact() {
	return (
		<div className={styles.container}>
			<Hero />
			<div className={styles.content}>
				<ContactInfo />
				<ContactForm />
			</div>
		</div>
	);
}
