import React, { Component } from 'react';
import Post from './Post.js';
import NewPost from './NewPost.js';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class PostList extends Component{
	state = {
		ThreadId: this.props.match.params.threadID,
		posts: [
			{
				id: 1,
				user: 'steve',
				body: 'this is a post',
				date: 'today'
			},
			{
				id: 2,
				user: 'steve',
				body: 'this is a post',
				date: 'today'
			},
			{
				id: 3,
				user: 'steve',
				body: 'this is a post',
				date: 'today'
			}
		]
	}

	newPost = ( contents ) => {
		const date = new Date();
		const post = {
			id: (this.state.posts.length + 1),
			user: this.props.userState.username,
			body: contents,
			date: date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
		}
		this.setState({ posts: [...this.state.posts, post] });
	}
	render(){
		return(
			<div className="container mt-4 mb-4 mw-100">
				<h1>{this.state.ThreadId}</h1>
				{this.state.posts.map((post) =>
						<Post key={post.id} contents={post} />
				)}
				<NewPost NewPost={this.newPost} userState={this.props.userState} onSubmit={this.props.onSubmit}/>
			</div>
		);
	}
}

PostList.propTypes = {
	userState: PropTypes.object.isRequired
}

export default withRouter(PostList);