import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import CreateEvent from './CreateEvent.jsx';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <div className="sidebar">
        <CreateEvent
          handleCreateEvent={this.props.handleCreateEvent}
          handleInputChange={this.props.handleInputChange}
          createEventError={this.props.createEventError}
        />
        <Accordion>
          {this.props.events
            ? this.props.events.map((event, i) => {
              return (<div key={i}>
                <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  <b>{event.title}</b>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  <p>
                    Create a topic board
                </p>
                </Accordion.Content>
              </div>)
            })
            : null}
        </Accordion>
      </div>
    )
  }
}
