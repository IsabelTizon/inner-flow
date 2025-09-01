// REACT HOOKS
import { useState } from "react";

// STYLES
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
			const res = await fetch(
				"http://localhost:3001/contact",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...formData,
						to: "tizonarranz@gmail.com",
					}),
				}
			);
			if (res.ok) {
				setSubmitMessage("Message sent successfully!");
				setFormData({
					name: "",
					surname: "",
					email: "",
					message: "",
				});
			} else {
				throw new Error("Failed to send message");
			}
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
				{/* First Name and Last Name Group */}
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
				{/* Email */}
				<input
					className={styles.input}
					type="email"
					name="email"
					placeholder="Email Address"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				{/* Textarea*/}
				<textarea
					className={styles.textarea}
					name="message"
					placeholder="Your message..."
					rows="5"
					value={formData.message}
					onChange={handleChange}
					required
				></textarea>
				{/* Submit Button */}
				<button
					className={styles.submitButton}
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Send Message"}
				</button>
				{/* Feedback Message */}
				{submitMessage && (
					<p className={styles.message}>{submitMessage}</p>
				)}
			</form>
		</div>
	);
}
