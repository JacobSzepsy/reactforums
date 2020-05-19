import React, { Component } from 'react';
import Board from './Board.js';

class ThreadList extends Component {
  state = {
    boards: {
      anime: [
        {
          threadid: "23812423432349",
          poster: 'bob',
          title: 'this show sucks',
          date: '4-10-2023'
        },
        {
          threadid: "23346346342349",
          poster: 'bob',
          title: 'this show sucks',
          date: '4-10-2023'
        },
        {
          threadid: "23892342342",
          poster: 'bob',
          title: 'this show sucks',
          date: '4-10-2023'
        },
      ],
      Programming: [
        {
          threadid: "23815325249",
          poster: 'bob',
          title: 'I hate c++',
          date: '4-10-2023'
        },
        {
          threadid: "23234234",
          poster: 'Alice',
          title: 'Why c++ is the best',
          date: '4-10-2023'
        },
        {
          threadid: "223423487678",
          poster: 'george',
          title: 'python go brrrrr',
          date: '4-10-2023'
        },
      ],
    }
  }
  
  newThread = (thread) => {
    //todo: fix this
    this.setState({boards: {...this.state.boards, [thread.board]: [...this.state.boards.thread.board, {threadid: '1234', poster: this.props.userState.username, title: thread.title}]}})
  }
  

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.state.boards).map((board) =>   
            <Board key={board} boardName={board} threads={this.state.boards[board]} userState={this.props.userState}/> 
        )}
      </React.Fragment>
    );
  }
}

export default ThreadList;

