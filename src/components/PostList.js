import React, { Component } from 'react';
import Post from './Post.js';
import NewPost from './NewPost.js';
import PropTypes from 'prop-types';

class PostList extends Component{
	render(){
		/* return this.props.posts.map((post) => (
			<div className="container mt-4 mb-4 mw-100">
				<Post key={post.id} contents={post} />
			</div>
		)); */
		return(
			<div className="container mt-4 mb-4 mw-100">
				{this.props.posts.map((post) =>
						<Post key={post.id} contents={post} />
				)}
				<NewPost NewPost={this.props.NewPost} userState={this.props.userState} onSubmit={this.props.onSubmit}/>
			</div>
		);
	}
}

PostList.propTypes = {
	posts: PropTypes.array.isRequired
}

export default PostList;