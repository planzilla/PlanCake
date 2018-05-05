import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{backgroundColor: "#fffff"}}>

        <Switch>
          <Route exact path="/" render={ props => <h1>hello react</h1> } />
          {/* <Route path="/example" component={ Example } /> */}
          {/* <Route path="/example2" render={ props => {
            return (
              <Example2 function={ function }/>
            )}}
          /> */}

          </Switch>
      </div>
    )
  }
};