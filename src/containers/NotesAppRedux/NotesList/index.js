import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NoteRedux from './Note';
import { useDispatch, useSelector } from 'react-redux';
import { actAddNote } from '../modules/actions';

export default function NotesListRedux() {
  const state = useSelector(state => state.notesReducer);
  const dispatch = useDispatch();

  const handleRenderNote = () => {
    return state.notes.map(note => <NoteRedux key={note.id} note={note}></NoteRedux>)
  };

  const handleOnAdd = () => {
    dispatch(actAddNote());
  }

  return (
    <div className="col-4 px-4 d-flex flex-column align-items-center notes-list">
      <Button
        className='mb-3'
        variant='contained'
        size='large'
        fullWidth
        startIcon={<AddIcon />}
        onClick={handleOnAdd}
      >Add Notes</Button>
      <div className="w-100">
        {handleRenderNote()}
      </div>
    </div>
  )
}