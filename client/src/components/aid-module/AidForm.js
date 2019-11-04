import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Form,
} from 'semantic-ui-react';

import { FilePond } from "react-filepond";

class AidForm extends React.Component {

  constructor(props) {
    super(props);

    let state = {
      modalOpen: false,
      aid: {},
      newAid: false,
      files: []
    };

    if (props.aid) {
      state.aid = {
        'human_id': props.aid.human_id,
        'name': props.aid.name,
        'description': props.aid.description,
        'date_added': props.aid.date_added,
        'location': props.aid.location,
        'reserved': props.aid.reserved,
        'tags': props.aid.tags,
        'image_uri': props.aid.image_uri,
        'url': props.aid.url,
        'type': props.aid.type
      };
      state.files = [{
        source: props.aid.image_uri,
        options: {
          type: 'local'
        }
      }];
    } else {
      state.newAid = true;
      state.aid = {
        'human_id': '',
        'name': '',
        'description': '',
        'type': props.types[0].value,
        'location': '',
        'url': '',
        'tags': []
      };
    }

    this.state = state;
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    if (this.state.newAid)
      this.setState({
        modalOpen: false,
        aid: {},
        files: []
      });
    else
      this.setState({
        modalOpen: false,
        files: [{
          source: this.state.aid.image_uri,
          options: {
            type: 'local'
          }
        }]
      });
  }

  handleChange = (field, value) => {
    let newState = {
      aid: {
        ...this.state.aid,
        [field]: value
      }
    };

    if (newState.aid.type === 'DIGITAL' && newState.aid.location && newState.aid.location.length > 0) {
      newState.aid.location = "";
    }

    this.setState(newState);
  }

  handleAddition = (value) => {
    this.props.addTag(value);
  }

  handleSave = () => {
    let aid = Object.assign({}, this.state.aid);
    if (this.state.newAid)
      this.props.saveAid(aid);
    else
      this.props.saveAid(this.props.aid._id, aid);

    this.handleClose();
  }

  handleDelete = () => {
    this.props.deleteAid(this.props.aid);
    this.handleClose();
  }

  handleDuplicate = () => {
    let aid = {
      'human_id': this.state.aid.human_id,
      'name': this.state.aid.name,
      'description': this.state.aid.description,
      'location': this.state.aid.location,
      'tags': this.state.aid.tags,
      'image_uri': this.state.aid.image_uri,
      'url': this.state.aid.url,
      'type': this.state.aid.type
    }
    this.props.duplicateAid(aid, aid.image_uri);
    this.handleClose();
  }

  render() {
    const inlineStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    const isDigital = this.state.aid.type === 'DIGITAL';

    return (
      <Modal trigger={
        this.state.newAid ?
          <Button color="green" icon basic onClick={this.handleOpen}>
            <Icon name='add' size='large' />
          </Button>
          :
          <Button color="olive" icon basic onClick={this.handleOpen}>
            <Icon name='edit' size='large' />
          </Button>
      }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeOnDimmerClick={false}
        style={inlineStyle.modal}
      >
        <Modal.Header>
          {
            this.state.newAid ?
              "New Aid"
              :
              "Edit Aid"
          }
        </Modal.Header>
        <Modal.Content>
          <FilePond
            required={true}
            acceptedFileTypes={['image/png', 'image/jpeg']}
            ref={ref => (this.pond = ref)}
            files={this.state.files}
            imageResizeTargetWidth={800}
            imageResizeTargetheight={800}
            imageResizeMode="contain"
            server={{
              process: {
                url: 'api/uploads/',
                method: 'POST',
                headers: {
                  'Authorization': localStorage.getItem('feathers-jwt')
                },
                onload: (response) => {
                  response = JSON.parse(response);
                  this.handleChange('image_uri', response.id);
                  return response.id;
                },
              },
              revert: null,
              load: (id, load) => {
                fetch('uploads/' + id)
                  .then(res => res.blob())
                  .then(load);
              },
            }}
            onupdatefiles={fileItems => {
              this.setState({
                files: fileItems.map(fileItem => fileItem.file)
              });
            }}
          />
        </Modal.Content>
        <Modal.Content>
          <Form>
            <Form.Input
              label='ID'
              placeholder='id'
              name='ID'
              value={this.state.aid.human_id}
              onChange={(e) => { this.handleChange('human_id', e.target.value) }}
            />
            <Form.Input
              label='Name'
              placeholder='name'
              name='name'
              value={this.state.aid.name}
              onChange={(e) => { this.handleChange('name', e.target.value) }}
            />
            <Form.TextArea
              label='Description'
              placeholder='description'
              name='description'
              value={this.state.aid.description}
              onChange={(e) => { this.handleChange('description', e.target.value) }}
            />
            {
              !isDigital ?
                <Form.Input
                  label='Location'
                  placeholder='location'
                  name='location'
                  value={this.state.aid.location}
                  onChange={(e) => { this.handleChange('location', e.target.value) }}
                />
                : null
            }
            <Form.Input
              label='URL'
              placeholder='url'
              name='url'
              value={this.state.aid.url}
              onChange={(e) => { this.handleChange('url', e.target.value) }}
            />
            <Form.Dropdown
              label='Type'
              placeholder='type'
              selection
              value={this.state.aid.type}
              options={this.props.types}
              onChange={(e, { value }) => { this.handleChange("type", value) }}
            />
            <Form.Dropdown
              label='Tags'
              fluid
              placeholder='tags...'
              additionLabel='Add new tag: '
              multiple
              search
              selection
              allowAdditions
              value={this.state.aid.tags}
              options={this.props.tags}
              onAddItem={(e, { value }) => { this.handleAddition(value) }}
              onChange={(e, { value }) => { this.handleChange("tags", value) }}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {
            this.state.newAid ?
              null
              :
              <Button color='red' onClick={this.handleDelete}>
                delete
              </Button>
          }
          {
            this.state.newAid || this.state.aid.type === 'DIGITAL' ?
              null
              :
              <Button color='blue' onClick={this.handleDuplicate}>
                duplicate
              </Button>
          }
          <Button color='green' onClick={this.handleSave}>
            save
          </Button>
          <Button color='yellow' onClick={this.handleClose}>
            cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AidForm;
