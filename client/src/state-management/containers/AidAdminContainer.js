import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchAids, addAid, updateAid, deleteAid, filterAids, clearFilter, fetchTags, addTag } from '../actions/aids-actions';
import { uploadFile } from '../actions/upload-actions';

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
      return acc && (""+row[key]).toLowerCase().indexOf(filters[key]) !== -1;
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
    // upload: state.uploadStore.upload,
    // uploadStatus: state.uploadStore.uploadStatus
  };
}

function mapDispatchToProps (dispatch){
  return {
    onLoad: () => {
      dispatch(fetchAids())
      dispatch(fetchTags())
    },
    addAid: (aid, file) => {
      dispatch(addAid(aid, file))
    },
    updateAid: (id, aid, file) => {
      dispatch(updateAid(id, aid, file))
    },
    deleteAid: (aid) => {
      dispatch(deleteAid(aid))
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
    uploadFile: (file) => {
      dispatch(uploadFile(file))
    }
  };
}

const AidAdminContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default AidAdminContainer;
