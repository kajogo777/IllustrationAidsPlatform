import React from 'react';
import {
  Input,
  Button,
  Dropdown
} from 'semantic-ui-react';


class SearchField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tagsFilter: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      tagsFilter: event.target.value,
    });
    this.props.filterAids("tags", event.target.value);
  };

  render() {
    return (
      <div>
          <Dropdown
            fluid
            placeholder='Search aids...'
            multiple
            search
            selection
            closeOnChange
            value={this.state.tagsFilter}
            options={this.props.tags}
            onChange={(e, {value}) => { this.handleChange({target: {value: value}}) }}
          />
      </div>
    );
  }
}

export default SearchField;
