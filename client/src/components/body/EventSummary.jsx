import React, { Component } from 'react';
import axios from 'axios';
import { Card, Icon } from 'semantic-ui-react';
import Todo from './Todo.jsx';
import AddTodo from './AddTodo.jsx';


export default class EventSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
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
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    return axios.get('/api/todos')
    .then(result => {
      this.setState({ todos: result.data });
    });
  }

  handleAddTodoModalOpenClose() {
    let openCloseState = this.state.addTodoModalOpen;
    // this.clearAllAddTodoInfo();
    this.setState({ addTodoModalOpen: !openCloseState });
  }

  handleInputChange(event) {
    this.setState({ 
      todoData: { 
        ...this.state.todoData,
        [event.target.name]: event.target.value,
      },
    });
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
      this.setState({
        todoData: {
          ...this.state.todoData,
          groupTodo: false,
          assignee: option
        }
      })
    }
  }

  handleUpdateTodo(e, todo) {
    return axios.patch('/api/todos', {
      id: todo.id,
      completed: todo.checked,
    }).then(() => this.fetchTodos());
  }

  handleAddTodo(e) {
    e.preventDefault();
    if (this.state.todoData.addTodoTask === '') {
      this.setState({
        addTodoError: 'Please insert a todo.'
      });
    } else if (this.state.todoData.assignee === '') {
      this.setState({
        addTodoError: 'Please insert an assignee.'
      });
    } else if (this.state.todoData.deadline === '') {
      this.setState({
        addTodoError: 'Please insert a deadline.'
      });
    } else {
      this.postAddTodo();
    }
  }

  postAddTodo() {
    if (this.state.todoData.assignee === 'everyone') {
      this.props.eventAttendees.map(attendee => {
        let todoDataCopy = Object.assign({}, this.state.todoData);
        todoDataCopy.assignee = attendee.userId;
        axios.post('/api/todos', todoDataCopy);
      });
    } else if (this.state.todoData.assignee !== 'everyone') {
      axios.post('/api/todos', this.state.todoData)
    }
    this.handleAddTodoModalOpenClose();
    this.fetchTodos();
    };

  render() {
    return (
      <div className="event-cards">
      <Card fluid color="teal">
        <Card.Content header={this.props.event.title} />
        <Card.Content>
          <h5>{this.props.event.location}</h5>

          <Todo 
            todos={this.state.todos} 
            event={this.props.event}
            eventAttendees={this.props.eventAttendees}
            handleInputChange={this.handleInputChange}
            handleAddTodo={this.handleAddTodo}
            handleAddTodoModalOpenClose={this.handleAddTodoModalOpenClose}
            addTodoModalOpen={this.state.addTodoModalOpen}
            addTodoError={this.state.addTodoError}
            handleRadio={this.handleRadio}
            handleUpdateTodo={this.handleUpdateTodo}
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
