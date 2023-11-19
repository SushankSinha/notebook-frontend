import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import api from "../api";
import Task from "./Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Task.css";
import { Container, TextField, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import ColorPicker from "./ColorPicker";

function Dashboard() {
  const [isExpanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);
  const [bgColor, setBgColor] = useState()

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: ""
  });

  const [searchTask, setSearchTask] = useState(data);
  const [success, setSuccess] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const userId = localStorage.getItem('userId');
  document.body.style.backgroundColor = `${bgColor}`
  

const myDate = new Date();

myDate.setHours(0, 0, 0, 0);

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(myDate) {
  return [
    myDate.getFullYear(),
    padTo2Digits(myDate.getMonth() + 1),
    padTo2Digits(myDate.getDate()),
  ].join('-');
}

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const handleSearch = (event) => {
    if (event.target.value === null) {
      setSearchTask(data);
      return;
    }
    const searchedTask = data.filter(
      (item) =>
        item.title.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
    );
    setSearchTask(searchedTask);
  };

  async function submitNote() {
    try {
      const response = await api.post(
        `/task/${userId}/add-task`,
        {title : note.title, content : note.content, date : formatDate(startDate), category : note.category, userId : userId }
      );

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
          setSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function TaskDetails() {
    try {
      const response = await api.get(`/task/${userId}`);
      if (response.status === 200) {
        setData(response.data);
        setSearchTask(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    TaskDetails();
  }, []);

  const expand = () => {
    setExpanded(true);
  };

  return (
    <div>
      
      <ColorPicker setBgColor={setBgColor}/>
      <form method="POST" className="create-note">
        <textarea
          name="title"
          onClick={expand}
          onChange={handleChange}
          value={note.title}
          min={5}
          placeholder="Add a note"
          rows={isExpanded === true ? 1 : 1}
        />

        {isExpanded && (
          <>
            <textarea
              name="content"
              onClick={expand}
              onChange={handleChange}
              value={note.content}
              min={5}
              placeholder="Description"
              rows={isExpanded === true ? 1 : 0}
            />
            <textarea
              name="category"
              onClick={expand}
              onChange={handleChange}
              value={note.category}
              min={5}
              placeholder="Work, Personal, etc"
              rows={isExpanded === true ? 1 : 0}
            />
            <Typography >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            </Typography >
          </>
        )}
        <Zoom in={isExpanded}>
          <Fab
            onClick={() => {
              submitNote();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>

      <Container
        style={{ width: "50%", margin: "20px auto", display: "block" }}
      >
        <TextField
          type="text"
          placeholder="Search Notes"
          onChange={handleSearch}
          style={{
            borderRadius: "10px",
            border: "2px solid black",
            width: "100%",
            marginTop: "10px",
          }}
        />
      </Container>

      {searchTask.map((noteItem) => {
        return (
          <div
            style={{
              margin: "2%",
              display: "inline-block",
            }}
          >
            <Task
              key={noteItem._id}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              date={noteItem.date}
              category={noteItem.category}
            />
          </div>
        );
      })}
      {success &&
        toast.success("Task added successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Dashboard;
