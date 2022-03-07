import * as ActionTypes from './constants';

const actSelectNote = note => {
  return dispatch => dispatch({
    type: ActionTypes.NOTES_SELECTED,
    payload: note
  })
}

const actAddNote = () => {
  return dispatch => dispatch({
    type: ActionTypes.NOTES_ADD
  })
}

const actChangeNote = preview => {
  return dispatch => dispatch({
    type: ActionTypes.NOTES_CHANGE,
    payload: preview
  })
}

const actSubmit = preview => {
  return dispatch => dispatch({
    type: ActionTypes.NOTES_SUBMIT,
    payload: preview
  })
}

const actDeleteNote = id => {
  return dispatch => dispatch({
    type: ActionTypes.NOTES_DELETE,
    payload: id
  })
}

const actRefreshPreview = note => {
  return dispatch => dispatch({
    type: ActionTypes.PREVIEW_REFRESH,
    payload: note
  })
}

export { actSelectNote, actAddNote, actChangeNote, actSubmit, actDeleteNote, actRefreshPreview };