import React, { useState, useEffect, useRef } from "react"
import PostFilter from "../components/PostFilter";

import Postform from "../components/Postform";
import Postlist from "../components/Postlist";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
// import './styles/App.css'

import PostService from "../API/PostService";
import Loader from "../components/UI/loader/loader";
import useFetching from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import useObserver from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {

	const [posts, setPosts] = useState([])

	const [filter, setFilter] = useState({ sort: '', query: '' })

	const [modal, setModal] = useState(false)

	const [totalPages, setTotalPages] = useState(0)

	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)






	const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page)

		setPosts([...posts, ...response.data])
		const totalCount = response.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit))

	})
	const lastElement = useRef()



	useObserver(lastElement, page < totalPages, isPostsLoading, () => { setPage(page + 1) })

	useEffect(() => {
		fetchPosts()

	}, [page, limit])

	function createPost(newPost) {
		setPosts([...posts, newPost])
		setModal(false)
	}


	function removePost(post) {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	function changePage(page) {
		setPage(page)

	}



	return (
		<div className="App">
			<button onClick={fetchPosts}>GET POSTs</button>
			<MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
				Добавить пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<Postform create={createPost} />
			</MyModal>

			<hr style={{ margin: '15px 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='Кол-во элементов на странице'
				options={[
					{ value: 5, name: '5' }, { value: 10, name: '10' }, { value: 25, name: '25' }, { value: -1, name: 'Показать все' }
				]}
			/>


			{postsError &&
				<h1>Призошла ошибка: {postsError}</h1>}
			<Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
			<div ref={lastElement} style={{ height: 20, backgroundColor: "red" }}></div>
			{isPostsLoading &&
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>}




			<Pagination totalPages={totalPages} page={page} changePage={changePage} />


		</div>
	);
}


export default Posts;
