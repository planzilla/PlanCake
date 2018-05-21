import React, { Component } from 'react';
import axios from 'axios';
import { Card, Icon } from 'semantic-ui-react';
import Todo from './Todo.jsx';
import AddTodo from './AddTodo.jsx';


export default class EventSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTodoModalOpen: false,
      addTodoError: '',
      todoData: {
        groupTodo: false,
        addTodoTask: '',
        assignee: '',
        assigner: this.props.userId,
        EventId: this.props.event.id,
        deadline: '',
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleAddTodoModalOpenClose = this.handleAddTodoModalOpenClose.bind(this);
    this.postAddTodo = this.postAddTodo.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleAddTodoModalOpenClose() {
    let openCloseState = this.state.addTodoModalOpen;
    // this.clearAllAddTodoInfo();
    this.setState({ addTodoModalOpen: !openCloseState });
  }

  handleInputChange(event) {
    // let todoDataCopy = Object.assign({}, this.state.todoData);
    // the todoDataCopy[event.target.name] = event.target.value;
    this.setState({ 
      todoData: { 
        ...this.state.todoData,
        [event.target.name]: event.target.value,
      },
    });
    console.log(this.state.todoData);
  }

  handleRadio(option) {
    if (option === 'everyone') {
      this.setState({
        todoData: {
          ...this.state.todoData,
          groupTodo: true,
          assignee: 'everyone'
        }
      })
    } else if (option === 'myself') {
      this.setState({ 
        todoData: {
          ...this.state.todoData,
          groupTodo: false,
          assignee: this.props.userId,
        }
      });
    } else {
      console.log('option is: ', option);
      this.setState({
        todoData: {
          ...this.state.todoData,
          groupTodo: false,
          assignee: option
        }
      })
    }
    // this.setState({})
    // TODO DO THIS HERE
  }

  handleAddTodo(e) {
    e.preventDefault();
    for(var key in this.state.todoData) {
      if (this.state.todoData[key] === '') {
        this.setState({ addTodoError: `Please insert ${key}.`});
        console.log('state: ', this.state.todoData);
      }
    this.postAddTodo();
    }
  }

  postAddTodo() {
    return axios.post('/api/todos', this.state.todoData)
      .then(({ data }) => {
        console.log('post add todo: ', data);
      })
  }

  render() {
    return (
      <div className="event-cards">
      <Card fluid color="teal">
        <Card.Content header={this.props.event.title} />
        <Card.Content>
          <h5>{this.props.event.location}</h5>

          <Todo 
            todos={this.props.todos} 
            event={this.props.event}
            eventAttendees={this.props.eventAttendees}
            handleInputChange={this.handleInputChange}
            handleAddTodo={this.handleAddTodo}
            handleAddTodoModalOpenClose={this.handleAddTodoModalOpenClose}
            addTodoModalOpen={this.state.addTodoModalOpen}
            addTodoError={this.state.addTodoError}
            handleRadio={this.handleRadio}
          />

        </Card.Content>
        <Card.Content extra>
          <Icon name='map pin' /> ;
          {this.props.event.location}
        </Card.Content>
      </Card>
      </div>
    )
  }
}
