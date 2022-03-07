import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Input, TextField } from '@mui/material';

export default function Preview({ preview, callbackOnSubmit, callbackOnChange, callbackOnDelete }) {
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
          onChange={callbackOnChange}
        >
        </Input>
        <TextField
          className='mt-4'
          name='content'
          label="Content"
          value={preview.content}
          fullWidth
          multiline
          onChange={callbackOnChange}
        >
        </TextField>
        <div className='mt-4 text-center' >
          <Button
            variant='contained'
            sx={{ mx: 2 }}
            size='large'
            startIcon={<SaveIcon />}
            onClick={(e) => {
              e.preventDefault();
              callbackOnSubmit(preview);
            }}
          >Update</Button>
          <Button
            color='warning'
            sx={{ mx: 2 }}
            size='large'
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              e.preventDefault();
              callbackOnDelete(preview.id);
            }}
          >Delete</Button>
        </div>
      </div>
    )
  }
  return (
    <div className="col-8 px-4 d-flex flex-column align-items-center">
      <Button className='mb-3' size='large' onClick={() => {
        window.location.reload()
      }}>Add new note or click here to refresh</Button>
    </div>
  )
}