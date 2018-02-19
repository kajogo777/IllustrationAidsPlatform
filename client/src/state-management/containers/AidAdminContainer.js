import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchAids, addAid, updateAid, deleteAid, filterAids } from '../actions/aids-actions';

function filterRows(list, filters){
  const filterKeys = Object.keys(filters);
  return list.filter((row) => {
    return filterKeys.reduce((acc, key) => acc && row[key].toLowerCase().indexOf(filters[key]) !== -1, true);
  });
}

function mapStateToProps (state){
  return {
    aids: filterRows(state.aidStore.aids, state.aidStore.filters)
  };
}

function mapDispatchToProps (dispatch){
  return {
    onLoad: () => {
      dispatch(fetchAids())
    },
    addAid: (aid) => {
      dispatch(addAid(aid))
    },
    updateAid: (id, aid) => {
      dispatch(updateAid(id, aid))
    },
    deleteAid: (aid) => {
      dispatch(deleteAid(aid))
    },
    filterAids: (field, value) => {
      dispatch(filterAids(field, value))
    }
  };
}

const AidAdminContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default AidAdminContainer;
