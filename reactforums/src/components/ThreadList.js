import React, { Component } from 'react';
import Board from './Board.js';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';

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

  //TODO: have this code in a seperate method and then have a flag so page doesn't render before content is loaded
	componentDidMount = () => {
		const rqst = {
			method: 'get',
		};
		fetch(`/api/topics`, rqst)
		.then(response => response.json())
		.then(json => {
			if(json.status === "GOOD"){
        console.log(this.state);
        this.setState({ boards: json.boards });
        console.log(this.state);
			}else{
				alert(`ERROR: ${json.message}`);
			}
		})
  }
  
  newThread = (thread) => {
    if(Cookies.get('jwt-token') !== undefined){
			const rqst = {
				method: 'post',
				body: JSON.stringify({
          'board': thread.board,
          'subject': thread.title,
					'body': thread.body,
					'token': Cookies.get('jwt-token')
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			};
			fetch(`/api/topics/`, rqst)
			.then(response => response.json())
			.then(json => {
				if(json.status === "GOOD"){
          //TODO: Auto redirect user to new post
          this.setState({ boards: {...this.state.boards, [thread.board]: [...this.state.boards[thread.board], json.data]}});
				}else{
					alert(`ERROR: ${json.message}`);
				}
			})
	  }
  }
  

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.state.boards).map((board) =>   
            <Board key={board} newThread={this.newThread} boardName={board} threads={this.state.boards[board]} userState={this.props.userState}/> 
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(ThreadList);

