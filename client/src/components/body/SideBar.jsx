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

  handleClick(e, titleProps, event) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.props.handleClickEventTitle(event);
    this.setState({ activeIndex: newIndex });
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
              return (
                <div key={j}>
                  <a>{board.title}</a>
                  <br />
                </div>
              )
            }
          )}
        </div>
      )
    }
  }

  render() {
    const { activeIndex } = this.state;

    if (!this.props.events.data) {
      return 'loading!!';
    } else {
      return (
        <div className="sidebar">
          <CreateEvent
            handleCreateEvent={this.props.handleCreateEvent}
            handleInputChange={this.props.handleInputChange}
            handleModalOpenClose={this.props.handleModalOpenClose}
            createEventError={this.props.createEventError}
            createEventModalOpen={this.props.createEventModalOpen}
          />
          <Accordion>
            {this.props.events.data.map((event, i) => {
              return (
                <div key={i}>
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
            })}
          </Accordion>
        </div>
      )
    }
  }
}
