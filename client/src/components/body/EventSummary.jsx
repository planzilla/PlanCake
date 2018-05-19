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
      addTodoError: null,
      todoData: {
        addTodoTask: '',
        assignTo: '',
        assignee: '',
        date: '',
      }

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleAddTodoModalOpenClose = this.handleAddTodoModalOpenClose.bind(this);
    this.postAddTodo = this.postAddTodo.bind(this);
  }
  

  // addTodoModalOpen() {

  // }

  handleAddTodoModalOpenClose() {
    let openCloseState = this.state.addTodoModalOpen;
    // this.clearAllAddTodoInfo();
    this.setState({ addTodoModalOpen: !openCloseState });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleAddTodo(e) {
    e.preventDefault();
    for(let key in this.state.todoData) {
      if (this.state.todoData.key === '') {
        this.setState({
          addTodoError: `Please insert ${key}.`
        })
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
          <AddTodo 
            handleInputChange={this.handleInputChange}
            handleAddTodo={this.handleAddTodo}
            handleAddTodoModalOpenClose={this.handleAddTodoModalOpenClose}
            addTodoModalOpen={this.state.addTodoModalOpen}
            event={this.props.event}
          />
          <Todo 
            todos={this.props.todos} 
            event={this.props.event}
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