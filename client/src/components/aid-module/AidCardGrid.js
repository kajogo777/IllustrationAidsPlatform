import React from 'react';
import {
  Card,
  Container,
  Segment,
  Sticky,
  Button,
  Divider
} from 'semantic-ui-react';
import AidCard from './AidCard';
import SearchField from './SearchField';
import AidDetails from './AidDetails';


class AidCardGrid extends React.Component{

  constructor(props){
    super(props);

    let state = {
      selected: null,
      tags: [],
      offset: 0,
      limit: 20,
    };

    this.state = state;
  }

  handleFocus = (aid) => this.setState({ selected: aid })

  handleChange = (event) => {
    const filters = {
      tags: event.target.value,
    };
    this.setState(filters);
    this.props.fetchAids(this.state.offset, this.state.limit, filters);
  };

  componentDidMount(){
    this.props.onLoad(this.state.limit);
  }

  render(){
    return(
      <div>
      {

        this.state.selected ?

        <div>
          <br/>
          <Container text>
            <Button fluid onClick={(event, data) => this.handleFocus(null)} >Back</Button>
            <Divider clearing />
            <AidDetails
              item={this.state.selected}
              reservations={this.props.selected_reservations}
              tags={this.props.tags}
              getAidReservations={this.props.getAidReservations}
              addReservation={this.props.addReservation}
            />
          </Container>
        </div>

        :

        <div>
            <Container text>
              <Sticky context={this.props.contextRef} offset={0} className="top-sticky">
                <Segment>
                  <SearchField tags={this.props.tags} tagsFilter={this.state.tags} filterAids={this.handleChange} />
                </Segment>
              </Sticky>
            </Container>
            <br/>
            <Card.Group stackable doubling>
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
          </div>

        }
        <div>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    );
  }
}

export default AidCardGrid;
