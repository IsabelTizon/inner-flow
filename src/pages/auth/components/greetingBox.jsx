import styles from "../auth.module.css";
export default function SGVBox({
	logo,
	className,
	title,
	greetingImg,
	children,
}) {
	return (
		<section className={className}>
			<div>
				{logo && (
					<img
						src={logo}
						alt="Logo"
						width={120}
						height={120}
						className={styles.logoAuth}
					/>
				)}
				<h2 className={styles.greetingTitle}>{title}</h2>
				<div>
					<img
						src={greetingImg}
						alt="greetingImg"
						width={120}
						height={120}
						className={styles.greetingImg}
					/>
				</div>
			</div>
			<div>{children}</div>
		</section>
	);
}
