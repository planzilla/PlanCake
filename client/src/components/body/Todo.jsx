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
            if (todo.EventId === this.props.event.id) {
              console.log(todo);
              return (
                <div>
                  <p>{todo.text}</p>
                  <p>{todo.deadline}</p>
                </div>
              )
            }
          })}
      </div>
    )
  }
}
