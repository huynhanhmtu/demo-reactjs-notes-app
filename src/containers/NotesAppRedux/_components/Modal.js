import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { actDeleteNote } from '../modules/actions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #cbcbcb',
  boxShadow: 5,
  borderRadius: '8px',
  p: 2,
};

export default function NotesModal({ id, title }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const handleOnDelete = () => {
    dispatch(actDeleteNote(id));
    handleClose();
  }

  return (
    <>
      <Button color='warning' sx={{mx:2}} size='large' startIcon={<DeleteIcon />} onClick={handleOpen}>Delete</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            Delete note: {title}?
          </Typography>
          <div className='text-center mt-3'>
            <Button
              color='warning'
              sx={{mx:2}}
              size='large'
              onClick={(e) => {
                e.preventDefault();
                handleOnDelete();
              }}
            >Yes</Button>
            <Button
              variant='contained'
              sx={{mx:2}}
              size='large'
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >No</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
