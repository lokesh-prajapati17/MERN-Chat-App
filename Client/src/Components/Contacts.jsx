import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Buffer } from "buffer";
import { AllApis } from "../Utils/ApiRoutes";
import Logout from "./Logout";
import { MdModeEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaCameraRetro } from "react-icons/fa";
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelectedChat, setcurrentSelectedChat] = useState(undefined);
  const [avatars, setAvatars] = useState([]);
  const [searchedData, setSearchedData] = useState("");
  const [isMenu, setIsMenu] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const {
    allProfiles,
    getUserProfile,
    updateUserProfile,
    updateUserProfilePictureApi,
  } = AllApis;
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [localstorageData, setLocalStorageData] = useState(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [updateProfilePicture, setUpdateProfilePicture] = useState(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const storedData = localStorage.getItem("e-chat-data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLocalStorageData(parsedData);
      setCurrentUserName(parsedData.username);
      setEditUserName(parsedData.username);
      setEditUserEmail(parsedData.email);
    }
  }, []);

  useEffect(() => {
    if (localstorageData && currentUser) {
      setCurrentUserName(localstorageData.username);
      setEditUserName(localstorageData.username);
      setEditUserEmail(localstorageData.email);
    }
  }, [currentUser, localstorageData]);

  useEffect(() => {
    const getUserProfiles = async () => {
      if (!localstorageData) return;
      try {
        const response = await fetch(
          `${getUserProfile}/${localstorageData._id}`
        );
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log("success 200 user profile");
          setUserProfile(jsonResponse);
        } else {
          console.log(`Error fetching user profile: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (localstorageData) {
      getUserProfiles();
    }
  }, [localstorageData, getUserProfile]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch(allProfiles);
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log("success 200 profiles", jsonResponse);
          setAvatars(jsonResponse);
        } else {
          console.log(`Error fetching profiles: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, [allProfiles]);

  const chnageCurrentChat = (index, contact) => {
    setcurrentSelectedChat(index);
    changeChat(contact);
  };

  const filteredData = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(searchedData.toLowerCase())
  );

  const handleOptions = () => {
    setIsMenu(!isMenu);
  };

  const handleProfile = () => {
    setIsMenu(false);
    setIsProfile(!isProfile);
  };

  const handleCloseProfile = () => {
    setIsProfile(false);
  };
  const updateProfileApi = async () => {
    if (updateProfilePicture !== null) {
      const formData = new FormData();
      formData.append("image", updateProfilePicture);

      try {
        const response = await fetch(
          `${updateUserProfilePictureApi}/${localstorageData._id}`,
          {
            method: "PATCH",
            body: formData,
          }
        );
        if (response.ok) {
          console.log("Success to update profile 200");
        } else {
          console.log(`Error updating profile picture: ${response.status}`);
        }
      } catch (error) {
        console.error("Error updating profile picture:", error.message);
      }
    }
  };

  const updateProfile = async () => {
    updateProfileApi();
    if (!localstorageData) return;
    const reqBody = {
      username:
        editUserName !== localstorageData.username
          ? editUserName
          : localstorageData.username,
      email:
        editUserEmail !== localstorageData.email
          ? editUserEmail
          : localstorageData.email,
    };
    try {
      const response = await fetch(
        `${updateUserProfile}/${localstorageData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      if (response.ok) {
        console.log("Success to update 200");
        const updatedUserData = {
          ...localstorageData,
          username: reqBody.username,
          email: reqBody.email,
        };
        localStorage.setItem("e-chat-data", JSON.stringify(updatedUserData));
        setLocalStorageData(updatedUserData);
      } else {
        console.log(`Error updating profile: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleUpdateProfile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageChange = (event) => {
    setUpdateProfilePicture(event.target.files[0]);
  };

  console.log(updateProfilePicture, "profile picture");
  return (
    <>
      {currentUserName && (
        <div
          className="p-2 d-flex flex-column bg-light"
          style={{ height: "100%", width: "100%" }}
        >
          <div className="d-flex ms-2 justify-content-between">
            <p className="fs-5">Chats</p>
            <div>
              <HiOutlineDotsVertical
                onClick={() => handleOptions()}
                size={23}
              />
              {isMenu && (
                <div
                  style={{ display: "block", left: "160px" }}
                  className="dropdown-menu dropdown-menu-left"
                >
                  <p
                    className="dropdown-item fs-5"
                    onClick={() => handleProfile()}
                  >
                    Profile
                  </p>
                  <p className="dropdown-item">
                    <Logout />
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="p-2">
            <input
              type="text"
              onChange={(e) => setSearchedData(e.target.value)}
              placeholder="search contacts..."
              className="form-control "
            />
          </div>
          {isProfile && (
            <Modal show={isProfile} onHide={handleCloseProfile}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <div
                  className="position-relative rounded-circle d-flex mx-auto my-auto overflow-hidden d-flex justify-content-center object-fit-cover"
                  style={{
                    width: "180px",
                    height: "180px",
                    border: "1px solid grey",
                    position: "relative",
                  }}
                >
                  <img
                    className="img-fluid d-flex mx-auto "
                    src={
                      updateProfilePicture !== null
                        ? URL?.createObjectURL(updateProfilePicture)
                        : `data:${
                            userProfile.imageData.contentType
                          };base64,${Buffer?.from(
                            userProfile?.imageData?.data
                          ).toString("base64")}`
                    }
                  />
                  <FaCameraRetro
                    size={23}
                    color="blue"
                    className="position-absolute top-50 end-0 translate-middle-y"
                    style={{ zIndex: 1 }}
                    onClick={handleUpdateProfile}
                  />
                  <input
                    type="file"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-between mt-2 align-items-center">
                  <p>Name: {localstorageData.username}</p>
                  {isEditName == false ? (
                    <MdModeEdit
                      onClick={() => setIsEditName(!isEditName)}
                      size={23}
                    />
                  ) : (
                    <IoClose
                      size={27}
                      onClick={() => {
                        setIsEditName(false);
                        setEditUserName(localstorageData.username);
                      }}
                    />
                  )}
                </div>
                {isEditName && (
                  <input
                    className="form-control"
                    onChange={(e) => setEditUserName(e.target.value)}
                    placeholder="edit username"
                    value={editUserName}
                  />
                )}
                <div className="d-flex flex-row justify-content-between mt-2 align-items-center">
                  <p>Email: {localstorageData.email}</p>
                  {isEditEmail == false ? (
                    <MdModeEdit
                      onClick={() => setIsEditEmail(!isEditName)}
                      size={23}
                    />
                  ) : (
                    <IoClose
                      size={27}
                      onClick={() => {
                        setIsEditEmail(false);
                        setEditUserEmail(localstorageData.email);
                      }}
                    />
                  )}
                </div>
                {isEditEmail && (
                  <input
                    className="form-control"
                    onChange={(e) => setEditUserEmail(e.target.value)}
                    placeholder="edit username"
                    value={editUserEmail}
                  />
                )}
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-outline-success d-flex mx-auto my-auto justify-content-center"
                  style={{ width: "10rem" }}
                  onClick={updateProfile}
                >
                  <span className="text-center">Update</span>
                </button>
              </Modal.Footer>
            </Modal>
          )}
          <div
            className="flex-grow-1 mb-2"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "thin",
              scrollbarColor: "white",
              overflowX: "hidden",
            }}
          >
            {filteredData.length == 0 ? (
              <p className="text-center mt-3">Contact Not Found</p>
            ) : (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  className={`m-2 d-flex flex-row align-items-center p-2 rounded-1 ${
                    index === currentSelectedChat ? "bg-info border-0" : ""
                  }`}
                  style={{
                    backgroundColor: "#E6E5E5",
                  }}
                  onClick={() => chnageCurrentChat(index, item)}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      border: "2px solid skyblue",
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                    }}
                  >
                    {avatars.map((avatar, index) => {
                      if (avatar._id === item._id) {
                        return (
                          <img
                            key={index}
                            style={{
                              borderRadius: "50%",
                              height: "40px",
                              width: "40px",
                            }}
                            src={`data:${
                              avatar.imageData.contentType
                            };base64,${Buffer.from(
                              avatar.imageData.data
                            ).toString("base64")}`}
                            alt="Profile"
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                  <h5 className="ms-3 mt-2">{item.username}</h5>
                </div>
              ))
            )}
          </div>
          <div className="m-2 d-flex flex-row align-items-center justify-content-center mt-auto bg-info p-2">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                border: "2px solid skyblue",
                borderRadius: "50%",
                height: "40px",
                width: "40px",
              }}
            >
              {avatars.map((avatar, index) => {
                if (avatar._id === currentUser._id) {
                  return (
                    <img
                      key={index}
                      style={{
                        borderRadius: "50%",
                        height: "42px",
                        width: "42px",
                      }}
                      src={`data:${
                        avatar.imageData.contentType
                      };base64,${Buffer.from(avatar.imageData.data).toString(
                        "base64"
                      )}`}
                      alt=""
                    />
                  );
                }
                return null;
              })}
            </div>
            <h4 className="ms-2 mt-2">{currentUserName}</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
