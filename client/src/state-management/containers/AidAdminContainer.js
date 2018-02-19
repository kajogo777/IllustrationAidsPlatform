import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchAids, addAid, updateAid, deleteAid, filterAids, clearFilter, fetchTags } from '../actions/aids-actions';

function filterRows(list, filters){
  let listTemp = list.map((item) => {
    return Object.assign(item, {
      date_added: (new Date(item.date_added)).toLocaleDateString()
    })
  })

  const filterKeys = Object.keys(filters);
  return listTemp.filter((row) => {
    return filterKeys.reduce((acc, key) => {
      if(key === 'tags')
        return !filters[key].some(val => row[key].indexOf(val) === -1);
      return acc && row[key].toLowerCase().indexOf(filters[key]) !== -1;
    } , true);
  });
}

function getTags(list){
  if(list)
    return list.map( item => { return { key: item.tag, value: item.tag, text: item.tag } } );
  else
    return [];
}

function mapStateToProps (state){
  return {
    aids: filterRows(state.aidStore.aids, state.aidStore.filters),
    tags: getTags(state.aidStore.tags)
  };
}

function mapDispatchToProps (dispatch){
  return {
    onLoad: () => {
      dispatch(fetchAids())
      dispatch(fetchTags())
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
    },
    clearFilter: () => {
      dispatch(clearFilter())
    }
  };
}

const AidAdminContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default AidAdminContainer;
