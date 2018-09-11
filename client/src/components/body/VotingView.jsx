import React, { Component } from 'react';
import { Button, Card, Image, Icon, Label, Message } from 'semantic-ui-react';

const VoteView = ({ eventAttendees, pinnedMessages, liked }) => {
    return (
  <div className="vote-container">
  {pinnedMessages.length < 1 
  ? <Message info>
      <Message.Header>
        Use "/pin" to pin items 
      </Message.Header>
      <p>
        /pin local1.plan.plancake.co
      </p>
    </Message>
    :pinnedMessages.map((pin, key) => {
    return (
      <Card className="pinned-card" key={key}>
        <Card.Content>
          <Card.Description>
            {pin.text.startsWith('http') ? 
              <a href={pin.text} target="_blank" rel="noopener noreferrer">{pin.text.slice(0, 53)}</a>
              : <span>{pin.text.slice(0, 53)}</span>
            }
          </Card.Description>
          <br />
        <div>
          <Button as='div' labelPosition='right' size='mini'>
                <Button id="sem-button" onClick={(e) => {liked(false, pin.id)}}>
              <Icon name='thumbs outline down' />
            </Button>
            <Label basic pointing='left'>{pin.voteCountDislike}</Label>
          </Button>
          <Button className="sem-button-margin" as='div' labelPosition='right' size='mini'>
            <Button id="sem-button" onClick={(e) => {liked(true, pin.id)}}>
              <Icon name='thumbs outline up' />
            </Button>
            <Label basic pointing='left'>{pin.voteCountLike}</Label>
          </Button>
        </div>
        </Card.Content>
      </Card>
    )
    })}
  </div> )

}

export default VoteView;