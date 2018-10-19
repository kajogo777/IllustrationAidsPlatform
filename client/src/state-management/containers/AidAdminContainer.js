import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchAids, addAid, updateAid, deleteAid, filterAids, clearFilter, fetchTags, addTag } from '../actions/aids-actions';
import { uploadFile } from '../actions/upload-actions';

function getTags(list){
  if(list)
    return list.map( item => { return { key: item.tag, value: item.tag, text: item.tag } } );
  else
    return [];
}

function mapStateToProps (state){
  return {
    aids: state.aidStore.aids,
    tags: getTags(state.aidStore.tags),
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
