import React, { Component } from 'react';
import EventCard from './EventCard.jsx';
import { fetchPosts } from '../../actions/postActions.js';
import { connect } from 'react-redux';
//import sidebar
//import event cards

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    console.log('dash props: ', this.props.events);
    if (!this.props.events.data) {
      console.log('...loading');
      return 'loading';
    } else {
      return(
        <div>
          <div className="event-cards">
          {this.props.events.data.map((event, i) => {
            return(
                <EventCard title={event.title} location={event.location} key={i}/>
            )
          })}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  events: state.posts.events,
  newEvent: state.posts.event
});
// console.log('after map:', this.props);
export default connect(mapStateToProps, { fetchPosts })(Dashboard); 