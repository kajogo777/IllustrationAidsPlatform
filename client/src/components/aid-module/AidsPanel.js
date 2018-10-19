import React from 'react';
import {
  Input,
  Table,
  Label,
  Dropdown,
} from 'semantic-ui-react';
import AidForm from './AidForm'


function AidRow(props){
    return(
      <Table.Row>
        <Table.HeaderCell>{props.aid.human_id}</Table.HeaderCell>
        <Table.HeaderCell>{props.aid.name}</Table.HeaderCell>
        <Table.HeaderCell>{props.aid.description.substring(0,30)}{props.aid.description.length > 30 ? "..." : ""}</Table.HeaderCell>
        <Table.HeaderCell>{props.aid.date_added}</Table.HeaderCell>
        <Table.HeaderCell>{props.aid.location}</Table.HeaderCell>
        <Table.HeaderCell>{props.aid.reserved ? 'Yes' : 'No'}</Table.HeaderCell>
        <Table.HeaderCell>
          <Label.Group>
            {
              props.aid.tags.map((tag) => <Label key={tag} as='a' color='blue' >{tag}</Label>)
            }
          </Label.Group>
        </Table.HeaderCell>
        <Table.Cell collapsing>

          <AidForm
            saveAid={props.updateAid}
            duplicateAid={props.addAid}
            deleteAid={props.deleteAid}
            addTag={props.addTag}
            uploadFile={props.uploadFile}
            aid={props.aid}
            tags={props.tags}
          />

        </Table.Cell>
      </Table.Row>
    );
}

class FilterRow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      human_idFilter: '',
      nameFilter: '',
      reservedNumberFilter: '',
      date_addedFilter: '',
      locationFilter: '',
      reservedFilter: '',
      tagsFilter: []
    };
  }

  handleChange(field, event){
    this.setState({
      [field + "Filter"]: event.target.value
    });
    this.props.filterAids(field, event.target.value);
  }

  render(){
    return(
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
          <Input
            fluid
            type="location"
            placeholder='location filter'
            value={this.state.locationFilter}
            onChange={(e) => { this.handleChange("location", e) }}
          />
        </Table.Cell>
        <Table.Cell>
          <Dropdown
            fluid
            value={this.state.reservedFilter}
            options={[
              {key: 'true', value: 'true', text: 'reserved'},
              {key: 'false', value: 'false', text: 'available'},
              {key: 'all', value: '', text: 'all'}
            ]}
            onChange={(e, {value}) => { this.handleChange("reserved", {target: {value: value}}) }}
          />
        </Table.Cell>
        <Table.Cell>
          <Dropdown
            fluid
            placeholder='Tags filter'
            multiple
            search
            selection
            closeOnChange
            value={this.state.tagsFilter}
            options={this.props.tags}
            onChange={(e, {value}) => { this.handleChange("tags", {target: {value: value}}) }}
          />
        </Table.Cell>
        <Table.Cell />
      </Table.Row>
    );
  }
}

class AidsPanel extends React.Component{
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
           <Table.HeaderCell>Location</Table.HeaderCell>
           <Table.HeaderCell>Reserved</Table.HeaderCell>
           <Table.HeaderCell>Tags</Table.HeaderCell>
           <Table.HeaderCell>
             <AidForm
               saveAid={this.props.addAid}
               deleteAid={this.props.deleteAid}
               addTag={this.props.addTag}
               uploadFile={this.props.uploadFile}
               tags={this.props.tags}
             />
           </Table.HeaderCell>
         </Table.Row>
        </Table.Header>

        <Table.Body>
          <FilterRow filterAids={this.props.filterAids} tags={this.props.tags} />
          {
            this.props.aids.map((item) =>
              <AidRow
                key={item._id}
                updateAid={this.props.updateAid}
                deleteAid={this.props.deleteAid}
                addAid={this.props.addAid}
                addTag={this.props.addTag}
                uploadFile={this.props.uploadFile}
                aid={item}
                tags={this.props.tags}
              />
            )
          }
        </Table.Body>
      </Table>
    );
  }
}

export default AidsPanel;
