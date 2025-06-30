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
					/>
				)}
				<h2>{title}</h2>
				{svg && svg()}
			</div>
			<div>{children}</div>
		</section>
	);
}
