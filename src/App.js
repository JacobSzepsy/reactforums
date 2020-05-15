import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList.js';
import Header from './components/Header.js';

class App extends Component {
  state = {
    userState: {
      isLoggedIn: true,
      username: 'alice',
      auth: 'sometoken' 
    },
    posts: [
      {
        id: 1,
        user: "someuser",
        body: "this is some post",
        date: "4-13-2020 9:10"
      },
      {
        id: 2,
        user: "bob",
        body: "this is another post",
        date: "4-14-2020 12:01"
      }
    ]
  }
  
  newPost = (body) => {
    const date = new Date();
    const post = {
      id: (this.state.posts.length + 1),
      user: this.state.userState.username,
      body: body,
      date: date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
    }
    this.setState({ userState: {...this.state.userState}, posts: [...this.state.posts, post] });
    console.log(this.state);
  }

  deletePost = (id) => {

  }

  editPost = (id) => {

  }

  logout = () => {
    this.setState({ userState: {isLoggedIn: false, user: null, token: null}, posts: [...this.state.posts]});
  }

  render() {
    return (
      <React.Fragment>
        <Header logout={this.logout} userState={this.state.userState}/>
        <PostList NewPost={this.newPost} userState={this.state.userState} posts={this.state.posts} onSubmit={this.handleSubmit}/>
      </React.Fragment>
    );
  }
}

export default App;
