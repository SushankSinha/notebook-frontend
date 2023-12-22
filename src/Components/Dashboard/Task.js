import React, {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from '../api';
import Checkbox from '@mui/material/Checkbox';

function Task(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [date, setDate] = useState(props.date);
  const [category, setCategory] = useState(props.category);
  const [isclicked, setIsClicked] = useState(false);
  const [checked, setChecked] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleUpdate = async () => {
    try {
      const response = await api.put(
        `/task/${userId}/edit/${props.id}`, {title, content, date, category, userId});
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

  async function handleDelete() {
    try {
      await api.delete(`/task/${userId}/delete/${props.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const toggleEdit = () => {
    setIsClicked(!isclicked);
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
          setChecked(false)
        }
      } catch (error) {
        console.error("Error", error);
      }
  };

  return (
    <Card sx={{display : 'inline-block', width: 250, marginLeft: "3%", backgroundColor : '#EBDBDB' }}>
    <Checkbox
      checked={checked}
      style={{float : 'left'}}
      onChange={()=>{setChecked(true); handleSubmit();}}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      <CardContent sx = {{alignItems : 'center'}}>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <br />
        <Typography sx={{ marginBottom: "15px" }}>{props.content}</Typography>
        <Typography>
          Date : <b style={{ color: "red" }}>{props.date}</b>
        </Typography>
        <Typography>
          Category : <b style={{ color: "red" }}>{props.category}</b>
        </Typography>
      </CardContent>
      <hr style={{border : '1px solid grey'}}/>
      <CardActions style = {{margin: 'auto', display : 'flex', flexDirection : 'row', justifyContent : 'center'}}>
        <Button
          onClick={() => {
            toggleEdit()
          }}
          size="small"
        >
          <EditIcon />
        </Button>
        <Button
          onClick={() => {
            handleDelete()
          }}
          size="small"
        >
          <DeleteIcon />
        </Button>
      </CardActions>
      {isclicked && (
        <div>
          <input
            style = {{margin: '2px auto', display : 'block'}}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            style = {{margin: '2px auto', display : 'block'}}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            style = {{margin: '2px auto', display : 'block'}}
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            style = {{margin: '2px auto', display : 'block'}}
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button style = {{margin: '2px auto', display : 'block'}} type = 'button' className="btn btn-warning" onClick={()=>{handleUpdate()}}>Update</button>
        </div>
      )}
    </Card>
  );
}

export default Task;

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

// export default function ResponsiveDialog() {
//   const [open, setOpen] = React.useState(false);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open responsive dialog
//       </Button>
//       <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Let Google help apps determine location. This means sending anonymous
//             location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Disagree
//           </Button>
//           <Button onClick={handleClose} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }
