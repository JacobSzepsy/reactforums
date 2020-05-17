import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import ThreadList from './components/ThreadList.js';
import PostList from './components/PostList.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class App extends Component {
  state = {
    userState: {
      isLoggedIn: true,
      username: 'bob',
      auth: 'sometoken' 
    }
  }

  logout = () => {
    this.setState({ userState: {isLoggedIn: false, user: null, token: null}});
  }

  login = (credentials) => {
    this.setState({ userState: {isLoggedIn: true, username: credentials.username, auth: 'something'}});
    console.log(this.state);
  }

  register = (credentials) => {
    this.setState({ userState: {isLoggedIn: true, username: credentials.username, auth: 'something'}});
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
