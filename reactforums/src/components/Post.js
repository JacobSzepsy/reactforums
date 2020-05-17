import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component{
	render(){
		return(
			<table className='table table-bordered'>
				<thead className='thead-dark'>
					<tr>
						<th scope='col' colSpan='3'>{this.props.contents.date}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colSpan='3'>{this.props.contents.user}</td>
					</tr>
					<tr>
						<td colSpan='3' style={{ 'whiteSpace': 'pre-wrap' }}>{this.props.contents.body}</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

Post.propTypes = {
	contents: PropTypes.object.isRequired
}

export default Post;