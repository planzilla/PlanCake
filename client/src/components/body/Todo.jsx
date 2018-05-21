import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import AddTodo from './AddTodo.jsx';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Your To-Do List</h3>
        <AddTodo 
          handleInputChange={this.props.handleInputChange}
          handleAddTodo={this.props.handleAddTodo}
          handleAddTodoModalOpenClose={this.props.handleAddTodoModalOpenClose}
          addTodoModalOpen={this.props.addTodoModalOpen}
          event={this.props.event}
          eventAttendees={this.props.eventAttendees}
          addTodoError={this.props.addTodoError}
        />
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
