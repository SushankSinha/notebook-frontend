import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../api';


export default function Checkbox(props) {
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const userId = localStorage.getItem('userId');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function handleSubmit () {
    try {
        const response = await api.put(
          `/task/${userId}/edit/${props.id}`, {status : checked});
        if (response.status === 201) {
          console.log("Item updated successfully");
          window.location.reload();
        } else {
          console.error("Failed to update item");
        }
      } catch (error) {
        console.error("Error", error);
      }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
    <Checkbox
      checked={checked}
      onChange={()=>{handleChange();handleClickOpen()}}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      {checked && (<React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Task Completion Checkbox"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Mark the task as completed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>)}
    </>
    
  );
}