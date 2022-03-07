import React, { useEffect } from 'react';
import NotesListRedux from './NotesList';
import PreviewRedux from './Preview';
import { useDispatch, useSelector } from 'react-redux';
import { actRefreshPreview } from './modules/actions';

export default function NotesAppRedux() {
  const  state = useSelector(state => state.notesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actRefreshPreview(state.notes[0]));
  }, []);

  return (
    <>
      <NotesListRedux />
      <PreviewRedux />
    </>
  )
}
