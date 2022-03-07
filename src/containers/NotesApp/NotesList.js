import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Note from './Note';

export default function NotesList({ notes, callbackOnAdd, callbackOnSelect, callbackOnCheck }) {
  const onSelect = note => {
    callbackOnSelect(note);
  }
  const onCheck = id => {
    callbackOnCheck(id);
  }

  const handleRenderNote = () => {
    return notes.map(note => <Note key={note.id} note={note} onSelect={onSelect} onCheck={onCheck}></Note>)
  };

  return (
    <div className="col-4 px-4 d-flex flex-column align-items-center notes-list">
      <Button
        className='mb-3'
        variant='contained'
        size='large'
        fullWidth
        startIcon={<AddIcon />}
        onClick={(e) => {
          e.preventDefault();
          callbackOnAdd();
        }}
      >Add Notes</Button>
      <div className="w-100">
        {handleRenderNote()}
      </div>
    </div>
  )
}
