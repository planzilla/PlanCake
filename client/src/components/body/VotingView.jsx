import React, { Component } from 'react';
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react';

const VoteView = ({ pinnedMessages, liked }) => {
  return (
  <div className="vote-container">
  <h1>Pinned Items</h1>
  {pinnedMessages.map((pin, key) => {
    return (
      <Card key={key}>
        <Card.Content>
          <Card.Description>
            {<a href={pin.text} target="_blank" rel="noopener noreferrer">{pin.text.slice(0, 53)}</a>}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div>
          <Button as='div' labelPosition='right' size='mini'>
                <Button name="false" onClick={(e) => {liked(false, pin.id)}}>
              <Icon name='thumbs outline down' />
            </Button>
            <Label basic pointing='left'>{pin.voteCountDislike}</Label>
          </Button>
          <Button as='div' labelPosition='right' size='mini'>
            <Button onClick={(e) => {liked(true, pin.id)}}>
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