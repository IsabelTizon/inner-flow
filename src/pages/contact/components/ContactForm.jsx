import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Aquí irían las llamadas a tu API
			// await sendContactForm(formData);
			setSubmitMessage("Message sent successfully!");
			setFormData({
				name: "",
				surname: "",
				email: "",
				message: "",
			});
		} catch {
			setSubmitMessage(
				"Error sending message. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.formSection}>
			<h2 className={styles.title}>Send us a Message</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.nameGroup}>
					<input
						className={styles.input}
						type="text"
						name="name"
						placeholder="First Name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<input
						className={styles.input}
						type="text"
						name="surname"
						placeholder="Last Name"
						value={formData.surname}
						onChange={handleChange}
						required
					/>
				</div>
				<input
					className={styles.input}
					type="email"
					name="email"
					placeholder="Email Address"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<textarea
					className={styles.textarea}
					name="message"
					placeholder="Your message..."
					rows="5"
					value={formData.message}
					onChange={handleChange}
					required
				></textarea>
				<button
					className={styles.submitButton}
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Send Message"}
				</button>
				{submitMessage && (
					<p className={styles.message}>{submitMessage}</p>
				)}
			</form>
		</div>
	);
}
