import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import CreateEvent from './CreateEvent.jsx';
import AddTopic from './AddTopic.jsx';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
    this.handleClick = this.handleClick.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  renderEvents(event, activeIndex, i) {
    if (activeIndex === i) {
      return (
        <div>
          <AddTopic
            handleInputChange={this.props.handleInputChange}
            handleAddTopic={this.props.handleAddTopic}
            handleAddTopicModalOpenClose={this.props.handleAddTopicModalOpenClose}
            addTopicModalOpen={this.props.addTopicModalOpen}
            addTopicError={this.props.addTopicError}
            eventId={event.id}
          />
          {this.props.topicBoards.map((board, j) => {
            if (board.EventId == event.id) {
              return (
                <div key={j}>
                  <a>{board.title}</a>
                  <br />
                </div>
              )
            }
          })}
        </div>
      )
    }
  }

  render() {
    const { activeIndex } = this.state
    return (
      <div className="sidebar">
        <CreateEvent
          handleInputChange={this.props.handleInputChange}
          handleCreateEvent={this.props.handleCreateEvent}
          handleCreateEventModalOpenClose={this.props.handleCreateEventModalOpenClose}
          createEventError={this.props.createEventError}
          createEventModalOpen={this.props.createEventModalOpen}
        />
        <Accordion>
          {this.props.events.map((event, i) => {
            return (
              <div key={i}>
                <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  <b>{event.title}</b>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  {this.renderEvents(event, activeIndex, i)}
                </Accordion.Content>
              </div>)
          })}
        </Accordion>
      </div>
    )
  }
}
