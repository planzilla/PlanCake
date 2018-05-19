import React, { Component } from 'react'
import { Header, Table, Rating, Label, Icon, ItemContent, ItemExtra } from 'semantic-ui-react'

export default class GroupStatusTable extends Component {
  constructor(props) {
    super(props);
    this.getNamesForCol = this.getNamesForCol.bind(this);
  }

  getNamesForCol() {
    let allNames = this.props.groupTodos.map(item => item.name);
    let uniqueNames = [... new Set(allNames)];
    return uniqueNames;
  }

  getTasksForRow() {
    let allTasks = this.props.groupTodos.map(item => item.text);
    let uniqueTasks = [... new Set(allTasks)];
    return uniqueTasks;
  }

  populateRows() {
    let tasks = this.getTasksForRow();
    let people = this.getNamesForCol();
    let output = [];
    let innerOutput = [];
    let currentDate = new Date();

    tasks.forEach(task => {
      output.push(
        <Table.Row>
          <Table.Cell singleline="true" className="table-col-task">
            {task}
          </Table.Cell>

          {
            people.forEach((person => {
              this.props.groupTodos.forEach(item => {
                if (item.text === task && item.name === person) {
                  let deadline = new Date(item.deadline);
                  let dayBeforeDeadline = new Date(item.deadline);
                  dayBeforeDeadline.setDate(deadline.getDate() - 1);

                  if (item.completed) {
                    innerOutput.push(<Icon name="check circle" color="green" size="large" />);
                    // innerOutput.push(<Table.Cell textAlign="center"><Icon name="check circle" color="green" size="large" /></Table.Cell>)
                  } else if (deadline < currentDate) {
                    innerOutput.push(<Icon name="remove circle" color="red" size="large" />);
                    // innerOutput.push(<Table.Cell textAlign="center"><Icon name="remove circle" color="red" size="large" /></Table.Cell>)
                  } else if (dayBeforeDeadline < currentDate) {
                    // innerOutput.push(<Table.Cell textAlign="center"> <Icon name="warning sign" color="yellow" size="large" /></Table.Cell>)
                    innerOutput.push(<Icon name="warning sign" color="yellow" size="large" />);
                  } else {
                    innerOutput.push('');
                  }
                }
              })
            }))
          }

          {innerOutput.map((item, i) => (<Table.Cell textAlign="center" key={i}>{item}</Table.Cell>))}

        </Table.Row>
      )

      innerOutput = [];
    })

    return output;
  }

  render() {
    return (
      <Table celled padded striped color="grey">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="table-col-task">
              <Label ribbon color="teal">
                TASK
              </Label>
            </Table.HeaderCell>
            {this.getNamesForCol().map((name, i)=> (
              <Table.HeaderCell textAlign="center" className="table-col" key={i}>
                {name}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.populateRows()}
        </Table.Body>
      </Table>
    )
  }
} 