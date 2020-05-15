import React, { Component } from 'react';

class NewPost extends Component{
	
	changeHandler = (e) => this.setState({ body: e.target.value });
	
	submitHandler = (e) => {
		e.preventDefault();
		this.props.NewPost(this.state.body);
		this.setState({ body: ''})
	}
	state = {
		body: ''
	}

	render(){
		if(this.props.userState.isLoggedIn){
			return (
				<React.Fragment>
					<form onSubmit={this.submitHandler}>
						<textarea className='form-control' rows='10' cols='50' id='body' value={this.state.body} onChange={this.changeHandler} required /> <br/>
						<button type="submit" className="btn btn-dark">Post</button>
					</form>
				</React.Fragment>
			);
		}
		return(null);
	}
}

export default NewPost;