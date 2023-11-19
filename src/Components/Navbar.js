import React, { useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const [success, setSuccess] = useState(false);
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  async function userLogout() {
    try {
      const response = await api.get("/logout");
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
          setSuccess(false);
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Link
              to= {`/dashboard/${userId}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              <EditNoteIcon style={{ marginLeft: "1%" }} />
            </Link>
            <Typography
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                display: "flex",
                color: "inherit",
              }}
            >
              <Link
                to={`/dashboard/${userId}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                {" "}
                Note Book{" "}
              </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {/* News */}
            </Typography>
            {(userId === null) ? (
              <>
                <Button></Button>
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <Button style={{ fontWeight: "bold" }} color="inherit">
                    Login
                  </Button>
                </Link>
                <Link
                  to="/register"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  <Button color="inherit" style={{ fontWeight: "bold" }}>
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                color="inherit"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                onClick={userLogout}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {success &&
        toast.success("Logged Out Successfully", {
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
    </>
  );
}

export default Navbar;
