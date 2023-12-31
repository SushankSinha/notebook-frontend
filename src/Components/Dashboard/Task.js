import React, {useState, useEffect} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from '../api';

function Task(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [date, setDate] = useState(props.date);
  const [category, setCategory] = useState(props.category);
  const [isclicked, setIsClicked] = useState(false);
  const [IsChecked, setChecked] = useState(props.status);
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

  const toggleCompleteButton = ()=>{
    setChecked(!IsChecked);
  }

  useEffect(() => {
    (async () => {
      const response = await api.put(
        `/task/${userId}/edit/${props.id}`, {status : IsChecked});
        if (response.status === 201) {
          console.log("Item updated successfully");
        } else {
          console.error("Failed to update item");
          setChecked(false);
        }      
    })()});

  return (
    <Card sx={{display : 'inline-block', width: 250, marginLeft: "3%", backgroundColor : '#EBDBDB' }}>
      <CardContent sx = {{alignItems : 'center'}}>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <br />
        <Typography sx={{ marginBottom: "15px" }}>{props.content}</Typography>
        <Typography>
          Category : <b style={{ color: "red" }}>{props.category}</b>
        </Typography>
        <br/>
        <Typography>
          Date : <b style={{ color: "red" }}>{props.date}</b>
        </Typography>
        <br/>
        <Button variant = "outlined" onClick={()=>{toggleCompleteButton()}}
      >Status : {IsChecked? "Completed" : "Incomplete"}</Button>
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

