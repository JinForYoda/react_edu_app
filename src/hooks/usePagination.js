import React, { useMemo } from 'react'

export default function usePagination(totalPages) {
	return useMemo(() => {
		let arr = []
		for (let i = 0; i < totalPages; i++) {
			arr.push(i + 1)
		} return arr
	}, [totalPages])
}
