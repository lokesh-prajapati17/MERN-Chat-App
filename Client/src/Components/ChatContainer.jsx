import React, { useEffect, useState } from "react";
import profileImg from "../Assets/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N-removebg-preview.png";
import ChatInput from "./ChatInput";
import { AllApis } from "../Utils/ApiRoutes";
import { Buffer } from "buffer";
const ChatContainer = ({ currentChat, currentUser }) => {
  const { allProfiles, sendMessageApi, getAllMessageApi } = AllApis;
  const [allMessages, setAllMessages] = useState([]);
  const [profile, setProfile] = useState(null);
  const getProfile = async () => {
    const response = await fetch(`${allProfiles}/${currentChat._id}`);
    if (response.status == 200) {
      const jsonResponse = await response.json();
      console.log("success 200", jsonResponse);
      setProfile(jsonResponse);
    } else if (response.status == 400) {
      console.log("error 400");
    } else if (response.status == 500) {
      console.log("error 500");
    }
  };
  const fetchMessages = async () => {
    try {
      const reqBody = {
        from: currentUser._id,
        to: currentChat._id,
      };

      const response = await fetch(getAllMessageApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (response.status === 200) {
        console.log("success get messages 200");
        const jsonResponse = await response.json();
        setAllMessages(jsonResponse);
        console.log(jsonResponse);
      } else if (response.status === 400) {
        console.log("error get messages 400");
      } else if (response.status === 500) {
        console.log("error get messages 500");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  useEffect(() => {

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat, currentUser._id, getAllMessageApi]);
  console.log(allMessages, "all messages");
  useEffect(() => {
    currentChat !== null && getProfile();
  }, [currentChat]);
  const handleSendMessage = async (msg) => {
    const reqBody = {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    };
    const response = await fetch(sendMessageApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.status === 200) {
      console.log("success to send message 200");
      fetchMessages();
    } else if (response.status === 400) {
      console.log("error 400 send message");
    } else if (response.status === 500) {
      console.log("error 500 send message");
    }
  };
  return (
    <>
      <div className="m-0">
        <div
          className="mb-1 d-flex justify-content-between shadow-sm align-items-center"
          style={{
            maxHeight: "10vh",
            minHeight: "10vh",
            borderBottom: "1px solid #F5F5F5",
          }}
        >
          <div className=" d-flex justify-content-between align-items-center">
            <div
              className="d-flex align-items-center justify-content-center ms-3 me-3"
              style={{
                border: "2px solid skyblue",
                borderRadius: "50%",
                height: "40px",
                width: "40px",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                }}
                src={
                  profile !== null
                    ? `data:${
                        profile.imageData.contentType
                      };base64,${Buffer.from(profile.imageData.data).toString(
                        "base64"
                      )}`
                    : profileImg
                }
                alt=""
              />
            </div>
            <p className="ms-0 mt-3">{currentChat.username}</p>
          </div>
          <div className=" p-1 rounded-2 ">
            <input
              className="form-control"
              type="text"
              placeholder="search..."
            />
          </div>
        </div>
        <div
          className="mb-1 ms-4"
          style={{
            maxHeight: "72vh",
            minHeight: "72vh",
          }}
        >
          {allMessages.map((message, index) => (
            <>
              <div
                key={index}
                className={`d-flex mx-auto my-auto align-items-center ${
                  message.fromSelf
                    ? "justify-content-end "
                    : "justify-content-start"
                }`}
              >
                <div
                  style={{
                    minWidth: "100px",
                    maxWidth: "500px",
                    height: "2rem",
                  }}
                  className={` m-1 bg-${
                    message.fromSelf ? "info" : "secondary"
                  } text-${
                    message.fromSelf ? "white" : "dark"
                  } d-flex align-items-center rounded-2 justify-content-center`}
                >
                  <p className="m-1" style={{  textOverflow:"ellipsis", whiteSpace: "normal",
      overflow: "hidden" }}>
                    {message.message}
                  </p>

                  <p
                    className={`${
                      message.fromSelf ? "text-dark" : "text-light"
                    }`}
                    style={{ fontSize: "0.5rem" }}
                  >
                    {" "}
                    {new Date(message.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
        <div
          className="p-0 m-0"
          style={{
            maxHeight: "10vh",
            minHeight: "10vh",
          }}
        >
          <ChatInput handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );
};

export default ChatContainer;
