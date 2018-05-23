import React, { Component } from 'react';
import { Card, Icon, Message, Grid, Segment, List, Header, Button, Dropdown } from 'semantic-ui-react';
import Todo from './Todo.jsx';
import GroupStatusTable from './GroupStatusTable.jsx';
import AddPlan from './AddPlan.jsx';
import ItineraryList from './ItineraryList.jsx';
import axios from 'axios';
import ActiveList from './ActiveList.jsx';
import AddInvite from './AddInvite.jsx';

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
        <Card fluid>
          <Card.Content header={this.props.event.title}>
            <Card.Header>
              {this.props.event.title}
              <Dropdown icon="setting" className="float-right-button">
                <Dropdown.Menu>
                  <Dropdown.Item text='Remove Event' />
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Grid columns='equal'>
              <Grid.Column>
                <Segment>
                  <Header>Itinerary
                  <AddPlan
                      handleInputChange={this.props.handleInputChange}
                      handleAddPlan={this.props.handleAddPlan}
                      addPlanError={this.props.addPlanError}
                      handleAddPlanModalOpenClose={this.props.handleAddPlanModalOpenClose}
                      addPlanModalOpen={this.props.addPlanModalOpen}
                    />
                  </Header>
                  <hr className="hr-card" />
                  <ItineraryList
                    itinerary={this.props.itinerary}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <Segment>
                  <Header>
                    Attendees
                    {/* <Button className="float-right-button" size='mini'><Icon name="add user" /></Button> */}
                    <AddInvite />
                  </Header>
                  <hr className="hr-card" />
                  <ActiveList
                    currentEvent={this.props.currentEvent}
                    activeEventsUsers={this.props.activeEventsUsers}
                    eventAttendees={this.props.eventAttendees}
                  />
                </Segment>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content extra>
            <Icon name='map pin' />
            {this.props.event.location}
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content header="Tasks" />
          <Card.Content>
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
        </Card>
        <Card fluid>
          <Card.Content header="Group Task Table" />
          {
            this.props.groupTodos.length === 0
              ? <Card.Content>
                <Message info>
                  <Message.Header>
                    Want to see what everyone has accomplished?
                  </Message.Header>
                  <p>
                    Assign a group task by clicking on the todo icon.
                  </p>
                </Message>
              </Card.Content>
              : <Card.Content className="table-container">
                <GroupStatusTable className="table" groupTodos={this.props.groupTodos} />
              </Card.Content>
          }
        </Card>
      </div>
    )
  }
}
