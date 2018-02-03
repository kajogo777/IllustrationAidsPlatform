import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchAids } from '../actions/aids-actions';

function mapStateToProps (state){
  return {
    aids: state.aidStore.aids
  };
}

function mapDispatchToProps (dispatch){
  return {
    onLoad: () => {
      dispatch(fetchAids())
    }
  };
}

const AidContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default AidContainer;
