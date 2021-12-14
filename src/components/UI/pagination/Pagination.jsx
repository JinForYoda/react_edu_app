import React from 'react'
import usePagination from '../../../hooks/usePagination'


export default function Pagination({ totalPages, page, changePage }) {
	const pagesArray = usePagination(totalPages)
	return (
		<div className="page__wrapper">
			{pagesArray.map(p =>
				<span onClick={() => changePage(p)} key={p} className={page === p ? "page current" : 'page'}>{p}</span>
			)}
		</div>
	)
}
