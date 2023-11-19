import ForgetPassword from "./Components/Authentication/ForgetPassword";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import { Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/Routes/NotFound";
import { useState } from "react";

function App() {

  const [log, setLog] = useState(true)
  const userId = localStorage.getItem('userId');

  return (
    <div className="App apply-font" >
      <Navbar log = {log} setLog={setLog} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setLog = {setLog} />} />
        <Route path="/reset_password" element={<ForgetPassword />} />
        <Route path={`/dashboard/${userId}`} element={<Dashboard />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
        <Route path="/" element={<Navigate replace to={`/login`} />} />
      </Routes>
    </div>
  );
}

export default App;
