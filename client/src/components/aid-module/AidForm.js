import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Form,
  Image
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone'


class AidForm extends React.Component{

  constructor(props){
    super(props);

    let state = {
      modalOpen: false,
      file: null,
      aid: {},
      newAid: false
    };

    if(props.aid){
      state.aid = {
        'human_id': props.aid.human_id,
        'name': props.aid.name,
        'description': props.aid.description,
        'date_added': props.aid.date_added,
        'reserved': props.aid.reserved,
        'tags': props.aid.tags,
        'image_uri': props.aid.image_uri
      };
    }else{
      state.newAid = true;
      state.aid = {
        'human_id': '',
        'name': '',
        'description': '',
        'tags': []
      };
    }

    this.state = state;
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (field, value) => {
    this.setState({
      aid: {
        ...this.state.aid,
        [field]: value
      }
    });
  }

  handleAddition = (value) => {
    this.props.addTag(value);
  }

  handleSave = () => {
    let aid = Object.assign({}, this.state.aid);
    if(this.state.newAid)
      this.props.saveAid(aid, this.state.file);
    else
      this.props.saveAid(this.props.aid._id, aid, this.state.file);

    this.handleClose();
  }

  handleDelete = () => {
    this.props.deleteAid(this.props.aid);
    this.handleClose();
  }

  handleUpload = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const file = reader.result;

            this.setState({
              file: file
            });
            //this.props.uploadFile(file);
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(file)
    });
  }

  render(){
    const inlineStyle = {
      modal : {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };
    
    return (
      <Modal trigger={
        this.state.newAid ?
          <Button color="green" icon basic onClick={this.handleOpen}>
            <Icon name='add' size='large'/>
          </Button>
        :
          <Button color="olive" icon basic onClick={this.handleOpen}>
            <Icon name='edit' size='large'/>
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
        <Dropzone onDrop={this.handleUpload}>
          {
            //after deployment remove absolute urls
            //TODO
            this.state.file === null ?
              (
                this.state.newAid ?
                  null
                :
                  <Image alt="" src={"http://localhost:3030/uploads/" + this.state.aid.image_uri} />
              )
            :
              <Image alt="" src={this.state.file} />
          }
        </Dropzone>
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
            this.state.newAid ?
              null
            :
              <Form.Checkbox
                label='Reserved'
                checked={this.state.aid.reserved}
                onChange={(e) => { this.handleChange('reserved', !this.state.aid.reserved) }}
              />
          }
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
            onAddItem={(e, {value}) => { this.handleAddition(value) }}
            onChange={(e, {value}) => { this.handleChange("tags", value) }}
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