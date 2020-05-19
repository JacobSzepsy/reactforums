import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NewThread from './NewThread.js';

class Board extends Component{
	render(){
		return (
			
			<div className="container mt-4 mb-4 mw-100">
				<table className='table' style={{ 'border': '1px solid gray' }}>
				<thead className='thead-dark'>
					<tr>
						<th>{this.props.boardName}</th>
						<th>{"Poster"}</th>
						<th>{"Date"}</th>
						
					</tr>
				</thead>
				<tbody>
					{this.props.threads.map((thread) =>
						<tr key={thread.threadid}>
							
							<td style={{width: '70%'}}><Link className="linkBlack" to={`/${this.props.boardName}/${thread.threadid}`}>{thread.title}</Link></td>
							<td>{thread.poster}</td>
							<td>{thread.date}</td>
						</tr>
					)}
				</tbody>
					
				</table>
				<NewThread boardName={this.props.boardName} newThread={this.props.newThread} userState={this.props.userState}/>
			</div>
		);
	}
}

export default Board;