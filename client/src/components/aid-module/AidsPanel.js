import React from 'react';
import {
  Input,
  Table,
  Label,
  Dropdown,
  Pagination,
} from 'semantic-ui-react';
import AidForm from './AidForm'


function AidRow(props){
    return(
      <Table.Row>
        <Table.HeaderCell>{props.aid.human_id}</Table.HeaderCell>
        <Table.HeaderCell>{props.aid.name}</Table.HeaderCell>
        <Table.HeaderCell>{props.aid.description.substring(0,30)}{props.aid.description.length > 30 ? "..." : ""}</Table.HeaderCell>
        <Table.HeaderCell>{props.aid.date_added.split("T")[0]}</Table.HeaderCell>
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
      filter: {
        human_id: '',
        name: '',
        reservedNumber: '',
        location: '',
        reserved: '',
        tags: []
      },

      offset: 0,
      limit: 10,
    };
  }

  handleChange(field, event){
    const filters = Object.assign({},
      this.state.filter,
      { [field]: event.target.value }
    );
    this.setState({
      filter: filters
    });
    this.props.fetchAids(this.state.offset, this.state.limit, filters);
  }

  componentDidMount(){
    this.props.onLoad(this.state.limit);
  }

  render(){
    return(
      <Table.Row>
        <Table.Cell>
          <Input
            fluid
            type="human_id"
            placeholder='id filter'
            value={this.state.filter.human_id}
            onChange={(e) => { this.handleChange("human_id", e) }}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            fluid
            type="name"
            placeholder='name filter'
            value={this.state.filter.name}
            onChange={(e) => { this.handleChange("name", e) }}
          />
        </Table.Cell>
        <Table.Cell/>
        <Table.Cell>
        </Table.Cell>
        <Table.Cell>
          <Input
            fluid
            type="location"
            placeholder='location filter'
            value={this.state.filter.location}
            onChange={(e) => { this.handleChange("location", e) }}
          />
        </Table.Cell>
        <Table.Cell>
          <Dropdown
            fluid
            value={this.state.filter.reserved}
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
            value={this.state.filter.tags}
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
          <FilterRow onLoad={this.props.onLoad} filterAids={this.props.filterAids} fetchAids={this.props.fetchAids} tags={this.props.tags} />
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
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='7'>
              <Pagination defaultActivePage={1} totalPages={10} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default AidsPanel;
