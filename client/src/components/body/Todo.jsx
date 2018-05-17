import React, { Component } from 'react';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <div>
        <h3>Your To-Do List</h3>
          {this.props.todos.map(todo => {
            console.log(todo);
            return (
              <div>
                <h1>hello</h1>
                <p>{todo.text}</p>
                <p>{todo.deadline}</p>
              </div>
            )
          })}
      </div>
    )
  }
}


