import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends Component{
	state = {
		username: '',
		password: ''
	}

	changeHandler = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]: value});
	}

	submitHandler = (e) => {
		e.preventDefault();
		this.props.Register(this.state);
		//todo: have this redirect back to previous page but make sure you are not going back to login page
		this.props.history.push('/');
	}

	componentDidMount() {
		window.addEventListener('load', this.checkLogin);
	}

	componentWillUnmount() { 
		window.removeEventListener('load', this.checkLogin)  
	}

	checkLogin = () => {
		if(this.props.userState.isLoggedIn) this.props.history.push('/');
	}

	render(){
		return (
			<div className="card my-4" style={style}>
				<div className="card-body">
					<form onSubmit={this.submitHandler}>
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" placeholder="enter username" name="username" onChange={this.changeHandler} required />
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" placeholder="enter password" name="password" onChange={this.changeHandler} required />
						<br/>
						<button className="btn btn-dark">Sign In</button>
						<br/><br/>
						<Link className='linkBlack' to="/login">Already have an account?</Link>
					</form>
				</div>
			</div>	
		);
	}
}

const style = {
	'marginLeft': '25%',
	'marginRight': '25%'
}

export default withRouter(Register);