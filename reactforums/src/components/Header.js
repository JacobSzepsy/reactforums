import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Link, withRouter } from 'react-router-dom';

class Header extends Component{
	
	redirect = (history) => {
		this.history.push("/");
	}
	Login = (props) => {
		console.log(props.history.location.pathname);
		if(props.history.location.pathname !== '/login' && props.history.location.pathname !== '/register'){
			if(props.isLoggedIn){
				return(
					<React.Fragment>
						<a className="navbar-brand" href="index.html">Welcome {props.username}!</a>
						<button onClick={this.props.logout} className="btn btn-primary">Logout</button>
					</React.Fragment>
				); 
			}else{
				return(
					<Link to="/login"><button className="btn btn-primary">Login</button></Link>
				);
			}
		}
		return(null);
	}

	render() {
		return(
			<React.Fragment>
				<nav className="navbar navbar-dark bg-dark">
					<Link to='/'>
						<span className="navbar-brand">Home</span>
					</Link>
					<ul className="navbar-nav">
						<li className="nav-item">
							<this.Login match={this.props.match} history={this.props.history} isLoggedIn={this.props.userState.isLoggedIn} username={this.props.userState.username}/>
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

export default withRouter(Header);