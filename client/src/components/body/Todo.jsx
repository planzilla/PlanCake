import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';
import moment from 'moment';

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
              return (
                <div>
                  <p><Checkbox label={todo.text} /> 
                  due: {moment(todo.deadline).format("DD MMMM YY")}
                  </p>
                </div>
              )
            }
          })}
      </div>
    )
  }
}
