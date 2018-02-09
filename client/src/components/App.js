import React from 'react';

import NavigationBar from './NavigationBar';
import MainBody from './MainBody';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div ref={contextRef => !this.state.contextRef && this.setState({ contextRef })}>
        <NavigationBar contextRef={this.state.contextRef}/>
        <MainBody/>
      </div>
    );
  }
}

export default App;
