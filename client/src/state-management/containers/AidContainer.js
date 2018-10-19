import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchAids, filterAids, clearFilter, fetchTags, addTag } from '../actions/aids-actions';
import { getAidReservations, addReservation } from '../actions/reservations-actions';

function filterRows(list, filters){
  let listTemp = list.map((item) => {
    return Object.assign(item, {
      date_added: (new Date(item.date_added)).toISOString().split('T')[0]
    })
  })

  const filterKeys = Object.keys(filters);
  return listTemp.filter((row) => {
    return filterKeys.reduce((acc, key) => {
      if(key === 'tags')
        return !filters[key].some(val => row[key].indexOf(val) === -1);
      return acc && (""+row[key]).toLowerCase().indexOf(filters[key].toLowerCase()) !== -1;
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
    tags: getTags(state.aidStore.tags),
    selected_reservations: state.reservationStore.selected_reservations,
    // upload: state.uploadStore.upload,
    // uploadStatus: state.uploadStore.uploadStatus
  };
}

function mapDispatchToProps (dispatch){
  return {
    onLoad: (limit) => {
      dispatch(fetchAids(0, limit))
      dispatch(fetchTags())
    },
    fetchAids: (offset, limit, terms) => {
      dispatch(fetchAids(offset, limit, terms))
    },
    filterAids: (field, value) => {
      dispatch(filterAids(field, value))
    },
    clearFilter: () => {
      dispatch(clearFilter())
    },
    addTag: (name) => {
      dispatch(addTag(name))
    },
    addReservation: (reservation) => {
      dispatch(addReservation(reservation))
    },
    getAidReservations: (aid_id) => {
      dispatch(getAidReservations(aid_id))
    }
  };
}

const AidContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default AidContainer;
