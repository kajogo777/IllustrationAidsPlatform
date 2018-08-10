import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchReservations, addReservation, updateReservation, deleteReservation, filterReservations, clearFilter } from '../actions/reservations-actions';

function filterRows(list, filters){
  let listTemp = list.map((item) => {
    return Object.assign(item, {
      date_reserved: (new Date(item.date_reserved)).toISOString().split('T')[0],
      pickup_date: (new Date(item.pickup_date)).toISOString().split('T')[0]
    })
  })

  const filterKeys = Object.keys(filters);
  return listTemp.filter((row) => {
    return filterKeys.reduce((acc, key) => acc && (""+row[key]).toLowerCase().indexOf(filters[key]) !== -1, true);
  });
}

function mapStateToProps (state){
  return {
    reservations: filterRows(state.reservationStore.reservations, state.reservationStore.filters),
  };
}

function mapDispatchToProps (dispatch){
  return {
    onLoad: () => {
      dispatch(fetchReservations())
    },
    addReservation: (reservation) => {
      dispatch(addReservation(reservation))
    },
    updateReservation: (id, reservation) => {
      dispatch(updateReservation(id, reservation))
    },
    deleteReservation: (reservation) => {
      dispatch(deleteReservation(reservation))
    },
    filterReservations: (field, value) => {
      dispatch(filterReservations(field, value))
    },
    clearFilter: () => {
      dispatch(clearFilter())
    }
  };
}

const ReservationAdminContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default ReservationAdminContainer;
