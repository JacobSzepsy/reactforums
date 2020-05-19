import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import ThreadList from './components/ThreadList.js';
import PostList from './components/PostList.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Cookies from 'js-cookie'

class App extends Component {
  state = {
    userState: {
      isLoggedIn: false,
      username: null, 
    }
  }
  
  componentDidMount = () => {
		if(Cookies.get('jwt-token') !== undefined){
			const rqst = {
				method: 'post',
				body: JSON.stringify({
					'token': Cookies.get('jwt-token')
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			};
			fetch('/api/users/validate', rqst)
			.then(response => response.json())
			.then(json => {
			if(json.status === "GOOD"){
				console.log(json);
				this.setState({ userState: {isLoggedIn: true, username: json.user}});
			}else{
				console.log('bad')
				this.setState({ userState: {isLoggedIn: false, user: null}});
			}
			})
		}
	}

  logout = () => {
    this.setState({ userState: {isLoggedIn: false, user: null, token: null}});
    Cookies.remove('jwt-token');
  }

  //TODO: move these functions into the login and register page and have the state pushed back here so that redirects will only happen when the request is succesful 
  login = (credentials) => {
    const rqst = {
      method: 'post',
      body: JSON.stringify({
        'username': credentials.username,
        'password': credentials.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/users/login', rqst)
    .then(response => response.json())
    .then(json => {
      if(json.status === "GOOD"){
        console.log(json);
        this.setState({ userState: {isLoggedIn: true, username: credentials.username}});
        Cookies.set('jwt-token', json.token);
      }else{
        alert(`ERROR: ${json.message}`)
      }
    })
  }

  register = (credentials) => {
    const rqst = {
      method: 'post',
      body: JSON.stringify({
        'username': credentials.username,
        'password': credentials.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/users', rqst)
    .then(response => response.json())
    .then(json => {
      if(json.status === "GOOD"){
        console.log(json);
        this.setState({ userState: {isLoggedIn: true, username: credentials.username}});
        Cookies.set('jwt-token', json.token);
      }else{
        alert(`ERROR: ${json.message}`)
      }
    })
  }

  render() {
    return (
      <Router>
        <Header logout={this.logout} userState={this.state.userState}/>
        <Switch>
          <Route path='/' exact render={() => <ThreadList userState={this.state.userState} />} />
          <Route path='/login' render={() => <Login Login={this.login} userState={this.state.userState} />} />
          <Route path='/register' render={() => <Register Register={this.register} userState={this.state.userState} />} />
          <Route path='/:board' render={({ match: {url} }) => (
            <React.Fragment>
              <Route path={`${url}/`} exact render={() => <ThreadList userState={this.state.userState} />} />
              <Route path={`${url}/:threadID`} exact render={() => <PostList userState={this.state.userState} />} />
            </React.Fragment>
          )} />

        </Switch>
      </Router>
    );
  }
}

export default App;
