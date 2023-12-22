import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../api';


function CheckBox(props) {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
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

  return (
    <>
    <Checkbox
      checked={checked}
      onChange={(e)=>{setChecked(e.target.checked);handleClickOpen();}}
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
export default CheckBox;