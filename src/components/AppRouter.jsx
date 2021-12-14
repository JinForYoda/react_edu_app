import React, { useContext } from 'react'
import {

	Routes,
	Route,
	Navigate,

} from "react-router-dom";
import { AuthContext } from '../context/context';

import { privateRoutes, publicRoutes } from '../router/routes';
import Loader from './UI/loader/loader';

export default function AppRouter() {
	const { isAuth, setIsAuth, isLoading } = useContext(AuthContext)
	if (isLoading) {
		return <Loader />
	}
	return (
		isAuth
			? < Routes >
				{
					privateRoutes.map((route) =>
						<Route element={<route.component />} path={route.path} exact={route.exact} />

					)
				}

				<Route path='*' element={<Navigate replace to="/posts" />} />
			</Routes >
			: < Routes >

				{
					publicRoutes.map((route) =>
						<Route element={<route.component />} path={route.path} exact={route.exact} />

					)
				}
				<Route path='*' element={<Navigate replace to="/login" />} />
			</Routes >


	)
}
