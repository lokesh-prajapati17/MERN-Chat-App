import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chat from "./Pages/Chat/Chat";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "./Pages/Avatar/Avatar";
import logo from "./Assets/echat_logog-removebg-preview.png";

function App() {
  return (
    <>
      <div
        className="container-fluid bg-info"
        style={{
          height: "5vh",
          // backgroundColor: "#F4F4F4",
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
        }}
      >
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        <p className="text-dark fw-bold fs-4 ms-2 mb-0">E-chat</p>
      </div>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
