import React from 'react'
import { Header, Table, Rating, Label, Icon} from 'semantic-ui-react'

const GroupStatusTable = () => (
  <Table celled padded striped color="grey" definition="true">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell className="table-col-task"><Label ribbon color="teal">TASK</Label></Table.HeaderCell>
        <Table.HeaderCell textAlign="center" className="table-col">William H.</Table.HeaderCell>
        <Table.HeaderCell textAlign="center" className="table-col">Brandon V.</Table.HeaderCell>
        <Table.HeaderCell textAlign="center" className="table-col">Christina Y.</Table.HeaderCell>
        <Table.HeaderCell textAlign="center" className="table-col">Phillip T.</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell singleline className="table-col-task">Book Flights Book Flights Book Flights
        </Table.Cell>
        <Table.Cell textAlign="center"> <Icon name="warning sign" color="yellow" size="large"/></Table.Cell>
        <Table.Cell textAlign="center"> <Icon name="check circle" color="green" size="large"/>
        </Table.Cell>
        <Table.Cell>
        </Table.Cell>
        <Table.Cell>
        </Table.Cell>
                <Table.Cell>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell className="table-col-task"> 
        Book Airbnb
        </Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell textAlign="center">
        <Icon name="remove circle" color="red" size="large"/>
        </Table.Cell>
        <Table.Cell textAlign="center">
         <Icon name="warning sign" color="yellow" size="large"/>
        </Table.Cell>
        <Table.Cell>
        </Table.Cell>
                <Table.Cell>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default GroupStatusTable;