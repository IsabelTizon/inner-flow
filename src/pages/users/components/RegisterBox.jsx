import Btn from "../../../components/globals/Buttons/Btn";

export default function RegisterBox() {
	return (
		<div>
			<div>
				<Btn />
			</div>
			<form>
				<label>Full Name</label>
				<input
					type="text"
					placeholder="Enter your full name"
				/>
				<label>Password</label>
				<input
					type="password"
					placeholder="Enter your password"
				/>
				<label>E-mail</label>
				<input
					type="email"
					placeholder="Enter your e-mail address"
				/>
				<div className="terms">
					<input type="checkbox" />
					<span>
						By signing up you agree{" "}
						<a href="#">Terms & Conditions</a>
					</span>
				</div>
				<div>
					<Btn />
				</div>
			</form>
		</div>
	);
}
