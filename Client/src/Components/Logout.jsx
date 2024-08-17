import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("clicked");
    localStorage.clear();
    navigate("/login");
  };
  return (
      <p className="fs-5"  onClick={handleLogout} >Logout <FaPowerOff className="ms-1" size={20} /></p>
   
  );
};

export default Logout;
