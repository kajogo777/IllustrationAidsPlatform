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
      tagsFilter: [],
    };

    this.state = state;
  }

  handleFocus = (aid) => this.setState({ selected: aid })

  handleChange = (event) => {
    this.setState({
      tagsFilter: event.target.value,
    });
    this.props.filterAids("tags", event.target.value);
  };

  componentDidMount(){
    this.props.onLoad();
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
            <AidDetails item={this.state.selected} tags={this.props.tags} />
          </Container>
        </div>

        :

        <div>
            <Container text>
              <Sticky context={this.props.contextRef} offset={0} className="top-sticky">
                <Segment>
                  <SearchField tags={this.props.tags} tagsFilter={this.state.tagsFilter} filterAids={this.handleChange} />
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
