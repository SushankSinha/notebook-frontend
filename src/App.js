import ForgetPassword from "./Components/Authentication/ForgetPassword";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import { Routes, Route, Navigate, useParams} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/Routes/NotFound";

function App() {

  // const userId = localStorage.getItem('userId');
  const userId = useParams()

  return (
    <div className="App apply-font" >
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
