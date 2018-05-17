import React, { Component } from 'react';

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }




  render() {
    return (
      <div>
        <h3>Your To-Do List</h3>
          {this.props.todos.map((todo, i) => {
            return(
              <p>to-do</p>
            )
          })
        }


      </div>

    )
  }
}