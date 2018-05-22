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
        <AddTodo 
          handleInputChange={this.props.handleInputChange}
          handleAddTodo={this.props.handleAddTodo}
          handleAddTodoModalOpenClose={this.props.handleAddTodoModalOpenClose}
          addTodoModalOpen={this.props.addTodoModalOpen}
          event={this.props.event}
          eventAttendees={this.props.eventAttendees}
          addTodoError={this.props.addTodoError}
          handleRadio={this.props.handleRadio}
        />
          {this.props.todos.map(todo => {
            if (todo.EventId === this.props.event.id) {
              if (todo.completed === false) {                
                return (
                  <div>
                    <p><Checkbox id={todo.id} label={todo.text} onChange={this.props.handleUpdateTodo} /> 
                    due: {moment(todo.deadline).format("LL")}
                    </p>
                  </div>
                )
              } else if (todo.completed === true) {
                return (
                  <div>
                    <p><Checkbox id={todo.id} label={todo.text} onChange={this.props.handleUpdateTodo} checked='true' /> 
                    due: {moment(todo.deadline).format("LL")}
                    </p>
                  </div>
                )
              }
            }
          })
        }
      </div>
    )
  }
}
