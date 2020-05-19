import React, { Component } from 'react';
import Post from './Post.js';
import NewPost from './NewPost.js';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';

class PostList extends Component{
	state = {
		posts: []
	}

	//TODO: have this code in a seperate method and then have a flag so page doesn't render before content is loaded
	componentDidMount = () => {
		const rqst = {
			method: 'get',
		};
		fetch(`/api/posts/${this.props.match.params.threadID}`, rqst)
		.then(response => response.json())
		.then(json => {
			if(json.status === "GOOD"){
				this.setState({ posts: json.data});
			}else{
				alert(`ERROR: ${json.message}`);
			}
		})
	}

	newPost = ( contents ) => {
		if(Cookies.get('jwt-token') !== undefined){
			const rqst = {
				method: 'post',
				body: JSON.stringify({
					'thread': this.props.match.params.threadID,
					'body': contents,
					'token': Cookies.get('jwt-token')
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			};
			fetch(`/api/posts/`, rqst)
			.then(response => response.json())
			.then(json => {
				if(json.status === "GOOD"){
					this.setState({ posts: [...this.state.posts, json.data] })
				}else{
					alert(`ERROR: ${json.message}`);
				}
			})
		}
	}
	render(){
		return(
			<div className="container mt-4 mb-4 mw-100">
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