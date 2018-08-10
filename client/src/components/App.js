import React from 'react';

import NavigationBar from './navbar-module/NavigationBar';
import MainBody from './MainBody';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div ref={contextRef => !this.state.contextRef && this.setState({ contextRef })}>
        <NavigationBar/>
        <MainBody contextRef={this.state.contextRef}/>
      </div>
    );
  }
}

export default App;
