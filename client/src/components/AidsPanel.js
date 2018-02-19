import React from 'react';
import {
  Input,
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Label,
  Dropdown
} from 'semantic-ui-react';


class AidRow extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      aid: {
        'human_id': props.aid.human_id,
        'name': props.aid.name,
        'description': props.aid.description,
        'date_added': props.aid.date_added,
        'reserved': props.aid.reserved,
        'tags': props.aid.tags,
      }
    };
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (field, value) => {
    console.log(value);
    this.setState({
      aid: {
        ...this.state.aid,
        [field]: value
      }
    });
  }

  handleSave = () => {
    let aid = Object.assign({}, this.state.aid);
    console.log(aid);
    this.props.updateAid(this.props.aid._id, aid);
    this.handleClose();
  }

  handleDelete = () => {
    this.props.deleteAid(this.props.aid);
    this.handleClose();
  }

  render(){
    return(
      <Table.Row>
        <Table.HeaderCell>{this.props.aid.human_id}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.aid.name}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.aid.description.substring(0,30)}{this.props.aid.description.length > 30 ? "..." : ""}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.aid.date_added}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.aid.reserved ? 'Yes' : 'No'}</Table.HeaderCell>
        <Table.HeaderCell>
          <Label.Group>
            {
              this.props.aid.tags.map((tag) => <Label key={tag} as='a' color='blue' >{tag}</Label>)
            }
          </Label.Group>
        </Table.HeaderCell>
        <Table.Cell collapsing>

          <Modal trigger={
            <Button color="olive" icon basic onClick={this.handleOpen}>
              <Icon name='edit' size='large'/>
            </Button>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeOnDimmerClick={false}
          >
            <Modal.Header>Edit Aid</Modal.Header>
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
              <Form.Checkbox
                label='Reserved'
                checked={this.state.aid.reserved}
                onChange={(e) => { this.handleChange('reserved', !this.state.aid.reserved) }}
              />
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={this.handleDelete}>
                delete
              </Button>
              <Button color='green' onClick={this.handleSave}>
                save
              </Button>
              <Button color='yellow' onClick={this.handleClose}>
                cancel
              </Button>
            </Modal.Actions>
          </Modal>

        </Table.Cell>
      </Table.Row>
    );
  }
}

class AidsPanel extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      human_idFilter: '',
      nameFilter: '',
      reservedNumberFilter: '',
      date_addedFilter: '',
      tagsFilter: []
    };
  }

  handleChange(field, event){
    this.setState({
      [field + "Filter"]: event.target.value
    });
    this.props.filterAids(field, event.target.value);
  }

  componentDidMount(){
    this.props.onLoad();
  }

  componentWillUnmount(){
    this.props.clearFilter();
  }

  render(){
    return(
      <Table celled stackable striped textAlign='center'>
        <Table.Header>
         <Table.Row>
           <Table.HeaderCell>ID</Table.HeaderCell>
           <Table.HeaderCell>Name</Table.HeaderCell>
           <Table.HeaderCell>Description</Table.HeaderCell>
           <Table.HeaderCell>Date Added</Table.HeaderCell>
           <Table.HeaderCell>Reserved</Table.HeaderCell>
           <Table.HeaderCell>Tags</Table.HeaderCell>
           <Table.HeaderCell />
         </Table.Row>
        </Table.Header>

        <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Input
              fluid
              type="human_id"
              placeholder='id filter'
              value={this.state.human_idFilter}
              onChange={(e) => { this.handleChange("human_id", e) }}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              fluid
              type="name"
              placeholder='name filter'
              value={this.state.nameFilter}
              onChange={(e) => { this.handleChange("name", e) }}
            />
          </Table.Cell>
          <Table.Cell/>
          <Table.Cell>
            <Input
              fluid
              type="date_added"
              placeholder='date filter'
              value={this.state.date_addedFilter}
              onChange={(e) => { this.handleChange("date_added", e) }}
            />
          </Table.Cell>
          <Table.Cell>

          </Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              placeholder='Tags filter'
              multiple
              search
              selection
              value={this.state.tagsFilter}
              options={this.props.tags}
              onChange={(e, {value}) => { this.handleChange("tags", {target: {value: value}}) }}
            />
          </Table.Cell>
          <Table.Cell />
        </Table.Row>
          {
            this.props.aids.map((item) =>
              <AidRow key={item._id} updateAid={this.props.updateAid} deleteAid={this.props.deleteAid} aid={item} />
            )
          }
        </Table.Body>
      </Table>
    );
  }
}

export default AidsPanel;
