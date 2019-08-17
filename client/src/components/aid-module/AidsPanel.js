import React from 'react';
import {
  Input,
  Table,
  Label,
  Dropdown,
  Pagination,
  Button,
  Icon
} from 'semantic-ui-react';
import AidForm from './AidForm'


function AidRow(props) {
  return (
    <Table.Row>
      <Table.HeaderCell>{props.aid.human_id}</Table.HeaderCell>
      <Table.HeaderCell>{props.aid.name}</Table.HeaderCell>
      <Table.HeaderCell>{props.aid.description.substring(0, 30)}{props.aid.description.length > 30 ? "..." : ""}</Table.HeaderCell>
      <Table.HeaderCell>{props.aid.date_added.split("T")[0]}</Table.HeaderCell>
      <Table.HeaderCell>{props.aid.type}</Table.HeaderCell>
      <Table.HeaderCell>{props.aid.location}</Table.HeaderCell>
      <Table.HeaderCell>
        <Button circular icon='linkify' onClick={() => window.open(props.aid.url, "_blank")} />
      </Table.HeaderCell>
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
          types={props.types}
        />

      </Table.Cell>
    </Table.Row>
  );
}

function FilterRow(props) {
  return (
    <Table.Row>
      <Table.Cell>
        <Input
          fluid
          type="human_id"
          placeholder='id filter'
          value={props.filter.human_id}
          onChange={(e) => { props.handleChange("human_id", e) }}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          fluid
          type="name"
          placeholder='name filter'
          value={props.filter.name}
          onChange={(e) => { props.handleChange("name", e) }}
        />
      </Table.Cell>
      <Table.Cell />
      <Table.Cell>
      </Table.Cell>
      <Table.Cell>
        <Dropdown
          fluid
          value={props.filter.type}
          options={[
            props.types[0],
            props.types[1],
            { key: 'all', value: '', text: 'ALL' }
          ]}
          onChange={(e, { value }) => { props.handleChange("type", { target: { value: value } }) }}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          fluid
          type="location"
          placeholder='location filter'
          value={props.filter.location}
          onChange={(e) => { props.handleChange("location", e) }}
        />
      </Table.Cell>
      <Table.Cell>
      </Table.Cell>
      <Table.Cell>
        <Dropdown
          fluid
          value={props.filter.reserved}
          options={[
            { key: 'true', value: 'true', text: 'RESERVED' },
            { key: 'false', value: 'false', text: 'AVAILABLE' },
            { key: 'all', value: '', text: 'ALL' }
          ]}
          onChange={(e, { value }) => { props.handleChange("reserved", { target: { value: value } }) }}
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
          value={props.filter.tags}
          options={props.tags}
          onChange={(e, { value }) => { props.handleChange("tags", { target: { value: value } }) }}
        />
      </Table.Cell>
      <Table.Cell />
    </Table.Row>
  );
}

class AidsPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        human_id: '',
        name: '',
        reservedNumber: '',
        location: '',
        reserved: '',
        type: '',
        tags: []
      },

      limit: 10,
    };
  }

  componentDidMount() {
    this.props.onLoad(this.state.limit);
  }

  // componentWillUnmount(){
  //   this.props.clearFilter();
  // }

  handleChange = (field, event) => {
    const filters = Object.assign({},
      this.state.filter,
      { [field]: event.target.value }
    );
    this.setState({
      filter: filters
    });
    this.props.fetchAids(0, this.state.limit, filters);
  }

  handlePaginationChange = (e, { activePage }) => {
    const newSkip = (activePage - 1) * this.props.limit;
    this.props.fetchAids(newSkip, this.props.limit, this.state.filter);
  }

  render() {
    return (
      <Table celled stackable striped textAlign='center'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Date Added</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>URL</Table.HeaderCell>
            <Table.HeaderCell>Reserved</Table.HeaderCell>
            <Table.HeaderCell>Tags</Table.HeaderCell>
            <Table.HeaderCell>
              <AidForm
                saveAid={this.props.addAid}
                deleteAid={this.props.deleteAid}
                addTag={this.props.addTag}
                uploadFile={this.props.uploadFile}
                tags={this.props.tags}
                types={this.props.types}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <FilterRow handleChange={this.handleChange} tags={this.props.tags} filter={this.state.filter} types={this.props.types} />
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
                types={this.props.types}
              />
            )
          }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='9'>
              <Pagination
                activePage={Math.floor(this.props.skip / this.props.limit) + 1}
                totalPages={Math.ceil(this.props.total / this.props.limit)}
                onPageChange={this.handlePaginationChange}
                boundaryRange={0}
                prevItem={null}
                nextItem={null}
                ellipsisItem={null}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default AidsPanel;
