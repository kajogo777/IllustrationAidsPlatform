import React from 'react';
import {
  Input,
  Button
} from 'semantic-ui-react';


class SearchField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <div>
          <Input
            fluid
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
            placeholder='Search aids...' action
          >
            <input />
            <Button
              basic
              size='medium'
              color='blue'
            >
             Search
            </Button>
          </Input>
      </div>
    );
  }
}

export default SearchField;
