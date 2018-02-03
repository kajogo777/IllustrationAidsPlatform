import React from 'react';
//import PropTypes from 'prop-types';

class UniversalContainer extends React.Component {
  render () {
    const otherProps = Object.assign({}, this.props);
    delete otherProps.component;

    return React.createElement(this.props.component, otherProps);
  }
}

// AbstractContainer.propTypes = {
//   component: PropTypes.element.isRequired
// };

export default UniversalContainer;
