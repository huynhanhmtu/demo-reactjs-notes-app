import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Input, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actChangeNote, actDeleteNote, actSubmit } from '../modules/actions';
import NotesModal from '../_components/Modal';

export default function PreviewRedux() {
  const state = useSelector(state => state.notesReducer);
  const preview = state.preview;

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(actChangeNote({ ...preview, [name]: value }));
  }

  const handleOnSubmit = () => {
    dispatch(actSubmit(preview));
  }

  const handleOnDelete = () => {
    if (window.confirm(`Delete note: ${preview.title}?`)) {
      dispatch(actDeleteNote(preview.id));
    }
  }

  if (preview) {
    return (
      <div className="col-8 px-4 d-flex flex-column align-items-center note-preview">
        <Input
          className='font-weight-bold'
          style={{ fontSize: "2rem" }}
          name='title'
          placeholder='Title'
          value={preview.title}
          fullWidth
          onChange={handleOnChange}
        >
        </Input>
        <TextField
          className='mt-4'
          name='content'
          label="Content"
          value={preview.content}
          fullWidth
          multiline
          onChange={handleOnChange}
        >
        </TextField>
        <div className='mt-4 text-center' >
          <Button
            variant='contained'
            sx={{mx:2}}
            size='large'
            startIcon={<SaveIcon />}
            onClick={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >Update</Button>
          <NotesModal id={preview.id} title={preview.title} />
        </div>
      </div>
    )
  }
  return (
    <div className="col-8 px-4 d-flex flex-column align-items-center">
      <Button className='mb-3' size='large' onClick={() => {
        window.location.reload();
      }}>Refresh</Button>
    </div>
  )
}