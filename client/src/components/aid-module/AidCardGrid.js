import React from 'react';
import {
  Card
} from 'semantic-ui-react';
import AidCard from './AidCard';

class AidCardGrid extends React.Component{

  componentDidMount(){
    this.props.onLoad();
  }

  render(){
    return(
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
    );
  }
}

export default AidCardGrid;
