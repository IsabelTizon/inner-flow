export default function SGVBox({ image, children }) {
	return (
		<section className="sgv-box">
			<div>
				<img src={image} alt="logo" />
			</div>
			<div>{children}</div>
		</section>
	);
}
