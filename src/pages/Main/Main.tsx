import React from 'react';
import Post from './Post/Post';
import '../../App.css';
import Preloader from '../../common/Preloader/Preloader';
import PostFormRedux from './MainForm/MainForm';
import { AddMessageBodyType } from './MainForm/MainForm';
import { MessagesType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../selectors/selectors';
import { actions } from '../../redux/main-reducer';


const Main: React.FC = () => {
	const posts = useSelector(getPosts);
	const dispatch = useDispatch();
	let postsElem = posts.map(post => <Post key={post.id} message={post.message} />);


	let addNewPost = (values: AddMessageBodyType) => {
		dispatch(actions.addPost(values.newMessageBody));
	}
	return (
		<div className="main-container">
			<div>
				<PostFormRedux onSubmit={addNewPost} />
			</div>
			<div className="posts">
				{postsElem}
			</div>
		</div>
	);
}


export default Main;