import React, { Component } from 'react'
import { Input, Menu, Segment, Card, List, Icon } from 'semantic-ui-react'

export default class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Pins'
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    console.log('name in righsidebar', name)
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item name='Pins' active={activeItem === 'Pins'} onClick={this.handleItemClick} />
          <Menu.Item name='Active' active={activeItem === 'Active'} onClick={this.handleItemClick} />
        </Menu>
        {activeItem === 'Pins' 
          ? <Segment attached='bottom'>
              <Card>hello</Card>
              <Card>im working</Card>
              {/* //TODO: insert likes/dislikes cards here */}
            </Segment>
          : <Segment attached='bottom'>
            <List>
              <List.Item>
                <Icon name='circle' color="green"/>
                <List.Content>
                  Floated Icon
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name='circle thin' />
                <List.Content>
                  Icon Alignment
                </List.Content>
              </List.Item>
            </List>
            </Segment>
        }

      </div>
    )
  }
}
