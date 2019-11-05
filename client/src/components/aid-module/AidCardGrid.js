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
  Icon
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
    this.props.fetchAids(newSkip, this.props.limit, { tags: this.state.tags });
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
              </Container>
            </div>

            :

            <div>
              <Container text>
                <Sticky context={this.props.contextRef} offset={0} className="top-sticky">
                  <SearchField tags={this.props.tags} typeFilter={this.state.filters.type} tagsFilter={this.state.filters.tags} filterAids={this.handleChange} />
                </Sticky>
              </Container>
              <br />
              {
                this.props.aids.length > 0 ?
                  <div>
                    <Card.Group centered stackable doubling>
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
                          <Table.HeaderCell colSpan='7'>
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
                  </div>
                  :
                  <h2>
                    No illustration aids available, please contact your admin.
                  </h2>
              }
            </div>
        }
        <div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default AidCardGrid;
