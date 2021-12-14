import React, { useContext } from 'react'
import {

	Link,
} from "react-router-dom";
import { AuthContext } from '../../../context/context';
import MyButton from '../button/MyButton';

export default function Navbar() {
	const { isAuth, setIsAuth } = useContext(AuthContext)
	function logout(event) {
		setIsAuth(false);
		localStorage.removeItem("auth")
	}
	return (
		<div className='navbar'>
			<MyButton style={{ color: "#E2CE9B" }} onClick={logout}>Выйти</MyButton>
			<div className="navbar__links">
				<Link to="/about">О сайте</Link>
				<Link to="/posts">Посты</Link>
			</div>
		</div>
	)
}