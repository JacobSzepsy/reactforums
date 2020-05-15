import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Header extends Component{
	Login = (props) => {
		if(props.isLoggedIn){
			return(
				<React.Fragment>
					<a className="navbar-brand" href="index.html">Welcome {props.username}!</a>
					<button onClick={this.props.logout} className="btn btn-primary">Logout</button>
				</React.Fragment>
			); 
		}else{
			return(
				<button className="btn btn-primary">Login</button>
			);
		}
	}

	render() {
		return(
			<React.Fragment>
				<nav className="navbar navbar-dark bg-dark">
					<a className="navbar-brand" href="index.html">Home</a>
					<ul className="navbar-nav">
						<li className="nav-item">
							<this.Login isLoggedIn={this.props.userState.isLoggedIn} username={this.props.userState.username}/>
						</li>
					</ul>
				</nav>
			</React.Fragment>
		);
	}
	
}

Header.propTypes = {
	userState: PropTypes.object.isRequired
}

export default Header;