// Router
import { Link, useNavigate } from "react-router-dom";
// Styles
import styles from "./Navbar.module.css";
import Btn from "../globals/Buttons/Btn";
// Assets
import logo from "../../assets/logo.png";
// hooks
import useToggle from "../../hooks/useToggle";
import useDropdownManager from "../../hooks/useDropdownManager";
import { useAuth } from "../../context/useAuth";
// Icons
import { FaUser } from "react-icons/fa";

export default function Navbar() {
	const [isOpen, toggle] = useToggle();
	const {
		toggleDropdown,
		closeAllDropdowns,
		isDropdownOpen,
	} = useDropdownManager();
	const navigate = useNavigate();
	const DROPDOWN_IDS = {
		YOGA: "yoga",
		USER: "user",
	};
	const { isLoggedIn, isAdmin, user, logout, loading } =
		useAuth();

	if (loading) {
		return <nav className={styles.navbar}>Loading...</nav>;
	}

	return (
		<nav className={styles.navbar}>
			<div>
				{/* Logo */}
				<Link to="/">
					<img
						className={styles.logo}
						src={logo}
						alt="logo icon"
					/>
				</Link>
			</div>
			<button className={styles.burger} onClick={toggle}>
				☰
			</button>
			<ul
				className={`${styles.navItems} ${
					isOpen ? styles.showMenu : ""
				}`}
			>
				<li
					className={styles.navItemWithDropdown}
					data-dropdown
				>
					<span
						className={styles.navLink}
						onClick={() =>
							toggleDropdown(DROPDOWN_IDS.YOGA)
						}
					>
						Yoga ▾
					</span>
					{isDropdownOpen(DROPDOWN_IDS.YOGA) && (
						<div className={styles.dropdownMenu}>
							<Link
								to="/poses"
								onClick={() => {
									closeAllDropdowns();
									setTimeout(() => {
										toggle();
									}, 100);
								}}
							>
								Poses
							</Link>
							<Link
								to="/sequences"
								onClick={() => {
									closeAllDropdowns();
									setTimeout(() => {
										toggle();
									}, 100);
								}}
							>
								Sequences
							</Link>
							<Link
								to="/community"
								onClick={() => {
									closeAllDropdowns();
									setTimeout(() => {
										toggle();
									}, 100);
								}}
							>
								Community Sequences
							</Link>
						</div>
					)}
				</li>
				<li className={styles.navItem}>
					<Link
						className={styles.navLink}
						to="/dailyMenu"
						onClick={() => {
							if (window.innerWidth <= 768) toggle();
						}}
					>
						Daily Menu
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link
						className={styles.navLink}
						to="/contact"
						onClick={() => {
							if (window.innerWidth <= 768) toggle();
						}}
					>
						Contact
					</Link>
				</li>
				<li
					className={styles.navItemWithDropdown}
					data-dropdown
				>
					<span
						className={styles.navLink}
						onClick={() =>
							toggleDropdown(DROPDOWN_IDS.USER)
						}
						role="button"
						aria-expanded={isDropdownOpen(
							DROPDOWN_IDS.USER
						)}
					>
						<FaUser />
					</span>

					{isDropdownOpen(DROPDOWN_IDS.USER) && (
						<div className={styles.dropdownMenu}>
							{!isLoggedIn ? (
								<>
									<Link
										to="/login"
										onClick={() => {
											closeAllDropdowns();
											setTimeout(() => {
												toggle();
											}, 100);
										}}
									>
										Login
									</Link>
									<Link
										to="/register"
										onClick={() => {
											closeAllDropdowns();
											setTimeout(() => {
												toggle();
											}, 100);
										}}
									>
										Register
									</Link>
								</>
							) : (
								<>
									<span className={styles.welcomeUser}>
										{user?.name
											? `Welcome, ${user.name}!`
											: "Welcome, User!"}
									</span>

									<Btn
										text="Logout"
										variant="tertiary"
										onClick={() => {
											logout();
											closeAllDropdowns();
											navigate("/");
										}}
									></Btn>
								</>
							)}
						</div>
					)}
				</li>
				{isLoggedIn && isAdmin && (
					<li className={styles.navItem}>
						<Link
							className={styles.navLink}
							to="/admin"
							onClick={() => {
								if (window.innerWidth <= 768) toggle();
							}}
						>
							Admin
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}
