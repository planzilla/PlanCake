import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Accordion, Icon } from 'semantic-ui-react'
import CreateEvent from './CreateEvent.jsx';
import AddTopic from './AddTopic.jsx';
import EventSummary from './EventSummary.jsx';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
    this.handleClick = this.handleClick.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }

  handleClick(e, titleProps, event) {
    console.log('event: ', event);
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
                  <Link to={`/events/${this.props.id}`} component={ EventSummary }>
                    <a>{board.title}</a>
                  </Link>
                  <br />
                </div>
              )
            }
          )}
          <Route path={`/events/:eventId`} component={ EventSummary } />
        </div>
      )
    }
  }

  render() {
    const { activeIndex } = this.state;
    if (!this.props.events) {
      return 'loading!!';
    } else {
      return (
        <div className="sidebar">
          <CreateEvent
            handleCreateEvent={this.props.handleCreateEvent}
            handleInputChange={this.props.handleInputChange}
            handleCreateEventModalOpenClose={this.props.handleCreateEventModalOpenClose}
            createEventError={this.props.createEventError}
            createEventModalOpen={this.props.createEventModalOpen}
          />
          <Accordion>
            {this.props.events.map((event, i) => {
              return (
                <div key={i}>
                  <Accordion.Title active={activeIndex === i} index={i} onClick={(e, titleProps) => {this.handleClick(e, titleProps, event)}}>
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
}
