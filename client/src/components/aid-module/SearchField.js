import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';


function SearchField(props) {

  return (
    <div>
      <Dropdown
        fluid
        placeholder='Search aids...'
        multiple
        search
        selection
        closeOnChange
        value={props.tagsFilter}
        options={props.tags}
        onChange={(e, { value }) => { props.filterAids({ target: { value: value } }) }}
      />
    </div>
  );
}

export default SearchField;
