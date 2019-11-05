import React from 'react';
import {
  Dropdown,
  Menu,
  Button
} from 'semantic-ui-react';


function SearchField(props) {
  const filterColors = {
    '': 'grey',
    'DIGITAL': 'violet',
    'REGULAR': 'blue'
  };

  return (
    <Menu fluid stackable borderless
      style={{ borderRadius: '0px' }}>
      <Menu.Item style={{
        width: '100%',
      }}>
        <Dropdown
          fluid
          placeholder='Search aids...'
          multiple
          search
          selection
          closeOnChange
          value={props.tagsFilter}
          options={props.tags}
          onChange={(e, { value }) => { props.filterAids('tags', value) }}
          style={{
            height: '38px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
        />
        <Button.Group color={filterColors[props.typeFilter]} >
          <Dropdown
            icon='filter'
            button
            className='icon'
            direction='left'
            style={{
              height: '38px',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px'
            }}
          >
            <Dropdown.Menu>
              <Dropdown.Menu scrolling>
                {[
                  { text: 'ALL', value: '', color: 'grey' },
                  { text: 'DIGITAL', value: 'DIGITAL', color: 'violet' },
                  { text: 'REGULAR', value: 'REGULAR', color: 'blue' }].map((option) => (
                    <Dropdown.Item
                      onClick={(e) => { props.filterAids('type', option.value) }}
                      key={option.text}
                      text={option.text}
                      value={option.value}
                      label={{ color: option.color, empty: true, circular: true }} />
                  ))}
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>
        </Button.Group>
      </Menu.Item>
      {/* <Menu.Item position='right' direction='right'>
        <Dropdown
          // text='Filter'
          icon='filter'
          // labeled
          button
          circular
          className='icon'
        >
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Category' />
            <Dropdown.Menu scrolling>
              {[
                { text: 'ALL', color: 'black' },
                { text: 'DIGITAL', color: 'violet' },
                { text: 'REGULAR', color: 'blue' }].map((option) => (
                  <Dropdown.Item
                    key={option.text}
                    text={option.text}
                    value={option.text}
                    label={{ color: option.color, empty: true, circular: true }} />
                ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item> */}
    </Menu >
    // <div>
    //   <Dropdown
    //     fluid
    //     placeholder='Search aids...'
    //     multiple
    //     search
    //     selection
    //     closeOnChange
    //     value={props.tagsFilter}
    //     options={props.tags}
    //     onChange={(e, { value }) => { props.filterAids({ target: { value: value } }) }}
    //   />
    //   <Dropdown
    //     text='Filter'
    //     icon='filter'
    //     floating
    //     labeled
    //     button
    //     className='icon'
    //   >
    //     <Dropdown.Menu>
    //       <Dropdown.Header icon='tags' content='Category' />
    //       <Dropdown.Menu scrolling>
    //         {[
    //           { text: 'DIGITAL', color: 'violet' },
    //           { text: 'REGULAR', color: 'blue' }].map((option) => (
    //             <Dropdown.Item
    //               key={option.text}
    //               text={option.text}
    //               value={option.text}
    //               label={{ color: option.color, empty: true, circular: true }} />
    //           ))}
    //       </Dropdown.Menu>
    //     </Dropdown.Menu>
    //   </Dropdown>
    // </div>
  );
}

export default SearchField;
