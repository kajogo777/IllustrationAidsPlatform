import React from 'react';
import {
  Card,
  Container,
  Segment,
  Sticky,
  Button,
  Divider,
  Pagination,
  Table,
  Icon,
  Header
} from 'semantic-ui-react';
import AidCard from './AidCard';
import SearchField from './SearchField';
import AidDetails from './AidDetails';


class AidCardGrid extends React.Component {

  constructor(props) {
    super(props);

    let state = {
      selected: null,
      filters: {
        tags: [],
        type: '',
      },
      limit: 20,
    };

    this.state = state;
  }

  handleFocus = (aid) => this.setState({ selected: aid })

  handleChange = (key, value) => {
    const filters = {
      ...this.state.filters
    };
    filters[key] = value;
    this.setState({
      ...this.state,
      'filters': filters
    });
    this.props.fetchAids(0, this.state.limit, filters);
  };

  handlePaginationChange = (e, { activePage }) => {
    const newSkip = (activePage - 1) * this.props.limit;
    this.props.fetchAids(newSkip, this.props.limit, this.state.filters);
  }

  componentDidMount() {
    this.props.onLoad(this.state.limit);
  }

  render() {
    return (
      <div>
        {

          this.state.selected ?

            <div>
              <br />
              <Container text>
                <Button fluid onClick={(event, data) => this.handleFocus(null)} >
                  <Icon name="angle double left" />
                  Back To All Aids
                </Button>
                <Divider clearing />
                <AidDetails
                  item={this.state.selected}
                  reservations={this.props.selected_reservations}
                  tags={this.props.tags}
                  getAidReservations={this.props.getAidReservations}
                  addReservation={this.props.addReservation}
                />
                <Divider clearing />
                <Button fluid onClick={(event, data) => this.handleFocus(null)} >
                  <Icon name="angle double left" />
                  Back To All Aids
                </Button>
                <br />
              </Container>
            </div>

            :

            <div>
              <Container fluid>
                <Sticky context={this.props.contextRef} offset={0} className="top-sticky">
                  <SearchField tags={this.props.tags} typeFilter={this.state.filters.type} tagsFilter={this.state.filters.tags} filterAids={this.handleChange} />
                </Sticky>
              </Container>
              <br />
              {
                this.props.aids.length > 0 ?
                  <Container fluid>
                    <Card.Group centered stackable doubling style={{ 'margin': '0em 0em' }}>
                      {
                        this.props.aids.map((item) =>
                          <AidCard
                            item={item}
                            key={item._id}
                            handleFocus={this.handleFocus}
                          />
                        )
                      }
                    </Card.Group>

                    <Table basic='very' stackable textAlign='center'>
                      <Table.Footer>
                        <Table.Row>
                          <Table.Cell colSpan='7'>
                            <Pagination
                              activePage={Math.floor(this.props.skip / this.props.limit) + 1}
                              totalPages={Math.ceil(this.props.total / this.props.limit)}
                              onPageChange={this.handlePaginationChange}
                              boundaryRange={0}
                              prevItem={null}
                              nextItem={null}
                              ellipsisItem={null}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                  </Container>
                  :
                  <Container>
                    <Segment className='placeholder'>
                      <Header icon>
                        <Icon name='search' />
                        We don't have any illustration aids matching your query, please contact our servants.
                      </Header>
                    </Segment>
                    <div>
                    </div>
                  </Container>
              }
            </div>
        }
        <div>
        </div>
      </div >
    );
  }
}

export default AidCardGrid;
