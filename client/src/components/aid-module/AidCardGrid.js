import React from 'react';
import {
  Card,
  Container,
  Segment,
  Sticky
} from 'semantic-ui-react';
import AidCard from './AidCard';
import SearchField from './SearchField';

class AidCardGrid extends React.Component{

  componentDidMount(){
    this.props.onLoad();
  }

  render(){
    return(
      <div>
        <Container text>
          <Sticky context={this.props.contextRef} offset={0} className="top-sticky">
            <Segment>
              <SearchField tags={this.props.tags} filterAids={this.props.filterAids} />
            </Segment>
          </Sticky>
        </Container>
        <br/>
        <Card.Group stackable doubling>
          {
            this.props.aids.map((item) =>
              <AidCard
                key={item._id}
                name={item.name}
                date={item.date_added}
                description={item.description}
                reserved={item.reserved}
                image={item.image_uri}
                wished={false}
              />
            )
          }
        </Card.Group>
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
