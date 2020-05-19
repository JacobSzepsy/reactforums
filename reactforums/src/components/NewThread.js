import React, { Component } from 'react';

class NewThread extends Component{
	state = {
			board: this.props.boardName,
			title: '',
			body: ''
	}
	
	changeTitle = (e) => this.setState({...this.state, title: e.target.value});
	
	changeBody = (e) => this.setState({...this.state, body: e.target.value});
	
	submitHandler = (e) => {
		e.preventDefault();
		alert(this.state.board);
		//this.props.newThread(this.state);
		this.setState({ title: '', body: ''});
	}

	render(){
		if(this.props.userState.isLoggedIn){
			return (
				<React.Fragment>
					<div className="modal fade" id={`${this.props.boardName}modal`} >
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">New Thread</h5>
								</div>
								<div className="modal-body">
									<form id={`${this.props.boardName}PostForm`} onSubmit={this.submitHandler}>
										<label htmlFor="title">Subject</label>
										<input className='form-control' id='title' value={this.state.title} onChange={this.changeTitle} required /> <br/>
										<label htmlFor="body">Post</label>
										<textarea className='form-control' rows='10' cols='50' id='body' value={this.state.body} onChange={this.changeBody} required />
									</form>
								</div>
								<div className="modal-footer">
									<button type="submit" form={`${this.props.boardName}PostForm`} className="btn btn-dark">Post</button>
								</div>
							</div>
						</div>
						
					</div>
					<button className="btn btn-dark" data-toggle="modal" data-target={`#${this.props.boardName}modal`}>New Thread</button>
				</React.Fragment>	
			);
		}
		return(null);
	}
}

export default NewThread;