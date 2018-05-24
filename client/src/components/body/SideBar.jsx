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
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.props.handleClickEventTitle(event);
    this.setState({ activeIndex: newIndex });
  }
  // /${board.id}
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
                <div 
                  key={j} 
                  className='topic-board-link' 
                  onClick={() => this.props.setSelectedBoard(`${board.title}`, board.id)}
                >
                  <Link to={`/board`} id={`${board.title}-${board.id}`}>{board.title}</Link>
                  <br />
                </div>
              )
            }
          )}
        </div>
      )
    }
  }
  // /${event.id}
  render() {
    const { activeIndex } = this.state;
    // for redux
    // if (!this.props.events) {
    //   return 'loading!!';
    // } else {
      return (
        <div className="sidebar">
        <div className="sidebar-grid-container">
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
                  <Link to={`/events`}>
                  <Accordion.Title active={activeIndex === i} index={i} onClick={(e, titleProps) => {this.handleClick(e, titleProps, event)}}>
                    <Icon name='dropdown' />
                      <b>{event.title}</b>
                  </Accordion.Title>
                  </Link>
                  <Accordion.Content active={activeIndex === i}>
                    {this.renderEvents(event, activeIndex, i)}
                  </Accordion.Content>
                </div>)
            })}
          </Accordion>
          </div>
        </div>
      )
    // }
  }
}
