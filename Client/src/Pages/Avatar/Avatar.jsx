import React, { useEffect, useState } from "react";
import defaultProfile from "../../Assets/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const Avatar = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const storedUserData = localStorage.getItem("e-chat-data");
  const userData = JSON.parse(storedUserData);
  const [username, setUsername] = useState(userData.username);
  const [userId, setUserId] = useState(userData._id);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {
    if (!localStorage.getItem("e-chat-data")) {
      navigate("/register");
    }
  });

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("_id", userId);
      // formData.append("username",username)
      const response = await fetch("http://localhost:7000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        console.log("success 200 image");
        navigate("/");
      } else if (response.status === 400) {
        console.log("Error: Bad request");
      } else if (response.status === 500) {
        console.log("error 500");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <div className="container bg-light">
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: "100vh" }}
        >
          <div
            className="rounded-circle d-flex justify-content-center align-items-center p-0 overflow-hidden"
            style={{
              height: "220px",
              width: "220px",
              border: "1px solid black",
            }}
          >
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : defaultProfile
              }
              className="img-fluid m-0 d-flex mx-auto my-auto overflow-hidden"
            />
          </div>
          <div className="mt-5 align-content-center flex-column d-flex">
            <input type="file" className="mb-3" onChange={handleImageChange} />
            <button className="btn btn-outline-info" onClick={handleUpload}>
              Upload Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avatar;
