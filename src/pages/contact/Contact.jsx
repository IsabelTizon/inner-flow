import Hero from "./components/Hero";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import styles from "./Contact.module.css";

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
