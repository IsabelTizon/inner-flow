import styles from "../auth.module.css";
export default function SGVBox({
	logo,
	title,
	svg,
	children,
}) {
	return (
		<section className="svg-box">
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
				<h2 className={styles.svgTitleAuth}>{title}</h2>
				<div className={styles.svgAuth}>{svg && svg()}</div>
			</div>
			<div>{children}</div>
		</section>
	);
}
