import React from "react";
import welcomeImage from "../../src/Assets/giphy.gif";

const Welcome = ({ currentUser }) => {
  return (
    <div className="text-center container-fluid justify-content-center align-items-center">
      <img
        src={welcomeImage}
        alt="welcome"
        className="d-flex img-fluid mb-5 mx-auto my-auto"
        style={{ objectFit: "cover", maxHeight: "50vh" }}
      />
      <h2>
        Welcome, <span className="text-info">{currentUser?.username}!</span>
      </h2>
      <h3>Please select a chat to Messaging.</h3>
    </div>
  );
};

export default Welcome;
